import axios from 'axios';
import { useState } from 'react';

export default function FindPromotionById() {
    const [id, setId] = useState("");
    const [promotion, setPromotion] = useState(null);
    const [error, setError] = useState("");

    let search = (event) => {
        event.preventDefault();
        setError("");
        setPromotion(null);

        if (!id) {
            setError("Please enter a Promotion ID");
            return;
        }

        axios.get(`http://localhost:9011/promotion/find/${id}`)
            .then((res) => setPromotion(res.data))
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Promotion not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Find Promotion By ID</h2>
            <form onSubmit={search}>
                <label>Enter Promotion ID</label>
                <input
                    type="number"
                    placeholder="enter promotion id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {promotion && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Rules</th>
                            <th>Validity</th>
                            <th>Promotion Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{promotion.promotionId}</td>
                            <td>{promotion.name}</td>
                            <td>{promotion.rules}</td>
                            <td>{promotion.validity}</td>
                            <td>{promotion.promotionType ? promotion.promotionType.name : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}