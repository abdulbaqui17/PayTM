import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [balance,setBalance]=useState(null)
    useEffect(()=>{
        const fetchBalance=async()=>{
            const response=await axios.get("https://pay-tm-chi.vercel.app/api/v1/account/balance",{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }  
            })
            setBalance(response.data.balance)
        }
        fetchBalance()
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}