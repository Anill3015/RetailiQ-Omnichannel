import axios from 'axios';
import { useState } from 'react';

export default function FindPromotionById() {
    const [id, setId] = useState("");
    const [promotion, setPromotion] = useState(null);
    const [error, setError] = useState("");

    let search = (event) => {
        event.preventDefault();
        setError(""); setPromotion(null);
        if (!id) { setError("Please enter a Promotion ID"); return; }

        axios.get(`http://localhost:9011/promotion/find/${id}`)
            .then((res) => setPromotion(res.data))
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Promotion not found with ID: " + id);
                } else {
                    setError("Promotion not found with ID: " + id);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Find Promotion By ID</h2>
            <form onSubmit={search} className="d-flex gap-2 mb-3">
                <input type="number" className="form-control w-25"
                    placeholder="enter promotion id" value={id}
                    onChange={(e) => setId(e.target.value)} />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {promotion && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th><th>Name</th><th>Rules</th>
                            <th>Validity</th><th>Promotion Type</th>
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