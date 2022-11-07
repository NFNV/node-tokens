const { authService } = require("../services")
//middleware to validate token in petittion
//req = obtain parameters (token); res = allow us to throw error; next = if it's okay, go forward
const isAuth = (req, res, next) => {
  //if you don't have a token, then you don' have access to the endpoint

  if (!req.headers.authorization) {
    return res.status(401).send({ message: "You are not logged in" })
  }
  //obtaining token from header. we split bearer & token. position 1 is the token

  const token = req.headers.authorization.split(" ")[1]
  //opening & validating token

  const payload = authService.decodeToken(token)
  if (payload.message) {
    return res.status(401).send(message)
  }
  next()
}
//just one function here, so we export in this way. object not necessary

module.exports = isAuth
