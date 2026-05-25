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

        let url = "http://localhost:9011/api/addReturnAuthorization";

        let data = {
            returnAuthorization: {
                reason: reason,
                sku: sku,
                status: status,
                order: {
                    orderID: numericOrderId   // ✅ FIXED (IMPORTANT)
                }
            }
        };

        console.log("Sending data:", data); // ✅ Debug

        axios.post(url, data)
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
        <div>
            <h2>Create Return Authorization</h2>

            <label>Reason</label>
            <input value={reason} onChange={(e) => setReason(e.target.value)} />
            <br />

            <label>SKU</label>
            <input value={sku} onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>Status</label>
            <input value={status} onChange={(e) => setStatus(e.target.value)} />
            <br />

            <label>Order ID</label>
            <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <br />

            <button onClick={handleCreate}>CREATE</button>
        </div>
    );
}
