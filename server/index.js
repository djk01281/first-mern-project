const mongoose = require("mongoose");
const app = require("./app.js");
const User = require("./User.js")
const express = require("express")
const path = require("path");
const Memo = require("./Memo.js");
const { resolve } = require("dns/promises");
const { reset } = require("nodemon");
// (async ()=>{
//     try {
//         mongoose.connect("mongodb://localhost/testdb")
//         console.log("DB CONNECTED")

//         const onListening = () => {
//             console.log("Listening on PORT 5000")
//         }
//         app.listen(5000, onListening)

//     } catch (error) {
//         console.error("error: ", error)
//         throw error
//     }
// })()

mongoose.connect("mongodb://localhost/testdb")

app.use(express.json())

app.get('/api/all', async (req, res)=>{
    console.log("all requested")
    await handleAll(req, res)
}
)

app.post('/api/create', async (req, res) =>{
    console.log("post requested")
    await handlePost(req, res)
})

const handleAll = async (req, res) => {
    const filter = {}
    const all = await Memo.find(filter)
    console.log(all)
    res.json({"memos": all})
}

const handlePost = async(req, res) => {
    try {
        const reqText = req.body['text']
        const memo = new Memo({text: reqText})
        await memo.save().then(()=> console.log(memo))
        res.end("OK")
    } catch (error) {
        console.log(error)
    }
}


//curl -X POST https://djk01281-opulent-fortnight-7jqrg976v4cr5qj-5000.preview.app.github.dev/api/create -H 'Content-Type: application/json' -d '{"text":"This is another memo"}'
app.listen(5000, ()=> console.log("listening on port 5000"))


