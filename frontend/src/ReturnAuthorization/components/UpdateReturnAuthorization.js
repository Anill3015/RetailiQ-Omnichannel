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

    // ✅ LOAD EXISTING DATA
    useEffect(() => {

        axios.get(`http://localhost:9011/api/findReturnAuthorization/${id}`)
            .then((response) => {

                let r = response.data.returnAuthorization;   // ✅ important

                setReason(r.reason);
                setSku(r.sku);
                setStatus(r.status);

                // ✅ extract from ManyToOne order
                if (r.order) {
                    setOrderId(r.order.orderID);
                }

            })
            .catch((error) => {
                console.error(error);
                alert("❌ Error loading data");
            });

    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

        if (!orderId) {
            alert("❌ Order ID required");
            return;
        }

        const numericOrderId = Number(orderId);

        if (isNaN(numericOrderId)) {
            alert("❌ Invalid Order ID");
            return;
        }

        let url = `http://localhost:9011/api/updateReturnAuthorization/${id}`;

        let data = {
            returnAuthorization: {
                reason: reason,
                sku: sku,
                status: status,
                order: {
                    orderID: numericOrderId   // ✅ IMPORTANT
                }
            }
        };

        axios.put(url, data)
            .then(() => {
                alert("✅ Return Authorization updated successfully");

                // ✅ redirect to list
                navigate("/ReturnAuthorization/findAllReturnAuthorization");
            })
            .catch((error) => {
                console.error(error);
                alert("❌ Update failed");
            });
    };

    return (
        <div>
            <h2>Update Return Authorization</h2>

            <label>ID</label>
            <input value={id} readOnly />
            <br />

            <label>Order ID</label>
            <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <br />

            <label>SKU</label>
            <input value={sku} onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>Reason</label>
            <input value={reason} onChange={(e) => setReason(e.target.value)} />
            <br />

            <label>Status</label>
            <input value={status} onChange={(e) => setStatus(e.target.value)} />
            <br />

            <button onClick={handleUpdate}>UPDATE</button>
        </div>
    );
}