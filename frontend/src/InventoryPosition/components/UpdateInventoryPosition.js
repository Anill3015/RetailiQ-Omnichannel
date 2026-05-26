import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
export default function UpdateInventoryPosition(){
    let navigate = useNavigate();
    let {eid} = useParams();
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

    let updateButtonhandler=()=>{
        let url = "http://localhost:9011/inventory/update/"+eid
        let inv= {
        "inventoryID":eid,
        "locationID":locationId,
        "sku":sku,
        "quantityOnHand":quantityOnHand,
        "quantityReserved":quantityReserved,
        "safetyStock":safteyStock
        }
    

    axios.put(url,inv)
        .then((res)=>{
        alert("update sucess")
        navigate("/InventoryPosition/FindInventory")
    },[])
}

    useEffect(()=>{
        let url="http://localhost:9011/inventory/find/"+eid
        axios.get(url)
        .then((res)=>{
            console.log(res);
            setLocationId(res.data.locationID)
            setSKU(res.data.sku)
            setQuantityOnHand(res.data.quantityOnHand)
            setQuantityReserved(res.data.quantityReserved)
            setSafteyStock(res.data.safetyStock)
        })
        .catch((error)=>{
            alert("Error :" +(error.message))
        })
    },[eid])
    return(
        <div>
            <h1>{eid} to update </h1>

            <label>Location ID</label>
            <input value={locationId} onChange={locationHandler}></input>
            <br></br>

            <label>sku</label>
            <input value={sku} onChange={skuHandler}></input>
            <br></br>

            <label>quantityOnHand</label>
            <input value={quantityOnHand} onChange={quantityOnHandHandler}></input>
            <br></br>

            <label>quantityReserved</label>
            <input value={quantityReserved} onChange={quantityReservedHandler}></input>
            <br></br>

            <label>safetyStock</label>
            <input value={safteyStock} onChange={safteyStockHandler}></input>
            <br></br>

            <button onClick={updateButtonhandler}>update</button>
        </div>
    )
}