import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function FindFulfillmentInstruction() {
    let [fulArr, setFulArr] = useState([]);
    let [searchId, setSearchId] = useState("")

    useEffect(() => {
                const token = localStorage.getItem("token");
        let url = "http://localhost:9011/fulfillments/findAll";
        axios.get(url, {
            headers:{
                Authorization: "Bearer" + token
            }
        })
            .then((res) => {
                setFulArr(res.data);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }, []);

    useEffect(()=>{
        if(searchId === " "){
            axios.get("http://localhost:9011/fulfillments/findAll")
            .then((res)=>{setFulArr(res.data)}
            
        )
        return;
        }

        axios.get("http://localhost:9011/fulfillments/findById/"+searchId)
        .then((res)=>setFulArr(res.data))
    }, [searchId])

    return (
        <div className="container mt-4">
            <h1 className="mb-3">FindFulfillmentInstruction</h1>
            <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Instruction ID</th>
                        <th>Order ID</th>
                        <th>Source Location ID</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fulArr.flatMap((e) => {

                            if (!e.items || e.items.length === 0) {
                                return [(
                                    <tr key={e.instructionID}>
                                        <td>{e.instructionID}</td>
                                        <td>{e.orderID}</td>
                                        <td>{e.sourceLocationID}</td>
                                        <td>{e.destination}</td>
                                        <td>{e.status}</td>
                                        <td colSpan="2">No items</td>
                                        <td><Link to={"/FulfillmentInstruction/deleteFulfillmentInstruction/" + e.instructionID} className="btn btn-danger btn-sm me-2">Delete</Link></td>
                                        <td><Link to={"/FulfillmentInstruction/updateFulfillmentInstruction/" + e.instructionID}   className="btn btn-warning btn-sm">Edit</Link></td>
                                    </tr>
                                )];
                            }

                            // Instructions with items — one row per item
                            return e.items.map((item, index) => (
                                <tr key={e.instructionID + "-" + index}>
                                    <td>{index === 0 ? e.instructionID : ""}</td>
                                    <td>{index === 0 ? e.orderID : ""}</td>
                                    <td>{index === 0 ? e.sourceLocationID : ""}</td>
                                    <td>{index === 0 ? e.destination : ""}</td>
                                    <td>{index === 0 ? e.status : ""}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.quantity}</td>
                                    <td>{index === 0 ? <Link to={"/FulfillmentInstruction/deleteFulfillmentInstruction/" + e.instructionID}>Delete</Link> : ""}</td>
                                    <td>{index === 0 ? <Link to={"/fulfillment/updateFulfillmentInstruction/" + e.instructionID}>Edit</Link> : ""}</td>
                                </tr>
                            ));
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>
    );
}