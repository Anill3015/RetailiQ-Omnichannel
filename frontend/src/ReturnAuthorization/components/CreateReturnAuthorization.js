import axios from "axios";
import { useState } from "react";

export default function CreateReturnAuthorization() {

    const [reason, setReason] = useState("");
    const [sku, setSku] = useState("");
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState("");

    const handleCreate = () => {

        if (!orderId) {
            alert("❌ Order ID is required");
            return;
        }

        const numericOrderId = Number(orderId);

        if (isNaN(numericOrderId)) {
            alert("❌ Enter valid numeric Order ID");
            return;
        }

        const url = "http://localhost:9011/api/addReturnAuthorization";
        const token = localStorage.getItem("token");

        const data = {
            returnAuthorization: {
                reason,
                sku,
                status,
                order: {
                    orderID: numericOrderId
                }
            }
        };

        console.log("Sending data:", data);

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("✅ Return Authorization created successfully");
            setReason("");
            setSku("");
            setStatus("");
            setOrderId("");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("❌ Error creating Return Authorization");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create Return Authorization</h2>

            <div className="mb-3">
                <label className="form-label">Reason</label>
                <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">SKU</label>
                <input
                    className="form-control"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter SKU"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Order ID</label>
                <input
                    className="form-control"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter numeric order ID"
                />
            </div>

            <button className="btn btn-warning" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}