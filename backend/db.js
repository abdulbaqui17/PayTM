const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:nNBGy78jvOE02SNR@cluster0.wjlozak.mongodb.net/pytm")

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Users=mongoose.model("Users",userSchema)
const Account=mongoose.model("Account",accountSchema)

module.exports={
    Users,
    Account
}
    
