import { useEffect } from "react"
import { useParams } from "react-router"

export default function UpdateFulfillmentInstruction(){
    let {eid }= useParams
    let url = "http://localhost:9011/fulfillments/findById" + eid

    useEffect (()=>{
        const token = localStorage.getItem("token")
    })
    return(
        <div>
            <h1>UpdateFulfillmentInstruction</h1>
        </div>
    )
}