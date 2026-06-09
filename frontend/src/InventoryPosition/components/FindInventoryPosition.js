import { useEffect, useState } from "react";
import axios from "axios";
import {BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom'
export default function FindInventoryPosition(){
    let [invArr, setInvData]= useState([])
    let [searchId, setSearchId]= useState("")

    useEffect(()=>{
        let url ="http://localhost:9011/inventory/fetchAll"
        axios.get(url)
        .then((res)=>{
            setInvData(res.data)
        })
        .catch((error)=>{
            alert("Error :" +(error.message))
        })
    },[])

    useEffect(()=>{
        if(searchId === ""){
            axios.get("http://localhost:9011/inventory/fetchAll")
            .then((res)=> {
                setInvData(res.data)});
            return;
        }

        axios.get("http://localhost:9011/inventory/find/" + searchId)
        .then((res)=>{
            console.log(res.data)
            setInvData([res.data])
        })
        .catch(()=>{
            setInvData([]);
        })
    },[searchId])
    return(
         <div className="container mt-4">
            <h2 className="mb-3">Inventory Position</h2>
            <div className="d-flex justify-content-end mb-3">
            <input type="text"  placeholder="Enter Inventory ID" className="form-control w-25" value={searchId} onChange={(e)=>{setSearchId(e.target.value)}}></input>
            </div>
            <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <td>Inventory ID</td>
                        <td> Location ID</td>
                        <td>sku</td>
                        <td>quantity on hand</td>
                        <td>quantity reserved</td>
                        <td>saftey stock</td>
                        <td>delete</td>
                        <td>edit</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        invArr.map((e)=>{
                            return (
                                <tr>
                                    <td>{e.inventoryId || e.inventoryID}</td>
                                    <td>{e.locationID}</td>
                                    <td>{e.sku}</td>
                                    <td>{e.quantityOnHand}</td>
                                    <td>{e.quantityReserved}</td>
                                    <td>{e.safetyStock}</td>
                                    <td><Link to={"/InventoryPosition/deleteInventoryPosition/"+e.inventoryID} className="btn btn-danger btn-sm me-2">Delete</Link>
                                    </td>
                                    <td><Link to={"/InventoryPosition/updateInventoryPosition/"+e.inventoryID}   className="btn btn-warning btn-sm">Edit</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}