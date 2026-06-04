import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllReturnAuthorization() {

    const [rmaList, setRmaList] = useState([]);

<<<<<<< HEAD
    // ✅ Fetch all records
    const fetchData = () => {
        axios.get("http://localhost:9011/api/fetchAllReturnAuthorizations")
            .then((response) => {
                setRmaList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("❌ Failed to load data");
            });
    };

    // ✅ Load on page start
=======
    const fetchData = () => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:9011/api/fetchAllReturnAuthorizations", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setRmaList(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("❌ Failed to load data");
        });
    };

>>>>>>> Rakesh
    useEffect(() => {
        fetchData();
    }, []);

    return (
<<<<<<< HEAD
        <div>
            <h2>Return Authorizations List</h2>

            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>RMA ID</th>
                        <th>Order ID</th>
                        <th>SKU</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rmaList.length > 0 ? (
=======
        <div className="container mt-4">
            <h2 className="mb-3">Return Authorizations List</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>RMA ID</th>
                            <th>Order ID</th>
                            <th>SKU</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rmaList.length > 0 ? (
>>>>>>> Rakesh
                            rmaList.map((rma) => (
                                <tr key={rma.rmaId}>
                                    <td>{rma.rmaId}</td>

<<<<<<< HEAD
                                    {/* ✅ ManyToOne relation handling */}
=======
>>>>>>> Rakesh
                                    <td>
                                        {rma.order ? rma.order.orderID : "N/A"}
                                    </td>

                                    <td>{rma.sku}</td>
                                    <td>{rma.reason}</td>
                                    <td>{rma.status}</td>

                                    <td>
<<<<<<< HEAD
                                        {/* ✅ Delete (Routing based) */}
                                        <Link to={`/ReturnAuthorization/deleteReturnAuthorization/${rma.rmaId}`}>
                                            Delete
                                        </Link>

                                        {" | "}

                                        {/* ✅ Edit */}
                                        <Link to={`/ReturnAuthorization/updateReturnAuthorization/${rma.rmaId}`}>
=======
                                        <Link
                                            to={`/ReturnAuthorization/deleteReturnAuthorization/${rma.rmaId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>

                                        <Link
                                            to={`/ReturnAuthorization/updateReturnAuthorization/${rma.rmaId}`}
                                            className="btn btn-warning btn-sm"
                                        >
>>>>>>> Rakesh
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
<<<<<<< HEAD
                                <td colSpan="6">No Return Authorizations Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
=======
                                <td colSpan="6" className="text-center">
                                    No Return Authorizations Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
>>>>>>> Rakesh
        </div>
    );
}