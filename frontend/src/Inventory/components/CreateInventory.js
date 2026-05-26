import { useState } from "react";
import axios from 'axios';

export default function CreateInventory(){

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
        console.log(inv);
         axios.post(url,inv)
        .then((response)=>{
            alert("inv created"+response.data)
        })
    }
    
    
    
    
    return (
        <div>
             <label>Location ID</label>
                <input onChange={locationHandler}></input>
                <br></br>

                <label>SKU</label>
                <input onChange={skuHandler}></input>
                <br></br>

                <label>quantityOnHand</label>
                <input onChange={quantityOnHandHandler}></input>
                <br></br>
                <label>quantityReserved</label>
                <input onChange={quantityReservedHandler}></input>
                <br></br>
                <label>safteyStock</label>
                <input onChange={safteyStockHandler}></input>
                <br></br>



                <button onClick={saveHandler}>save</button>

        </div>
    );
}