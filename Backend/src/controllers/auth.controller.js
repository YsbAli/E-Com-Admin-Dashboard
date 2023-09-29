const express = require("express")

const router = express.Router()
const User = require("../models/user.model")

require("dotenv").config()


const JWT = require("jsonwebtoken")
const key = process.env.JWT_KEY
const TokenVarify = require("../Middleware/Varify")



router.post("/register", async (req, resp) => {
    try {
        const user = await User.create(req.body)
        let userdata = await user.save()
        userdata = userdata.toObject()
        delete userdata.password
        // return resp.send(userdata)

        JWT.sign({ userdata }, key, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.send("Something Went Wrong! Please try after some time")
            }
            resp.send({ userdata, authToken: token })
        })
    } catch (err) {
        return resp.status(500).send({ message: err.message })
    }

})


//login api with jwt token
router.post("/login", async (req, resp) => {
    try {
        const user = await User.findOne(req.body).select("-password")
        // if (req.body.password && req.body.email) {
        if (user) {
            JWT.sign({ user }, key, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send("Something Went Wrong! Please try after some time")
                }
                resp.send({ user: user, authToken: token })
            })

        }
        else {
            resp.send({ Message: "Please try with another email or password!" })
        }

        // } else {
        //     resp.send({ result: "Please try with another email" })
        // }
    }
    catch (err) {
        resp.status(500).send({ message: err.message })
    }

})


module.exports = router;
