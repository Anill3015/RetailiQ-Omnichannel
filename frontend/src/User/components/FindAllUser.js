import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function FindAllUser() {
    const [userArr, setUserData] = useState([]);

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
            <table border="1">
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
        </div>
    );
}