import { useState } from "react";
import axios from "axios";

export default function CreateFulfillmentInstruction() {

    const [orderID, setOrderID] = useState(0);
    const [sourceLocationID, setSourceLocationId] = useState(0);
    const [destination, setDestination] = useState(0);
    const [sku, setSku] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const orderHandler = (event) => {
        setOrderID(event.target.value);
    };

    const sourceLocationIDHandler = (event) => {
        setSourceLocationId(event.target.value);
    };

    const destinationHandler = (event) => {
        setDestination(event.target.value);
    };

    const skuHandler = (event) => {
        setSku(event.target.value);
    };

    const quantityHandler = (event) => {
        setQuantity(event.target.value);
    };

    const saveHandler = () => {
        const url = "http://localhost:9011/fulfillments/add";

        const ful = {
            orderID: orderID,
            sourceLocationID: sourceLocationID,
            destination: destination,
            items: [
                {
                    sku: sku,
                    quantity: quantity
                }
            ]
        };

        axios.post(url, ful)
            .then((res) => {
                alert("Fulfillment created: " + res.data);
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div className="container mt-4">
            <h1>Create Fulfillment Instruction</h1>

            <div className="mb-3">
                <label className="form-label">Order ID</label>
                <input className="form-control" onChange={orderHandler} />
            </div>

            <div className="mb-3">
                <label className="form-label">Source Location ID</label>
                <input className="form-control" onChange={sourceLocationIDHandler} />
            </div>

            <div className="mb-3">
                <label className="form-label">Destination</label>
                <input className="form-control" onChange={destinationHandler} />
            </div>

            <div className="mb-3">
                <label className="form-label">SKU</label>
                <input className="form-control" onChange={skuHandler} />
            </div>

            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input className="form-control" onChange={quantityHandler} />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    );
}