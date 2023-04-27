const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: Number,
    name: String
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)