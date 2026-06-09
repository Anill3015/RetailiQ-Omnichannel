import axios from "axios";
import { useState } from "react";

export default function CreateReturnAuthorization() {

    const [reason, setReason] = useState("");
    const [sku, setSku] = useState("");
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleCreate = () => {

        setErrorMsg("");
        setSuccessMsg("");

        // ✅ Validation
        if (!reason || !sku || !status || !orderId) {
            setErrorMsg("⚠️ Please fill all fields");
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
                status,
                order: {
                    orderID: numericOrderId
                }
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setSuccessMsg("✅ Return Authorization created successfully");

            // ✅ Clear fields
            setReason("");
            setSku("");
            setStatus("");
            setOrderId("");
        })
        .catch((error) => {
            console.error(error);

            if (error.response) {

                if (typeof error.response.data === "string") {
                    setErrorMsg("❌ " + error.response.data);
                }
                else if (error.response.data.message) {
                    setErrorMsg("❌ " + error.response.data.message);
                }
                else {
                    setErrorMsg("❌ Invalid Order ID");
                }

            } else {
                setErrorMsg("❌ Error creating Return Authorization");
            }
        });

    };

    return (
        <div className="container mt-4">
            <h2>Create Return Authorization</h2>

            {/* ✅ Success Message */}
            {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
            )}

            {/* ✅ Error Message */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            {/* Reason */}
            <div className="mb-3">
                <label className="form-label">Reason</label>
                <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter reason"
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
                    onChange={(e) => {
                        setSku(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter SKU"
                />
                {!sku && errorMsg && (
                    <small className="text-danger">SKU is required</small>
                )}
            </div>

            {/* Status */}
            <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                    className="form-control"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter status"
                />
            </div>

            {/* Order ID */}
            <div className="mb-3">
                <label className="form-label">
                    Order ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={orderId}
                    onChange={(e) => {
                        setOrderId(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter numeric order ID"
                />
                {!orderId && errorMsg && (
                    <small className="text-danger">Order ID is required</small>
                )}
            </div>

            <button className="btn btn-warning" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}