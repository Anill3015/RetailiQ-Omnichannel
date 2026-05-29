import { useState } from "react";
import axios from 'axios';

export default function CreateInventoryPosition(){

    let [locationId, setLocationId] = useState(0)
    let [sku, setSKU] = useState(0)

    let [quantityOnHand, setQuantityOnHand] = useState(0)
    let [quantityReserved, setQuantityReserved] = useState(0)
    let [safteyStock, setSafteyStock] = useState(0)

    let locationHandler =(event)=>{
        setLocationId(event.target.value)
    }

    let skuHandler =(event)=>{
        setSKU(event.target.value)
    }

    let quantityOnHandHandler =(event)=>{
        setQuantityOnHand(event.target.value)
    }
    let quantityReservedHandler =(event)=>{
        setQuantityReserved(event.target.value)
    }

     let safteyStockHandler =(event)=>{
        setSafteyStock(event.target.value)
    }

    let saveHandler=()=>{
        let url = "http://localhost:9011/inventory/create"

        let inv ={
                "locationID":locationId,
                "sku":sku,
                "quantityOnHand":quantityOnHand,
                "quantityReserved":quantityReserved,
                "safetyStock":safteyStock

        }
        
         axios.post(url,inv)
        .then((response)=>{
            alert("inv created"+response.data)
        })
        .catch((error)=>{
            alert("Error :"+(error.response?.inv?.message || error.message))
        })
    }
    
    
    
    
    return (
        <div className="container mt-4">

            <div className="mb-3">
             <label className="form-label">Location ID</label>
                <input  className="form-control"  onChange={locationHandler}></input>
                <br></br>
                </div>

<div className="mb-3">
                <label className="form-label">SKU</label>
                <input  className="form-control"  onChange={skuHandler}></input>
                <br></br>
                </div>
<div className="mb-3">
                <label className="form-label">quantityOnHand</label>
                <input   className="form-control" onChange={quantityOnHandHandler}></input>
                <br></br>
                </div>

                <div className="mb-3">
                <label className="form-label">quantityReserved</label>
                <input  className="form-control"  onChange={quantityReservedHandler}></input>
                <br></br>
                </div>

                <div className="mb-3">
                <label className="form-label">safteyStock</label>
                <input  className="form-control"  onChange={safteyStockHandler}></input>
                <br></br>
                </div>



                <button className="btn btn-primary" onClick={saveHandler}>save</button>

        </div>
    );
}