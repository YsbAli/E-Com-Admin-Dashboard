const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: String, require: true }
})

module.exports = mongoose.model("Product", ProductSchema)