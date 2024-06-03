const express = require("express")
const app = express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")


//middleware
app.use(express.json())  //it only acjcepts json data and returns json data 
app.use(helmet()) //gives extra protection
app.use(morgan("common"))  //gives additional info about http methods

//mongodb+srv://sheebha:rani123@cluster0.o8fzkn6.mongodb.net/
//mongodb+srv://ranisheebha:Its123@cluster0.d4u9mqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://sheebha:rani123@cluster0.o8fzkn6.mongodb.net/")
.then(()=>console.log("Mongodb is connected"))
.catch((err)=>console.log(err))

// app.get("/",(req, res)=>{
//     res.send("Hello User you have searched for localhost:8123")
// })

//restapi
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)




app.listen(8123, ()=> {
    console.log("Server is runing on port 8123")
})