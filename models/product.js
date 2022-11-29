const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: { type: String, unique: true, lowercase: true, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  //relation 1-1: id, matching (ref) 'User'
  userOwner: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Product", ProductSchema)
