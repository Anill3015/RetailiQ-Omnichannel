import axios from 'axios';
import { useState } from 'react';

export default function FindRoleById() {
    const [id, setId] = useState("");
    const [role, setRole] = useState(null);
    const [error, setError] = useState("");
<<<<<<< HEAD

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
=======
 
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
>>>>>>> Rakesh
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Role not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
<<<<<<< HEAD
        <div>
            <h2>Find Role By ID</h2>

            <form onSubmit={searchRole}>
                <label>Enter Role ID</label>
                <input
                    type="number"
=======
        <div className="container mt-4">
            <h2>Find Role By ID</h2>
            <form onSubmit={search} className="d-flex gap-2 mb-3">
                <input
                    type="number"
                    className="form-control w-25"
>>>>>>> Rakesh
                    placeholder="enter role id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
<<<<<<< HEAD
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
=======
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {role && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr><th>ID</th><th>Name</th></tr>
>>>>>>> Rakesh
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