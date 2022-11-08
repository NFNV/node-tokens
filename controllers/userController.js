const { authService } = require("../services")

//to use in register
const User = require("../models/user")

//login & register

//fake login, it will never fail
const login = (req, res) => {
  const { email, password } = req.body

  //no email?
  if (!email) res.status(400).send({ message: 'Field "email" required' })
  //no password?
  else if (!password)
    res.status(400).send({ message: 'Field "password" required' })

  User.findOne({ email }, (error, user) => {
    if (error)
      return res.status(500).send({ message: "Error creating user.", error })

    //if user does not exist or there is no password or password is incorrect, throw error
    if (!user || !password || !user.comparePassword(password))
      return res
        .status(401)
        .send({ message: 'User or password are incorrect.', error })
  })

  //Its all good? login
  res.status(200).send({ message: 'Successful login', token: authService.createToken() })
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
    if (error)
      return res.status(500).send({ message: "Error creating user.", error })
    if (user) return res.status(400).send({ message: "Email already in use." })
    //saving with mongoose, using a function
    newUser.save((error) => {
      if (error)
        res.status(400).send({ message: "Error creating user.", error })
    })

    //success msg & login with token
    res.status(201).send({
      message: "Successful registration",
      token: authService.createToken(),
    })
  })
}

const sayHi = (req, res) => {
  res.status(200).send("You are authenticated")
}
//exporting functions
module.exports = {
  login,
  register,
  sayHi,
}
