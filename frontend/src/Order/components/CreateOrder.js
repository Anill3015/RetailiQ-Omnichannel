import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
    const [customerID, setCustomerID] = useState("");
    const [channel, setChannel] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState("");
    const [destination, setDestination] = useState("")
    const [inventoryId, setInventoryId] = useState("");
    const navigate = useNavigate();

    const saveHandler = (event) => {
        event.preventDefault();

        // ✅ FIX 1: Validate all 5 fields, not just 3
        if (!customerID || !channel || !totalAmount || !sku || !quantity || !destination || !inventoryId) {
            alert("All fields are required");
            return;
        }

        // ✅ FIX 2: sku and quantity were missing from the request body — this was the root cause of "SKU not found"
        const data = {
            customerID: parseInt(customerID),
            channel: channel,
            totalAmount: parseFloat(totalAmount),
            sku: sku,
            quantity: parseInt(quantity),
            destination : destination,
            inventoryId: inventoryId
        };

        axios.post("http://localhost:9011/orders/add", data)
            .then((response) => {
                alert("Order Created! Order ID: " + response.data.orderID);
                // ✅ FIX 3: Reset all fields including sku and quantity
                setCustomerID("");
                setChannel("");
                setTotalAmount("");
                setSku("");
                setQuantity("");
                setDestination("");
                setInventoryId("");
                navigate("/Order/findOrder");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error: " + error.response.status + " - " + JSON.stringify(error.response.data));
                } else {
                    alert("Network error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create Order</h2>
            <form onSubmit={saveHandler}>
                 <div className="mb-3">
                    <label className="form-label">InventoryId</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Inventory ID"
                        value={inventoryId}
                        onChange={(e) => setInventoryId(e.target.value)}
                        
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter customer ID"
                        value={customerID}
                        onChange={(e) => setCustomerID(e.target.value)}
                        min="1"
                    />
                </div>

                <div className="mb-3">
                    {/* ✅ FIX 4: Consistent label casing */}
                    <label className="form-label">Channel</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ONLINE, STORE"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter total amount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        min="0"
                    />
                </div>

                <div className="mb-3">
                    {/* ✅ FIX 5: Label capitalised from "sku" to "SKU" */}
                    <label className="form-label">SKU</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                    />
                </div>
                 <div className="mb-3">
                    <label className="form-label">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save</button>

            </form>
        </div>
    );
}