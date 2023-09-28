const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: String, require: true },
    category: { type: String, require: true },
    company: { type: String, require: true },
    user_id: { type: String, require: false }
})

module.exports = mongoose.model("Product", ProductSchema)