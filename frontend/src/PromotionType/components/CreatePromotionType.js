import axios from 'axios';
import { useState } from 'react';

export default function CreatePromotionType() {
    const [name, setName] = useState("");

    let save = (event) => {
        event.preventDefault();
        if (!name) { alert("Please enter a promotion type name"); return; }

        axios.post("http://localhost:9011/promotionType/add", { "name": name })
            .then(() => {
                alert("Promotion Type created successfully!");
                setName("");
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
            <h2>Create Promotion Type</h2>
            <form onSubmit={save}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="enter promotion type name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Promotion Type</button>
            </form>
        </div>
    );
}