
const express = require('express')

const router = express.Router()

const app = express()

const Product = require("../models/product.model")

const CrudController = require('./crud.controller')


app.use(express.json())


router.get("/all-Products", async (req, resp) => {
    try {
        const product = await Product.find().lean().exec()
        // return resp.send(product)

        if (product.length >= 0) {
            return resp.send(product)
        }
        else {
            return resp.send({ Message: "No Product Found!" })
        }

    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }
})


// router.patch("/:id", CrudController(Product).Update)
// router.delete("/:id", CrudController(Product).Delete)

router.post('/add-Product', async (req, resp) => {
    try {
        const product = await Product.create(req.body)
        return resp.send(product)
    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }
})

router.patch("/product/:id", async (req, resp) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id)
        return resp.send(product)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


router.delete("/product/:id", async (req, resp) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return resp.send(product)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


module.exports = router
