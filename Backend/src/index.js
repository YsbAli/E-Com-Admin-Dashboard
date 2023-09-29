const express = require("express")
const connect = require("./configs/db")

require("dotenv").config()

const cors = require('cors')
const app = express()

const JWT = require("jsonwebtoken")
const key = process.env.JWT_KEY

app.use(express.json())
app.use(cors())                          // this is for cors issue



const productController = require('./controllers/product.controller')
const UserController = require('./controllers/user.controller')
const User = require("./models/user.model")


// app.use('/register', UserController)

app.use('/api', productController)


// app.post("/login", async (req, resp) => {
//     const user = await User.findOne(req.body).select("-password")              //select("- password") is for not show password
//     resp.send(user)

// })



app.post("/api/register", async (req, resp) => {
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
app.post("/api/login", async (req, resp) => {
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
















// app.post("/login", async (req, resp) => {
//     try {
//         const user = await User.findOne(req.body).select("-password")
//         if (req.body.password && req.body.email) {
//             if (user) {
//                 resp.send(user)
//             }
//             else {
//                 resp.send({ result: "User not found" })
//             }
//         } else {
//             resp.send({ result: "Please try with another email" })
//         }
//     }
//     catch (err) {
//         resp.status(500).send({ message: err.message })
//     }

// })






app.listen(5002, async () => {
    try {
        await connect()
        console.log("Connected to the port 5002")
    } catch (err) {
        console.log({ message: err.message })
    }
})