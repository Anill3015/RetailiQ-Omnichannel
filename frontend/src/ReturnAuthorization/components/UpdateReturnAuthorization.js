import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateReturnAuthorization() {

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [reason, setReason] = useState("");
    const [sku, setSku] = useState("");
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {

        axios.get(`http://localhost:9011/api/findReturnAuthorization/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {

            let r = res.data.returnAuthorization;

            setReason(r.reason);
            setSku(r.sku);
            setStatus(r.status);

            if (r.order) {
                setOrderId(r.order.orderID);
            }
        })
        .catch((err) => {

            if (err.response && err.response.data) {
                if (typeof err.response.data === "string") {
                    setErrorMsg(err.response.data);
                } else if (err.response.data.error) {
                    setErrorMsg(err.response.data.error);
                } else {
                    setErrorMsg("Error loading data");
                }
            } else {
                setErrorMsg("Server not reachable");
            }
        });

    }, [id]);

    const handleUpdate = () => {

        setErrorMsg("");
        setSuccessMsg("");

        if (!reason || !sku || !status || !orderId) {
            setErrorMsg("All fields are required");
            return;
        }

        let url = `http://localhost:9011/api/updateReturnAuthorization/${id}`;

        let data = {
            returnAuthorization: {
                reason,
                sku,
                status,
                order: {
                    orderID: Number(orderId)
                }
            }
        };

        axios.put(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {

            setSuccessMsg("Updated successfully");

            setTimeout(() => {
                navigate("/ReturnAuthorization/findAllReturnAuthorization");
            }, 1200);
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
                    setErrorMsg("Update failed");
                }

            } else {
                setErrorMsg("Server not reachable");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Return Authorization</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <div className="mb-3">
                <label>ID</label>
                <input className="form-control" value={id} readOnly />
            </div>

            <div className="mb-3">
                <label>Order ID</label>
                <input className="form-control" value={orderId} readOnly />
            </div>

            <div className="mb-3">
                <label>SKU</label>
                <input className="form-control" value={sku} readOnly />
            </div>

            <div className="mb-3">
                <label>Reason</label>
                <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Status</label>
                <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="REQUESTED">REQUESTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
            </div>

            <button className="btn btn-warning" onClick={handleUpdate}>
                Update
            </button>
        </div>
    );
}