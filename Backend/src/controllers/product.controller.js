
const express = require('express')

const router = express.Router()

const app = express()

const Product = require("../models/product.model")

const CrudController = require('./crud.controller')


app.use(express.json())



//Get all Prodcuts API
router.get("/products", async (req, resp) => {
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



// Get One Product API
router.get("/products/:id", async (req, resp) => {
    try {
        const product = await Product.findById(req.params.id)
        // return resp.send(product)
        product ? resp.send(product) : resp.send({ Message: "No Product Found !" })
    }
    catch (err) {
        resp.status(500).send(err.message)
    }
})



// Search API

router.get("/search/:key", async (req, resp) => {
    try {
        const product = await Product.find({
            "$or": [
                { title: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
            ]
        })
        product ? resp.send(product) : resp.send("No result Found !")
    }
    catch (err) {
        return resp.status(500).send({ Message: err.message })
    }
})


//POST API
router.post('/add-product', async (req, resp) => {
    try {
        const product = await Product.create(req.body)
        return resp.send(product)
    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }
})


// PATCH API
router.patch("/update-product/:id", async (req, resp) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return resp.send(product)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


router.delete("/delete-product/:id", async (req, resp) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return resp.send(product)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


module.exports = router
