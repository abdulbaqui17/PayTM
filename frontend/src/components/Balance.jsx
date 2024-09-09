import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

export const Balance = ({ value }) => {
    const navigate=useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg text-green-500">
                Rs {value}
            </div>
            </div>
        <div>
            <Button className="m-10" text={"Log out"} onClick={()=>{
                localStorage.removeItem("token")
                navigate("/signin")
            }}/>
        </div>
    </div>
}