import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'; 
import User from './Db/User.js';
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const mongourl=process.env.mongourl
const secret=process.env.secret

console.log(secret)

mongoose.connect(mongourl)

app.post('/register',async(req,res)=>{
    try{
        const{username,password} = req.body
        const user=await User.create({
            username,
            password
        })
          const token = jsonwebtoken.sign({id:user._id},secret);
        res.json({token});
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
})

app.post("/login",async(req,res)=>{
    try{
        const{username,password} = req.body;
        if(!username || !password){
            res.status(400).json({
                message:"username and password required"
            })
        }
        const user= await User.findOne({username})
        if(!user){
            res.status(404).json({meassage:"user not found"})
        }
        if(password===user.password){
            const token= jsonwebtoken.sign({id:user._id},secret);
            res.json({token})
        }
    }
    catch(e){
        console.log(e)
    }
})

app.listen(3000,()=>{
    console.log("server running at port 3000")
})