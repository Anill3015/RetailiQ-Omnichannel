import { useParams } from "react-router"
import axios from "axios";
export default function DeleteInventory(){
      let {eid}=useParams();
    let url =  "http://localhost:9011/inventory/delete/"+eid
        
    axios.delete(url)
        .then((response)=>{
            alert(response.data)
        })
    return(

        <div>
            <h1>Delete</h1>
            <span>{eid}</span>
        </div>
    )
}


//     let client_data={
        //        data: {
        //         "inventoryID":parseInt(eid),
        //          "locationID":0.0,
        //                 "sku":0.0,
        //                 "quantityOnHand":0.0,
        //                 "quantityReserved":0.0,
        //                 "safetyStock":0.0
        //     },
        //     headers :{
        //         'Content-Type':'application/json'
        //     }
        // }