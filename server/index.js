const mongoose = require("mongoose");
const app = require("./app.js");
const User = require("./User.js")
const express = require("express")
const path = require("path");
const { removeAllListeners } = require("process");
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
app.post('/api/user/create', async (req, res)=>{
    console.log(req.body)
    try {
        const reqid = req.body['id']
        const reqname = req.body['name']
        const user = new User({id: reqid, name: reqname})
        await user.save().then(()=> console.log(user))
    } catch (error) {
        console.log(error)
    }
    
    res.send('User Created')
})
// app.get('/api', async(req, res)=>{
//     const filter = {}
//     const all = await User.find(filter);
//     console.log(all)
//     res.send(all)
// })

const handleUsers = async() =>{
    console.log("Handling Users")
    const filter = {}
    const all =  await User.find(filter)
    console.log(all)
    return all
}

app.get('/api', async (req, res)=>{
    console.log("api requested")
    const usersData = await handleUsers()
    res.json({"users": usersData})
}
)



//curl -X POST https://djk01281-opulent-fortnight-7jqrg976v4cr5qj-5000.preview.app.github.dev/user/create -H 'Content-Type: application/json' -d '{"id":1, "name":"djk"}'
app.listen(5000, ()=> console.log("listening on port 5000"))


