import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindAllRole() {
    const [roleArr, setRoleArr] = useState([]);
<<<<<<< HEAD

    useEffect(() => {
        axios.get("http://localhost:9011/role/fetchAll")
            .then((res) => {
                setRoleArr(res.data);
            })
=======
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:9011/role/fetchAll",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => setRoleArr(res.data))
>>>>>>> Rakesh
            .catch((err) => alert(err.message));
    }, []);

    return (
<<<<<<< HEAD
        <div>
            <h2>All Roles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roleArr.map((r) => {
                            return (
                                <tr key={r.roleId}>
                                    <td>{r.roleId}</td>
                                    <td>{r.name}</td>
                                    <td>
                                        <Link to={`/Role/deleteRole/${r.roleId}`}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
=======
        <div className="container mt-4">
            <h2 className="mb-3">All Roles</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleArr.map((r) => (
                            <tr key={r.roleId}>
                                <td>{r.roleId}</td>
                                <td>{r.name}</td>
                                <td>
                                    <Link to={`/Role/deleteRole/${r.roleId}`}
                                        className="btn btn-danger btn-sm">Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
>>>>>>> Rakesh
        </div>
    );
}