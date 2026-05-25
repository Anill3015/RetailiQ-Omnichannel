import axios from 'axios';
import { useState } from 'react';

export default function CreatePromotionType() {
    const [name, setName] = useState("");

    let save = (event) => {
        event.preventDefault();

        if (!name) {
            alert("Please enter a promotion type name");
            return;
        }

        axios.post("http://localhost:9011/promotionType/add", { "name": name })
            .then((res) => {
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
        <div>
            <h2>Create Promotion Type</h2>
            <form onSubmit={save}>
                <label>Name</label>
                <input
                    placeholder="enter promotion type name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <button type="submit">Add Promotion Type</button>
            </form>
        </div>
    );
}