import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
export default function UpdateFulfillmentInstruction(){
    let navigate = useNavigate();
    let {eid} = useParams();
     let [orderID, setOrderID] = useState(0.0)
    let [sourceLocationID, setSourceLocationId] = useState(0.0)
    let [destination, setDestination] = useState(0.0)
    let [sku, setSku] = useState(0.0)
    let [quantity, setQuantity] = useState(0.0)

    let orderHandler=(event)=>{
        setOrderID(event.target.value)
    }

    let sourceLocationIDHandler=(event)=>{
        setSourceLocationId(event.target.value)
    }
    let destinationHandler=(event)=>{
        setDestination(event.target.value)
    }
    let skuHandler=(event)=>{
        setSku(event.target.value)
    }
    let quantityHandler=(event)=>{
        setQuantity(event.target.value)
    }

     let updateButtonhandler=()=>{
        let url = "http://localhost:9011/fulfillments/update/"+eid
        let inv= {
        "orderID": orderID,
            "sourceLocationID":sourceLocationID,
            "destination":destination,
            "items":[{
                "sku":sku,
                "quantity":quantity
            
            }]
        }
    

    axios.put(url,inv)
        .then((res)=>{
        alert("update sucess"+(res.data))
        navigate("/fulfillments/findFulfillmentInstruction")
    },[])
}

     useEffect(()=>{
        let url="http://localhost:9011/fulfillments/findAll/"+eid
        axios.get(url)
        .then((res)=>{
            setOrderID(res.data.orderID)
            setSourceLocationId(res.data.sourceLocationID)
            setDestination(res.data.destination)
            setSku(res.data.sku)
            setQuantity(res.data.quantity)
        })
        .catch((error)=>{
            alert("Error :" +(error.message))
        })
    },[eid])

    return(
        <div>
            <h1>UpdateFulfillmentInstruction</h1>
             <label>order ID</label>
            <input value={orderID} onChange={orderHandler}></input>
            <br></br>

            <label>source location ID</label>
            <input value={sourceLocationID} onChange={sourceLocationIDHandler}></input>
            <br></br>

            <label>destination</label>
            <input value={destination} onChange={destinationHandler}></input>
            <br></br>

            <label>sku</label>
            <input value={sku} onChange={skuHandler}></input>
            <br></br>

            <label>quantity</label>
            <input value={quantity} onChange={quantityHandler}></input>
            <br></br>

            <button onClick={updateButtonhandler}>update</button>
        </div>
    )
}