import axios from "axios";
import { useState } from "react";

export default function CreateReturnAuthorization() {

    const [reason, setReason] = useState("");
    const [sku, setSku] = useState("");
    const [orderId, setOrderId] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleCreate = () => {

        setErrorMsg("");
        setSuccessMsg("");

        // ✅ Validation
        if (!reason || !sku || !orderId) {
            setErrorMsg("⚠️ All fields are required");
            return;
        }

        const numericOrderId = Number(orderId);

        if (isNaN(numericOrderId)) {
            setErrorMsg("❌ Order ID must be a number");
            return;
        }

        const url = "http://localhost:9011/api/addReturnAuthorization";
        const token = localStorage.getItem("token");

        const data = {
            returnAuthorization: {
                reason,
                sku,
                order: {
                    orderID: numericOrderId
                }
            }
        };

        axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {

            setSuccessMsg("✅ Return Authorization created successfully");

            // ✅ Clear fields
            setReason("");
            setSku("");
            setOrderId("");
        })
        .catch((error) => {

            console.error(error);

            if (error.response) {
                if (typeof error.response.data === "string") {
                    setErrorMsg("❌ " + error.response.data);
                } else if (error.response.data.message) {
                    setErrorMsg("❌ " + error.response.data.message);
                } else {
                    setErrorMsg("❌ Error creating return");
                }
            } else {
                setErrorMsg("❌ Server error");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create Return Authorization</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            {/* Order ID */}
            <div className="mb-3">
                <label className="form-label">
                    Order ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter order ID"
                />
            </div>

            {/* SKU */}
            <div className="mb-3">
                <label className="form-label">
                    SKU <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter SKU"
                />
            </div>

            {/* Reason */}
            <div className="mb-3">
                <label className="form-label">
                    Reason <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason"
                />
            </div>

            <button className="btn btn-primary" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}
