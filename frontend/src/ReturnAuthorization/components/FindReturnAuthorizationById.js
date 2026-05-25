import axios from "axios";
import { useState } from "react";

export default function FindReturnAuthorizationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);

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
                            <td>{data.rmaId}</td>
                        </tr>

                        <tr>
                            <td>Order ID</td>
                            <td>
                                {data.order ? data.order.orderID : "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <td>SKU</td>
                            <td>{data.sku}</td>
                        </tr>

                        <tr>
                            <td>Reason</td>
                            <td>{data.reason}</td>
                        </tr>

                        <tr>
                            <td>Status</td>
                            <td>{data.status}</td>
                        </tr>

                    </tbody>
                </table>
            )}
        </div>
    );
}