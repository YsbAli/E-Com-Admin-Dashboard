const express = require("express")
const connect = require("./configs/db")

const cors = require('cors')                    // this is for cors issue
const app = express()

app.use(express.json())
app.use(cors())

const productController = require('./controllers/product.controller')
const UserController = require('./controllers/user.controller')


app.use('/register', UserController)
app.use('/products', productController)


app.listen(5002, async () => {
    try {
        await connect()
        console.log("Connected to the port 5002")
    } catch (err) {
        console.log({ message: err.message })
    }
})