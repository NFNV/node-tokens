const jwt = require("jwt-simple")
const { DateTime } = require("luxon")

//creating token: function exec, we ask for actual time & convert it to milliseconds
//plus() will determinate the end of the token on Exp
//here we save the payload
const createToken = () => {
  const payload = {
    iat: DateTime.now().toMillis(),
    exp: DateTime.now().plus({ days: 14 }),
  }
  //transform this payload into the token actual form. process.env.JWT_SECRET will carry our password
  jwt.encode(payload, process.env.JWT_SECRET)
}

//here we recover the payload
const decodeToken = (token) => {
    //define payload
    let payload
    //"try" to protect token. catch for error
    try {
    //opening & validating token. token > password
    //set value
     payload = jwt.decode(token, process.env.JWT_SECRET)
    //is it expired?
    if (payload.exp <= dateTime.now().toMillis()) {
      return { message: "token expired" }
    }
  } catch (error) {
    console.log(error)
  }
  //if its not expired
  return payload
}

//export for middlewares
module.exports = {
  createToken,
  decodeToken,
}
