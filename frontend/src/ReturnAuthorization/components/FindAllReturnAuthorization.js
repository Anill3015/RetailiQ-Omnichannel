import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllReturnAuthorization() {

    const [rmaList, setRmaList] = useState([]);
    const token = localStorage.getItem("token");

    const fetchData = () => {
        axios.get("http://localhost:9011/api/fetchAllReturnAuthorizations", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setRmaList(res.data))
        .catch(() => alert("❌ Failed to load data"));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ✅ Status color
    const getColor = (status) => {
    if (status === "REQUESTED") return "warning";   // yellow
    if (status === "APPROVED") return "primary";    // blue
    if (status === "COMPLETED") return "success";  // green
    if (status === "REJECTED") return "danger";    // red
    if (status === "OPEN") return "secondary";     // ✅ grey (fix)
    return "dark";
    };


    // ✅ Actions
    const approve = (id) => {
        axios.put(`http://localhost:9011/api/approveReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchData);
    };

    const reject = (id) => {
        axios.put(`http://localhost:9011/api/rejectReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchData);
    };

    const complete = (id) => {
        axios.put(`http://localhost:9011/api/completeReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchData);
    };

    return (
        <div className="container mt-4">
            <h2>Return Authorizations</h2>

            <table className="table table-bordered table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Order</th>
                        <th>SKU</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rmaList.map(r => (
                        <tr key={r.rmaId}>
                            <td>{r.rmaId}</td>
                            <td>{r.order?.orderID}</td>
                            <td>{r.sku}</td>
                            <td>{r.reason}</td>

                            {/* ✅ Badge */}
                            <td>
                                <span className={`badge bg-${getColor(r.status)}`}>
                                    {r.status}
                                </span>
                            </td>

                            <td>

                                {/* ✅ REQUESTED → Approve / Reject */}
                                {r.status === "REQUESTED" && (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => approve(r.rmaId)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => reject(r.rmaId)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}

                                {/* ✅ APPROVED → Complete */}
                                {r.status === "APPROVED" && (
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => complete(r.rmaId)}
                                    >
                                        Complete
                                    </button>
                                )}

                                {/* ✅ ALWAYS SHOW EDIT */}
                                <Link
                                    to={`/ReturnAuthorization/updateReturnAuthorization/${r.rmaId}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>

                                {/* ✅ ALWAYS SHOW DELETE */}
                                <Link
                                    to={`/ReturnAuthorization/deleteReturnAuthorization/${r.rmaId}`}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </Link>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
