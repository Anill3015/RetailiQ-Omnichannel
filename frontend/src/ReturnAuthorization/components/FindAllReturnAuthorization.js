import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllReturnAuthorization() {

    const [rmaList, setRmaList] = useState([]);

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
    useEffect(() => {
        fetchData();
    }, []);

    return (
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
                            rmaList.map((rma) => (
                                <tr key={rma.rmaId}>
                                    <td>{rma.rmaId}</td>

                                    {/* ✅ ManyToOne relation handling */}
                                    <td>
                                        {rma.order ? rma.order.orderID : "N/A"}
                                    </td>

                                    <td>{rma.sku}</td>
                                    <td>{rma.reason}</td>
                                    <td>{rma.status}</td>

                                    <td>
                                        {/* ✅ Delete (Routing based) */}
                                        <Link to={`/ReturnAuthorization/deleteReturnAuthorization/${rma.rmaId}`}>
                                            Delete
                                        </Link>

                                        {" | "}

                                        {/* ✅ Edit */}
                                        <Link to={`/ReturnAuthorization/updateReturnAuthorization/${rma.rmaId}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No Return Authorizations Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}