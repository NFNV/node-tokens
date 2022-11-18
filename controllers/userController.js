const User = require("../models/user")
const { authService, userService } = require("../services")
const { validationResult } = require("express-validator")

//login & register

const login = async (req, res) => {
  const { email, password } = req.body
  //is going to use the schema defined in routes, and it will make the validations that are inside, for email and for password, thats why we need req as argument
  const resultValidation = validationResult(req)
  //has errors? then resultValidation will have some inside
  const hasErrors = !resultValidation.isEmpty()

  if (hasErrors) {
    return res.status(400).send(resultValidation)
  }

  const result = await userService
    .login(email, password)
    .catch((error) => error)
  return res.status(result.status).send(result)
}

// will recieve the parameters via post
const register = (req, res) => {
  const { email, password } = req.body

  const newUser = new User({
    email,
    password,
  })

  //if email exists
  //1st arg: if email existe
  //2nd arg: cb with error & user. User means error, because already exists
  User.findOne({ email: newUser.email }, (error, user) => {
    if (error) {
      return res.status(500).send({
        message: "Error creating user.",
        error,
      })
    }
    if (user) {
      return res.status(400).send({ message: "Email already in use." })
    }
    //saving with mongoose, using a function
    newUser.save((error) => {
      if (error) {
        res.status(400).send({
          message: "Error creating user.",
          error,
        })
      }
      //success msg & login with token
      res.status(201).send({
        message: "Successful registration.",
        token: authService.createToken(),
      })
    })
  })
}

const sayHi = (req, res) => {
  res.status(200).send("You are authenticated.")
}

//exporting functions
module.exports = {
  login,
  register,
  sayHi,
}
