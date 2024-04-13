const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/ytlogin")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const user = new mongoose.model("user",userSchema)


app.post("/register",async(req,res)=>{
    try {
        const newUser = user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        console.error("error during registeration",error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email: email, password: password });
        if (existingUser) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(9002)