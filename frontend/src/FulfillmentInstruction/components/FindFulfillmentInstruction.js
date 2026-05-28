import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function FindFulfillmentInstruction() {
    let [fulArr, setFulArr] = useState([]);

    useEffect(() => {
        let url = "http://localhost:9011/fulfillments/findAll";
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                setFulArr(res.data);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }, []);

    return (
        <div>
            <h1>FindFulfillmentInstruction</h1>
            <table border="1">
                <thead>
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

                            // Instructions with no items — show one row with "No items"
                            if (!e.items || e.items.length === 0) {
                                return [(
                                    <tr key={e.instructionID}>
                                        <td>{e.instructionID}</td>
                                        <td>{e.orderID}</td>
                                        <td>{e.sourceLocationID}</td>
                                        <td>{e.destination}</td>
                                        <td>{e.status}</td>
                                        <td colSpan="2">No items</td>
                                        <td><Link to={"/FulfillmentInstruction/deleteFulfillmentInstruction/" + e.instructionID}>Delete</Link></td>
                                        <td><Link to={"/FulfillmentInstruction/updateFulfillmentInstruction/" + e.instructionID}>Edit</Link></td>
                                    </tr>
                                )];
                            }

                            // Instructions with items — one row per item
                            return e.items.map((item, index) => (
                                <tr key={e.instructionID + "-" + index}>
                                    {/* Show instruction-level data only on the first item row */}
                                    <td>{index === 0 ? e.instructionID : ""}</td>
                                    <td>{index === 0 ? e.orderID : ""}</td>
                                    <td>{index === 0 ? e.sourceLocationID : ""}</td>
                                    <td>{index === 0 ? e.destination : ""}</td>
                                    <td>{index === 0 ? e.status : ""}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.quantity}</td>
                                    <td>{index === 0 ? <Link to={"/fulfillment/delete/" + e.instructionID}>Delete</Link> : ""}</td>
                                    <td>{index === 0 ? <Link to={"/fulfillment/update/" + e.instructionID}>Edit</Link> : ""}</td>
                                </tr>
                            ));
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}