import axios from 'axios';
import { useState } from 'react';

export default function FindUserById() {
    const [id, setId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    let searchUser = (event) => {
        event.preventDefault();
        setError(""); setUser(null);
        if (!id) { setError("Please enter a User ID"); return; }
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/user/find/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => setUser(res.data))
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("User not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Find User By ID</h2>
            <form onSubmit={searchUser} className="d-flex gap-2 mb-3">
                <input
                    type="number"
                    className="form-control w-25"
                    placeholder="enter user id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {user && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th><th>Name</th><th>Email</th>
                            <th>Phone</th><th>Role</th>
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