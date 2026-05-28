import axios from 'axios';
import { useState } from 'react';

export default function CreateCustomerProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

    const nameHandler = (e) => setName(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const preferencesHandler = (e) => setPreferences(e.target.value);

    const saveHandler = () => {
        const url = "http://localhost:9011/api/customer/add";
        const data = {
            customerProfile: { name, email, preferences }
        };

        const token = localStorage.getItem("token");

        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                alert("Customer Profile Saved! " + response.data.message);
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create Customer Profile</h2>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={nameHandler} placeholder="Enter full name" />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={emailHandler} placeholder="Enter email address" />
            </div>

            <div className="mb-3">
                <label className="form-label">Preferences</label>
                <input className="form-control" value={preferences} onChange={preferencesHandler} placeholder="e.g. dark mode, notifications" />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    );
}