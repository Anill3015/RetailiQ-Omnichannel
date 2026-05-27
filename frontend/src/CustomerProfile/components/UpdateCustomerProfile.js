import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateCustomerProfile() {
    const { cpid } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:9011/api/customer/find/${cpid}`)
            .then((response) => {
                const c = response.data;
                setName(c.name || "");
                setEmail(c.email || "");
                setPreferences(c.preferences || "");
            })
            .catch((error) => {
                console.error("Fetch Error:", error);
                alert("Error fetching customer data");
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
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            alert("Customer Updated! " + response.data.message);
            navigate("/CustomerProfile/findCustomerProfile");
        })
        .catch((error) => {
            console.error("Update Error:", error.response?.data || error.message);
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
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
        </div>
    );
}