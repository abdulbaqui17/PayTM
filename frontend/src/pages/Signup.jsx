import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SidingHeading } from "../components/SidingHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [username,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">                
                <Heading text={"Sign up"}/>
                <SidingHeading text={"Enter your infromation to create an account"}/>
                <Input placeholder={"First Name"} onChange={e=>{setFname(e.target.value)}}/>
                <Input placeholder={"Last Name"} onChange={e=>{setLname(e.target.value)}}/>
                <Input placeholder={"email@gmail.com"} onChange={e=>{setEmail(e.target.value)}}/>
                <Input placeholder={"password"} onChange={e=>{setPassword(e.target.value)}}/>
                <Button text={"Sign up"} onClick={async()=>{
                   const response= await axios.post("https://pay-tm-chi.vercel.app/api/v1/user/signup",{
                        fname,
                        lname,
                        username,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    const token = localStorage.getItem("token");
                    if(token===response.data.token) {
                        navigate("/dashboard");
                    }else{
                        alert("enter the correct details")
                    }
                }}/>
                <BottomWarning text={"Already have an account?"} bottomText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}