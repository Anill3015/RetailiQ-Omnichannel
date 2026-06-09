import axios from "axios";
import { useEffect, useState } from "react";

export default function PendingUsers() {

    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    const fetchUsers = () => {
        axios.get("http://localhost:9011/user/pending", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUsers(res.data))
        .catch(console.error);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const approve = (id) => {
        axios.put(`http://localhost:9011/user/approve/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchUsers);
    };

    const reject = (id) => {
        axios.put(`http://localhost:9011/user/reject/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchUsers);
    };

    return (
        <div className="container mt-4">
            <h2>Pending Users</h2>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(u => (
                        <tr key={u.userId}>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.role?.name}</td>
                            <td>
                                <button className="btn btn-success me-2"
                                    onClick={() => approve(u.userId)}>
                                    Approve
                                </button>

                                <button className="btn btn-danger"
                                    onClick={() => reject(u.userId)}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
