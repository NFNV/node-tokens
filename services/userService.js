const authService = require("./authService")
//to use in register
const User = require("../models/user")

//a function that returns a promise
//we're going to the database, and it's an asynchronous thing
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) reject({ status: 500, message: "Error creating user.", error })
      //if user does not exist or there is no password or password is incorrect, throw error
      if (!user || !password || !user.comparePassword(password))
        reject({ status: 401, message: "Error creating user.", error })
    })
    //Its all good? login
    resolve({ status: 200, message: "Successful login", token: authService.createToken() })
  })
}

const register = () => {}

module.exports = {
  login,
  register,
}
