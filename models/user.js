//importing mongoose
const mongoose = require("mongoose")
//using Schema from Mongoose
const Schema = mongoose.Schema
//bcrypt
const bcrypt = require("bcrypt-nodejs")

//the schema has to correspond to the data in the user collection (inside mongo)
const UserSchema = new Schema(
  //objects with fields (equal to collumns)
  {
    //config each field
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now() },
  }
)

//a middleware by mongoose. before saveing, exec:
UserSchema.pre("save", function (next) {
  //encrypting
  //this = instance of UserSchema
  let user = this

  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error)

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(error)
      //password is now encrypted
      user.password = hash
      next()
    })
  })
})

//we can save our own functions with 'methods'
//comparing passwords
//'password' is the password that the user is sending us
UserSchema.methods.comparePassword = function (password) {
  //user to compare password
  //this is the user password inside the db
  let user = this
  //compare the two passwords (user sending pw - user pw inside db), will return true o false
  return bcrypt.compareSync(password, user.password)
}

//exporting with mongoose model
module.exports = mongoose.model("User", UserSchema)
