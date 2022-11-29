//to create a product
const Product = require("../models/product")
//to see if user exists & add the product
const User = require("../models/user")

//using this params to go for the user (userId), if exists add new product. create product -> assings to the user
const createProduct = async (name, price, stock, userId) => {
  let newProduct
  try {
    //this const will contain the user if exists in DB. findById will find it with all the data
    const userFound = User.findById(userId)

    if (!userFound) return { status: 404, message: "User not found" }
    //if user exists, create new product. Product({parameters I want to create them with})
    newProduct = new Product({ name, price, stock, userOwner: userId })
    //saving model in Mongo
    await newProduct.save()
    //adding new products
    userFound.products.push(newProduct._id)
    await userFound.save()
  } catch (error) {
    console.log(error)
    throw error
  }

  return { status: 200, message: "Product created successfully.", newProduct }
}

module.exports = {
  createProduct,
}
