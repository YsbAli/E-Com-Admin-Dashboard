require("dotenv").config()
const JWT = require("jsonwebtoken")
const key = process.env.JWT_KEY


// // Middleware to token varify
// module.exports = (req, resp, next) => {
//     let token = req.headers["authorization"]
//     if (token) {
//         token = token.split(' ')[1]           //[1] --> will give us the token,,,,                                //[0] --> bearer  ,,,,[1] -->token name
//         // console.log(token)
//         JWT.verify(token, key, (err, valid) => {
//             if (err) {
//                 return resp.status(401).send({ Message: "Please provide valid token" })
//             }
//             else {
//                 next()
//             }
//         })
//     }
//     else {
//         resp.status(403).send({ Message: "Please Add Token" })
//     }
// }



// Middleware to token varify
module.exports = (req, resp, next) => {
    const bearerToken = req.headers["authorization"]
    if (typeof bearerToken !== 'undefined') {
        const bearer = bearerToken.split(" ")
        const token = bearer[1]
        req.token = token
        JWT.verify(token, key, (err, valid) => {
            if (err) {
                return resp.status(401).send({ Message: "Invalid token!" })
            }
            else {
                next()
            }
        })
    }
    else {
        resp.status(403).send({ Message: "Please Add Token" })
    }
}