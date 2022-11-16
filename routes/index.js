//here we import controllers & middlewares, also route controllers' petitions
const express = require("express")

//recive & delegate petitions

const routes = express.Router()

const { userController, productController } = require("../controllers")
const { isAuth } = require("../middlewares")
const { userSchema } = require("../controllers/schemas")

//post verb for both login & register
//userSchema will execute when login
routes.post("/login", userSchema, userController.login)
routes.post("/register", userController.register)
routes.post("/products", productController.createProduct)
//get are protected, so we use isAuth here
routes.get("/hi", isAuth, userController.sayHi)

//export
module.exports = routes
