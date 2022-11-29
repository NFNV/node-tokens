//validating inputs & calling service

const { productService } = require("../services")

const createProduct = async (req, res) => {
  try {
    //it will recive name, price, stock & userId from req.body
    const { name, price, stock, userId } = req.body
    //& this function will create it
    const result = await productService.createProduct(
      name,
      price,
      stock,
      userId
    )
    res.status(result.status).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createProduct,
}
