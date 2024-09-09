import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { SidingHeading } from "../components/SidingHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export const Signin=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading text={"Sign In"}/>
                <SidingHeading text={"Enter your credentials to access your account"}/>
                <Input placeholder={"email@gmail.com"}  onChange={e=>{setUsername(e.target.value)} }/>
                <Input placeholder={"password"} onChange={e=>{setPassword(e.target.value)}}/>
                <Button text={"Sign in"} onClick={async()=>{
                    const response=await axios.post("https://pay-tm-chi.vercel.app/api/v1/user/login",{
                        username,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    const token = localStorage.getItem("token");
                    if(token===response.data.token) {
                        console.log("hi in if")
                        navigate("/dashboard");
                    }else{
                        console.log("hi in else")
                        alert("enter the correct details")
                    }
                }}></Button>
                <BottomWarning text={"Don't have an account?"} bottomText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
      </div>
}