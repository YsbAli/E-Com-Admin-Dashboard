const mongoose = require("mongoose")

const connect = ()=>{

    return mongoose.connect("mongodb+srv://yousub:yousub_123@cluster0.iktvjjs.mongodb.net/dashboard?retryWrites=true&w=majority")
}

module.exports = connect