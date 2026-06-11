import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateReturnAuthorization() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [reason, setReason] = useState("");
    const [sku, setSku] = useState("");
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findReturnAuthorization/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {

            let r = response.data.returnAuthorization;

            setReason(r.reason);
            setSku(r.sku);
            setStatus(r.status);

            if (r.order) {
                setOrderId(r.order.orderID);
            }

        })
        .catch((error) => {
            console.error(error);
            setErrorMsg("Error loading data");
        });

    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

        setErrorMsg("");
        setSuccessMsg("");

        if (!reason || !sku || !status || !orderId) {
            setErrorMsg("⚠️ Please fill all fields");
            return;
        }

        const numericOrderId = Number(orderId);

        if (isNaN(numericOrderId)) {
            setErrorMsg("Order ID must be a number");
            return;
        }

        let url = `http://localhost:9011/api/updateReturnAuthorization/${id}`;
        const token = localStorage.getItem("token");

        let data = {
            returnAuthorization: {
                reason,
                sku,
                status,
                order: {
                    orderID: numericOrderId
                }
            }
        };

        axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setSuccessMsg("Return Authorization updated successfully");

            setTimeout(() => {
                navigate("/ReturnAuthorization/findAllReturnAuthorization");
            }, 1500);
        })
        .catch((error) => {
            console.error(error);

            // ✅ FIX: show proper backend message
            if (error.response) {
                if (typeof error.response.data === "string") {
                    setErrorMsg(error.response.data);
                }
                else if (error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                }
                else {
                    setErrorMsg("Order ID is invalid");
                }
            } else {
                setErrorMsg("Update failed");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Return Authorization</h2>

            {/* ✅ Success */}
            {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
            )}

            {/* ✅ Error */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">ID</label>
                <input className="form-control" value={id} readOnly />
            </div>

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
                />
                {!orderId && errorMsg && (
                    <small className="text-danger">Order ID is required</small>
                )}
            </div>

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
                />
                {!sku && errorMsg && (
                    <small className="text-danger">SKU is required</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Reason</label>
                <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                        setErrorMsg("");
                    }}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                    className="form-control"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setErrorMsg("");
                    }}
                />
            </div>

            <button className="btn btn-warning" onClick={handleUpdate}>
                Update
            </button>
        </div>
    );
}
