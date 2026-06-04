import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function FindAllUser() {
    const [userArr, setUserData] = useState([]);
<<<<<<< HEAD

    async function fetchall(){
        let url="http://localhost:9011/user/fetchAll";


        try{
            let res=await axios.get(url);
            setUserData(res.data);

        }catch(err){
            alert(err.message)
        }
    }
    useEffect(() => {
        fetchall();
    }, []);

    return (
        <div>
            <h2>All Users</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userArr.map((u) => {
                            return (
                                <tr key={u.userId}>
                                    <td>{u.userId}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.role ? u.role.name : "N/A"}</td>
                                    <td>
                                        {/* ✅ capital U, editUser */}
                                        <Link to={`/User/deleteUser/${u.userId}`}>Delete</Link>
                                        &nbsp;&nbsp;
                                        <Link to={`/User/editUser/${u.userId}`}>Edit</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
=======
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/user/fetchAll",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setUserData(response.data);
                } else {
                    setError("Unexpected response from server");
                }
            })
            .catch((err) => setError("Error: " + err.message));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Users</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userArr.map((u) => (
                            <tr key={u.userId}>
                                <td>{u.userId}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.role ? u.role.name : "N/A"}</td>
                                <td>
                                    <Link to={`/User/deleteUser/${u.userId}`}
                                        className="btn btn-danger btn-sm me-2">Delete</Link>
                                    <Link to={`/User/editUser/${u.userId}`}
                                        className="btn btn-warning btn-sm">Edit</Link>
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