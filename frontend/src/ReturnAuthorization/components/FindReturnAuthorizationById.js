import axios from "axios";
import { useState } from "react";

export default function FindReturnAuthorizationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
<<<<<<< HEAD

    const handleSearch = () => {

        if (!id) {
            alert("Please enter ID");
            return;
        }

        axios.get(`http://localhost:9011/api/findReturnAuthorization/${id}`)
            .then((response) => {

                const rma = response.data.returnAuthorization;
                setData(rma);

            })
            .catch((error) => {
                console.error(error);
                alert("Record not found");
                setData(null);
            });
    };

    return (
        <div>
            <h2>Find Return Authorization By ID</h2>

            <div>
                <label>Enter RMA ID: </label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <br />

            {data && (
                <table border="1" cellPadding="6">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>RMA ID</td>
=======
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
>>>>>>> Rakesh
                            <td>{data.rmaId}</td>
                        </tr>

                        <tr>
<<<<<<< HEAD
                            <td>Order ID</td>
=======
                            <th>Order ID</th>
>>>>>>> Rakesh
                            <td>
                                {data.order ? data.order.orderID : "N/A"}
                            </td>
                        </tr>

                        <tr>
<<<<<<< HEAD
                            <td>SKU</td>
=======
                            <th>SKU</th>
>>>>>>> Rakesh
                            <td>{data.sku}</td>
                        </tr>

                        <tr>
<<<<<<< HEAD
                            <td>Reason</td>
=======
                            <th>Reason</th>
>>>>>>> Rakesh
                            <td>{data.reason}</td>
                        </tr>

                        <tr>
<<<<<<< HEAD
                            <td>Status</td>
                            <td>{data.status}</td>
                        </tr>

=======
                            <th>Status</th>
                            <td>{data.status}</td>
                        </tr>
>>>>>>> Rakesh
                    </tbody>
                </table>
            )}
        </div>
    );
}