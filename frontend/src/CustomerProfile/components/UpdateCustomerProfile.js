import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateCustomerProfile() {
    const { cpid } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

<<<<<<< HEAD
    useEffect(() => {
        axios.get(`http://localhost:9011/api/customer/find/${cpid}`)
=======
    const nameHandler = (e) => setName(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const preferencesHandler = (e) => setPreferences(e.target.value);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/customer/find/${cpid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
>>>>>>> Rakesh
            .then((response) => {
                const c = response.data;
                setName(c.name || "");
                setEmail(c.email || "");
                setPreferences(c.preferences || "");
            })
            .catch((error) => {
<<<<<<< HEAD
                console.error("Fetch Error:", error);
                alert("Error fetching customer data");
=======
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
>>>>>>> Rakesh
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
<<<<<<< HEAD
            headers: {
                "Content-Type": "application/json"
            }
=======
            headers: { "Content-Type": "application/json" }
>>>>>>> Rakesh
        })
        .then((response) => {
            alert("Customer Updated! " + response.data.message);
            navigate("/CustomerProfile/findCustomerProfile");
        })
        .catch((error) => {
<<<<<<< HEAD
            console.error("Update Error:", error.response?.data || error.message);
            alert("Update Failed: " + (error.response?.data?.message || error.message));
=======
            if (error.response) {
                alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
>>>>>>> Rakesh
        });
    };

    return (
<<<<<<< HEAD
        <div>
            <h2>Update Customer Profile</h2>

            <label>ID</label>
            <input type="text" value={cpid} readOnly />
            <br />

            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />

            <label>Preferences</label>
            <input type="text" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/CustomerProfile/findCustomerProfile")}>Cancel</button>
=======
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
>>>>>>> Rakesh
        </div>
    );
}