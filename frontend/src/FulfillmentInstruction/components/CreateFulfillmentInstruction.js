import { useState } from "react";
import axios from 'axios';

export default function CreateFulfillmentInstruction(){

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

    let saveHandler=()=>{
        let url = "http://localhost:9011/fulfillments/add"
        let ful ={
            "orderID": orderID,
            "sourceLocationID":sourceLocationID,
            "destination":destination,
            "items":[{
                "sku":sku,
                "quantity":quantity
            
            }]
        }

        axios.post(url,ful)
        .then((res)=>{
             alert("fulfillment created created"+res.data)
        })
        .catch((error)=>{
                        alert("Error :"+(error.response?.inv?.message || error.message))

        })
    }
    return(
        <div className="container mt-4">
            <h1>CreateFulfillmentInstruction</h1>
<div className="mb-3">
             <label className="form-label">order ID</label>
                <input   className="form-control" onChange={orderHandler}></input>
                <br></br>
                </div>

               
<div className="mb-3">
                <label className="form-label">source Location ID</label>
                <input   className="form-control" onChange={sourceLocationIDHandler}></input>
                <br></br>
                </div>

                <div className="mb-3">
                <label className="form-label">destination</label>
                <input  className="form-control"  onChange={destinationHandler}></input>
                <br></br>
                </div>
               <div className="mb-3">
                 <label className="form-label">SKU</label>
                <input  className="form-control"  onChange={skuHandler}></input>
                <br></br>
                </div>

                <div className="mb-3">
                 <label className="form-label">quantity</label>
                <input  className="form-control"  onChange={quantityHandler}></input>
                <br></br>
                </div>



                <button className="btn btn-primary" onClick={saveHandler}>save</button>
        </div>
    );
}