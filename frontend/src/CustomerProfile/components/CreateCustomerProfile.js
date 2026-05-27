import axios from 'axios';
import { useState } from 'react';

export default function CreateCustomerProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

    const saveHandler = () => {
        const url = "http://localhost:9011/api/customer/add";
        const data = {
            customerProfile: {
                name: name,
                email: email,
                preferences: preferences
            }
        };
        axios.post(url, data)
            .then((response) => {
                alert("Customer Profile Saved! " + response.data.message);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Create Customer Profile</h2>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Preferences</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter preferences"
                    onChange={(e) => setPreferences(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={saveHandler}>
                SAVE
            </button>
        </div>
    );
}