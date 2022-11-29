//schema is created here, is used in routes & is validated in userController
const { check } = require("express-validator")

//exporting validations
module.exports = [
  //email validations:
  check("email")
    .exists()
    .withMessage("Field required")
    .notEmpty()
    .withMessage("Email field cannot be empty")
    .custom((value) => value.includes("@") && value.includes(".com"))
    .withMessage("Email not valid"),

  //password validations:
  check("password")
    .exists()
    .withMessage("Field required")
    .notEmpty()
    .withMessage("Password field cannot be empty"),
]
