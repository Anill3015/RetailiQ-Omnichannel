import axios from 'axios';
import { useState } from 'react';

export default function FindUserById() {
    const [id, setId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    let idHandler = (event) => {
        setId(event.target.value);
    }

    let searchUser = (event) => {
        event.preventDefault();
        setError("");
        setUser(null);

        if (!id) {
            setError("Please enter a User ID");
            return;
        }

        axios.get(`http://localhost:9011/user/find/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("User not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Find User By ID</h2>

            <form onSubmit={searchUser}>
                <label>Enter User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={id}
                    onChange={idHandler}
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

            <br />

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {user && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role ? user.role.name : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}