//importing express
const express = require("express")
//importing dotenv
const dotenv = require("dotenv")
//importing routes
const routes = require("./routes")

//now we have access to the express app
const app = express()
//middleware, this will allow us to read the petition's body
app.use(express.json())
//loading env config. petitions will arrive here, then the petitions are delegated to routes/index.js
dotenv.config()

//middleware for '/api', then redirects to Routes
app.use('/api', routes)

//listening petitions, server up on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server up on port ${process.env.PORT}`)
})
