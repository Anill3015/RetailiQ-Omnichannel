import axios from 'axios';
import { useState } from 'react';

export default function FindRoleById() {
    const [id, setId] = useState("");
    const [role, setRole] = useState(null);
    const [error, setError] = useState("");
 
    let search = (event) => {
        event.preventDefault();
        setError(""); setRole(null);
        if (!id) { setError("Please enter a Role ID"); return; }
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/role/find/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => setRole(res.data))
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Role not found with ID: " + id);
                } else {
                    setError("Role not found with ID: " + id);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Find Role By ID</h2>
            <form onSubmit={search} className="d-flex gap-2 mb-3">
                <input
                    type="number"
                    className="form-control w-25"
                    placeholder="enter role id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {role && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr><th>ID</th><th>Name</th></tr>
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