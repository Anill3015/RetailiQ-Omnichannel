import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateCustomerProfile() {
    const { cpid } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

    const nameHandler = (e) => setName(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const preferencesHandler = (e) => setPreferences(e.target.value);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/customer/find/${cpid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                const c = response.data;
                setName(c.name || "");
                setEmail(c.email || "");
                setPreferences(c.preferences || "");
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
    }, [cpid]);

    const updateHandler = () => {
        if (!name || !email) {
            alert("Name and Email are required");
            return;
        }

        const url = "http://localhost:9011/api/customer/update";
        const data = {
            customerProfile: {
                customerId: parseInt(cpid),
                name: name,
                email: email,
                preferences: preferences
            }
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Customer Updated! " + response.data.message);
            navigate("/CustomerProfile/findCustomerProfile");
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
            <h2>Update Customer Profile</h2>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input className="form-control" type="text" value={cpid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" type="text" value={name} onChange={nameHandler} placeholder="Enter name" />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" value={email} onChange={emailHandler} placeholder="Enter email" />
            </div>

            <div className="mb-3">
                <label className="form-label">Preferences</label>
                <input className="form-control" type="text" value={preferences} onChange={preferencesHandler} placeholder="Enter preferences" />
            </div>

            <button className="btn btn-primary me-2" onClick={updateHandler}>Update</button>
            <button className="btn btn-secondary" onClick={() => navigate("/CustomerProfile/findCustomerProfile")}>Cancel</button>
        </div>
    );
}