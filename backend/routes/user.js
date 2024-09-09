const express=require("express")
const router=express.Router()
const z=require("zod")
const jwt=require("jsonwebtoken")
const { Users, Account } = require("../db")
const {JWT_SECRET}=require("../config.js")
const { authMiddleware } = require("../middleware")

const signupSchema=z.object({
    fname:z.string(),
    lname:z.string(),
    username:z.string().email(),
    password:z.string()
})


router.post("/signup",async (req,res)=>{
    const body=req.body

    const {success}=signupSchema.safeParse(body)

    if(!success){
        return res.json({
            message:"Incorrect inputs"
        })
    }

    const existingUser=await Users.findOne({
        username:body.username
    })

    if(existingUser){
        return res.json({
            message:"Email already taken "
        })
    }

    try {
        // Create new user in database
        const newUser = await Users.create(body);
    
        // Generate JWT token
        const token = jwt.sign(
          {
            userId: newUser._id
          },
          JWT_SECRET,
        );
    
        // Create an associated account for the new user
        const userId = newUser._id;


        await Account.create({
          userId,
          balance: 1 + Math.random() * 10000 // Random initial balance
        });
    
        // Respond with success message and token
        return res.status(201).json({
          message: "User created successfully",
          token:token
        });
      } catch (err) {
        // Handle errors gracefully
        console.error("Error creating user:", err.message);
        return res.status(500).json({
          message: "Server error, please try again later"
        });
      }
    });
const loginSchema=z.object({
    username:z.string().email(),
    password:z.string()
})

router.post("/login",async(req,res)=>{
    const {success}=loginSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
    
    const user = await Users.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            message:"login successfully",
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


const updateBody=z.object({
    fname:z.string(),
    lname:z.string(),
    password:z.string()
})

router.put("/update", authMiddleware, async (req,res)=>{
    const {success}=updateBody.safeParse(req.body)

    if(!success){
        return res.json({
            message:"invalid inputs"
        })
    }

    await Users.updateOne(req.body,{
        id:req.userId
    })
    
    res.json({
        message:"Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || ""

    const user=await Users.find({
        $or:[{
            fname:{
                "$regex":filter
            }

        },{
            lname:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:user.map(user=>({
            username:user.username,
            lname:user.lname,
            fname:user.fname,
            _id:user._id
        }))
    })
})

module.exports=router

