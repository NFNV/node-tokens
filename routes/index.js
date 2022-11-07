//here we import controllers & middlewares, also route controllers' petitions
const express = require("express")

//recive & delegate petitions

const routes = express.Router()

const { userController } = require("../controllers")
const { isAuth } = require("../middlewares")
//post verb for both login & register

routes.post("/login", userController.login)
routes.post("/register", userController.register)
//get are protected, so we use isAuth here
routes.get("/hi", isAuth, userController.sayHi)

//export
module.exports = routes
