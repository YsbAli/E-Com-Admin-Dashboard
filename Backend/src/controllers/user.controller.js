
const express = require('express')

const router = express.Router()

const app = express()

const User = require("../models/user.model")

const CrudController = require('./crud.controller')


app.use(express.json())


router.get("/", async (req, resp) => {
    try {
        const user = await User.find().lean().exec()
        return resp.send(user)
    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }
})


// router.patch("/:id", CrudController(User).Update)
// router.delete("/:id", CrudController(User).Delete)

// router.post('/', async (req, resp) => {
//     try {
//         const user = await User.create(req.body)
//         return resp.send(user)
//     } catch (err) {
//         return resp.status(500).send({ message: err.message })
//     }
// })



// for  removing the password field
router.post('/', async (req, resp) => {
    try {
        const user = await User.create(req.body)
        let result = await user.save()
        result = result.toObject()
        delete result.password
        return resp.send(result)
    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }
})


router.patch("/:id", async (req, resp) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        return resp.send(user)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


router.delete("/:id", async (req, resp) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        return resp.send(user)
    }
    catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


module.exports = router
