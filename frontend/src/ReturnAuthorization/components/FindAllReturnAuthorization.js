import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllReturnAuthorization() {

    const [rmaList, setRmaList] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const token = localStorage.getItem("token");

    const fetchData = () => {

        axios.get("http://localhost:9011/api/fetchAllReturnAuthorizations", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setRmaList(res.data);
            setMessage("");
        })
        .catch((err) => {

            if (err.response && err.response.data) {

                if (typeof err.response.data === "string") {
                    setMessage(err.response.data);
                } else if (err.response.data.error) {
                    setMessage(err.response.data.error);
                } else if (err.response.data.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Failed to load data");
                }

            } else {
                setMessage("Server not reachable");
            }

            setIsError(true);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getColor = (status) => {
        if (status === "REQUESTED") return "warning";
        if (status === "APPROVED") return "primary";
        if (status === "COMPLETED") return "success";
        if (status === "REJECTED") return "danger";
        if (status === "OPEN") return "secondary";
        return "dark";
    };

    const approve = (id) => {
        axios.put(`http://localhost:9011/api/approveReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setMessage("Return approved successfully");
            setIsError(false);
            fetchData();
        })
        .catch((err) => handleActionError(err));
    };

    const reject = (id) => {
        axios.put(`http://localhost:9011/api/rejectReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setMessage("Return rejected successfully");
            setIsError(false);
            fetchData();
        })
        .catch((err) => handleActionError(err));
    };

    const complete = (id) => {
        axios.put(`http://localhost:9011/api/completeReturn/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setMessage("Return completed successfully");
            setIsError(false);
            fetchData();
        })
        .catch((err) => handleActionError(err));
    };

    const handleActionError = (err) => {

        if (err.response && err.response.data) {

            if (typeof err.response.data === "string") {
                setMessage(err.response.data);
            } else if (err.response.data.error) {
                setMessage(err.response.data.error);
            } else if (err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage("Operation failed");
            }

        } else {
            setMessage("Server not reachable");
        }

        setIsError(true);
    };

    return (
        <div className="container mt-4">
            <h2>Return Authorizations</h2>

            {message && (
                <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
                    {message}
                </div>
            )}

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
                    {rmaList.length > 0 ? (
                        rmaList.map(r => (
                            <tr key={r.rmaId}>
                                <td>{r.rmaId}</td>
                                <td>{r.order?.orderID}</td>
                                <td>{r.sku}</td>
                                <td>{r.reason}</td>

                                <td>
                                    <span className={`badge bg-${getColor(r.status)}`}>
                                        {r.status}
                                    </span>
                                </td>

                                <td>

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

                                    {r.status === "APPROVED" && (
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => complete(r.rmaId)}
                                        >
                                            Complete
                                        </button>
                                    )}

                                    <Link
                                        to={`/ReturnAuthorization/updateReturnAuthorization/${r.rmaId}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        to={`/ReturnAuthorization/deleteReturnAuthorization/${r.rmaId}`}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Return Authorizations Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
