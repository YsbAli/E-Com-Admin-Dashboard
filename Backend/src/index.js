const express = require("express")
const connect = require("./configs/db")

const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())                          // this is for cors issue


const productController = require('./controllers/product.controller')
const AuthController = require("./controllers/auth.controller")

app.use('/api', productController)

app.use("/api", AuthController)


app.listen(5002, async () => {
    try {
        await connect()
        console.log("Connected to the port 5002")
    } catch (err) {
        console.log({ message: err.message })
    }
})