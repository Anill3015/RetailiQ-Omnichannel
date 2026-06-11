import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdatePromotion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [rules, setRules] = useState("");
    const [validity, setValidity] = useState("");
    const [promotionTypeId, setPromotionTypeId] = useState("");
    const [promotionTypes, setPromotionTypes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9011/promotionType/fetchAll")
            .then((res) => setPromotionTypes(res.data))
            .catch((err) => alert("Error loading promotion types: " + err.message));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:9011/promotion/find/${id}`)
            .then((res) => {
                setName(res.data.name);
                setRules(res.data.rules);
                setValidity(res.data.validity);
                setPromotionTypeId(res.data.promotionType ?
                    String(res.data.promotionType.promotionTypeId) : "");
            })
            .catch((err) => {
                alert("Error loading promotion: " + err.message);
                navigate("/Promotion/findPromotion");
            });
    }, [id]);

    let update = (event) => {
        event.preventDefault();
        if (!promotionTypeId) { alert("Please select a promotion type"); return; }

        let data = {
            "promotionId": Number(id),
            "name": name, "rules": rules, "validity": validity,
            "promotionType": { "promotionTypeId": Number(promotionTypeId) }
        }

        axios.put("http://localhost:9011/promotion/update", data)
            .then(() => {
                alert("Promotion updated successfully!");
                navigate("/Promotion/findPromotion");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Update Promotion</h2>
            <form onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="enter promotion name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rules</label>
                    <input className="form-control" placeholder="enter rules"
                        value={rules} onChange={(e) => setRules(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Validity</label>
                    <input className="form-control" placeholder="e.g. 2026-01-01 to 2026-12-31"
                        value={validity} onChange={(e) => setValidity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Promotion Type</label>
                    <select className="form-select" value={promotionTypeId}
                        onChange={(e) => setPromotionTypeId(e.target.value)}>
                        <option value="">Select Promotion Type</option>
                        {promotionTypes.map((t) => (
                            <option key={t.promotionTypeId} value={t.promotionTypeId}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Update Promotion</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate("/Promotion/findPromotion")}>Cancel</button>
            </form>
        </div>
    );
}