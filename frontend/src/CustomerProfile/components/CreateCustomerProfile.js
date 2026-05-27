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
        <div>
            <h2>Create Customer Profile</h2>

            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <br />

            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br />

            <label>Preferences</label>
            <input type="text" onChange={(e) => setPreferences(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}