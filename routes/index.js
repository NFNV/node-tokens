//here we import controllers & middlewares, also route controllers' petitions

const express = require("express")

//recive & delegate petitions
const routes = express.Router()

const { userController } = require("../controllers")

//post verb for both login & register
routes.post('/login', userController.login)
routes.post('/register', userController.register)

routes.get('/hi', userController.sayHi)

//export
module.exports = routes