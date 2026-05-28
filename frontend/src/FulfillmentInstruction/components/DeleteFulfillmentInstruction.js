import { useParams } from "react-router"
import axios from "axios";
export default function DeleteFulfillmentInstruction(){
    let {eid} =  useParams()
    let url = "http://localhost:9011/fulfillments/delete/"+eid

    axios.delete(url)
    .then((response)=>{
        alert(response.data)
    })
    .catch((error)=>{
        alert("Error"+(error.message))
    })
    return(
        <div>
            <h1>DeleteFulfillmentInstruction</h1>
            
        </div>
    )
}