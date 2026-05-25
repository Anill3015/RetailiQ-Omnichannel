import axios from 'axios';
import { useState } from 'react';

export default function FindRoleById() {
    const [id, setId] = useState("");
    const [role, setRole] = useState(null);
    const [error, setError] = useState("");

    let searchRole = (event) => {
        event.preventDefault();
        setError("");
        setRole(null);

        if (!id) {
            setError("Please enter a Role ID");
            return;
        }

        axios.get(`http://localhost:9011/role/find/${id}`)
            .then((res) => {
                setRole(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Role not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Find Role By ID</h2>

            <form onSubmit={searchRole}>
                <label>Enter Role ID</label>
                <input
                    type="number"
                    placeholder="enter role id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

            <br />

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {role && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{role.roleId}</td>
                            <td>{role.name}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}