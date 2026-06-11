import axios from "axios";
import { useState } from "react";

export default function FindReturnAuthorizationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = () => {

        setErrorMsg("");
        setData(null);

        // ✅ Validation
        if (!id) {
            setErrorMsg("⚠️ Please enter RMA ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findReturnAuthorization/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const rma = response.data.returnAuthorization;
            setData(rma);
        })
        .catch((error) => {
            console.error(error);
            setData(null);

            // ✅ Proper backend error handling
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    setErrorMsg("❌ " + error.response.data.message);
                } else if (typeof error.response.data === "string") {
                    setErrorMsg("❌ " + error.response.data);
                } else {
                    setErrorMsg("❌ Record not found");
                }
            } else {
                setErrorMsg("❌ Record not found");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Return Authorization By ID</h2>

            {/* ✅ Error Message */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">
                    Enter RMA ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="number"
                    className="form-control"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter RMA ID"
                />
                {!id && errorMsg && (
                    <small className="text-danger">
                        RMA ID is required
                    </small>
                )}
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {/* ✅ Result Table */}
            {data && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>RMA ID</th>
                            <td>{data.rmaId}</td>
                        </tr>

                        <tr>
                            <th>Order ID</th>
                            <td>
                                {data.order ? data.order.orderID : "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>SKU</th>
                            <td>{data.sku}</td>
                        </tr>

                        <tr>
                            <th>Reason</th>
                            <td>{data.reason}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{data.status}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}