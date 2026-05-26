import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindAllRole() {
    const [roleArr, setRoleArr] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9011/role/fetchAll")
            .then((res) => {
                setRoleArr(res.data);
            })
            .catch((err) => alert(err.message));
    }, []);

    return (
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
        </div>
    );
}