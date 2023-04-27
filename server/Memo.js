const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    text: String
},{
    timestamps:true
})

module.exports = mongoose.model("Memo", userSchema)