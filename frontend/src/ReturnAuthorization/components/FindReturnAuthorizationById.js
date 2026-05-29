import axios from "axios";
import { useState } from "react";

export default function FindReturnAuthorizationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter ID");
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
            setError("");
        })
        .catch((error) => {
            console.error(error);
            setData(null);
            setError("Record not found ❌");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Return Authorization By ID</h2>

            <div className="mb-3">
                <label className="form-label">Enter RMA ID</label>
                <input
                    type="number"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter RMA ID"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

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