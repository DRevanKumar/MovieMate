import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'; 
import User from './Db/User.js';
import Post from './Db/Post.js';
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
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
             return res.status(400).json({
                message:"username and password required"
            })
        }
        const user= await User.findOne({username})
        if(!user){
            return res.status(404).json({message:"user not found"})
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

app.post('/createpost',async(req,res)=>{
    try{
        const{Title,Poster,Director,Genre,Runtime,Plot,YourReview,Ott,SharedBy,Family}=req.body
        const AuthHead= req.headers.authorization
        if(!AuthHead){
            return res.status(401).json({
                error:"no auth token"
            })
        }
        const token = AuthHead
        jsonwebtoken.verify(token,secret, async(err,user)=>{
            if(err){
                return res.status(401).json({
                    err:"invalid token"
                })
            }

            const postdoc= await Post.create({
                Title,
                Poster,
                Director,
                Genre,
                Runtime,
                Plot,
                YourReview,
                SharedBy,
                Ott,
                Family


            })
            res.json(postdoc);
        })
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

app.get('/createpost/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({error : 'post not found'})
        }
        res.json(post)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

app.delete('/post/:id', async(req,res)=>{
    try{
        const AuthHead= req.headers.authorization
        if(!AuthHead){
            return res.status(401).json({
                error:"no auth token"
            })
        }
        const token = AuthHead
        jsonwebtoken.verify(token,secret, async(err,user)=>{
            if(err){
                return res.status(401).json({
                    err:"invalid token"
                })
            }
        const { id } = req.params;
        const post= await Post.findByIdAndDelete(id)
        if(!post){
            return res.status(404).json({
                msg:"post not found"
            })
        }
        res.status(200).json({msg:"post deleted"})
    })
    
}catch(err){
    return res.status(500).json(err)
}
})

app.get('/movies', async (req, res) => {
    try {
        const Movies = await Post.find();
        res.json(Movies)
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(3000, '0.0.0.0', () => {
    console.log("Server running at port 3000 on all network interfaces")
  })