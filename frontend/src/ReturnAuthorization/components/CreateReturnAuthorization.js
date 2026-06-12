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

        if (!reason || !sku || !orderId) {
            setErrorMsg("All fields are required");
            return;
        }

        const numericOrderId = Number(orderId);

        if (isNaN(numericOrderId)) {
            setErrorMsg("Order ID must be a number");
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

            setSuccessMsg("Return Authorization created successfully");

            setReason("");
            setSku("");
            setOrderId("");
        })
        .catch((err) => {

            if (err.response && err.response.data) {

                if (typeof err.response.data === "string") {
                    setErrorMsg(err.response.data);
                } else if (err.response.data.error) {
                    setErrorMsg(err.response.data.error);
                } else if (err.response.data.message) {
                    setErrorMsg(err.response.data.message);
                } else {
                    setErrorMsg("Error creating return");
                }

            } else {
                setErrorMsg("Server not reachable");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create Return Authorization</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

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
