//importing mongoose
const mongoose = require("mongoose")
//using Schema from Mongoose
const Schema = mongoose.Schema

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

//exporting with mongoose model
module.exports = mongoose.model('User', UserSchema)