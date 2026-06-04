import axios from 'axios';
import { useState } from 'react';

export default function CreateRole() {
    const [name, setName] = useState("");

<<<<<<< HEAD
    let saveRole = (event) => {
        event.preventDefault();

        if (!name) {
            alert("Please enter a role name");
            return;
        }

        let data = { "name": name }

        axios.post("http://localhost:9011/role/add", data)
            .then((res) => {
=======
    let save = (event) => {
        event.preventDefault();
        if (!name) { alert("Please enter a role name"); return; }
        const token = localStorage.getItem("token");
        axios.post("http://localhost:9011/role/add", { "name": name },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then(() => {
>>>>>>> Rakesh
                alert("Role created successfully!");
                setName("");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
            });
    }

    return (
<<<<<<< HEAD
        <div>
            <h2>Create Role</h2>
            <form onSubmit={saveRole}>
                <label>Role Name</label>
                <input
                    placeholder="enter role name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <button type="submit">Add Role</button>
=======
        <div className="container mt-4">
            <h2>Create Role</h2>
            <form onSubmit={save}>
                <div className="mb-3">
                    <label className="form-label">Role Name</label>
                    <input
                        className="form-control"
                        placeholder="enter role name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Role</button>
>>>>>>> Rakesh
            </form>
        </div>
    );
}