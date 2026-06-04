import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
<<<<<<< HEAD

=======
>>>>>>> Rakesh
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roleId, setRoleId] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:9011/user/find/${id}`)
            .then((res) => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
<<<<<<< HEAD
                if (res.data.role) {
                    setRoleId(String(res.data.role.roleId));
                }
            })
            .catch((err) => {
                alert("Error loading user: " + err.message);
                navigate("/User/findUser");
=======
                if (res.data.role) setRoleId(String(res.data.role.roleId));
            })
            .catch((err) => {
                alert("Error loading user: " + err.message);
                navigate("/User/findAllUser");
>>>>>>> Rakesh
            });
    }, [id]);

    let updateUser = (event) => {
        event.preventDefault();
<<<<<<< HEAD

        if (!roleId) {
            alert("Please select a role");
            return;
        }
=======
        if (!roleId) { alert("Please select a role"); return; }
>>>>>>> Rakesh

        let data = {
            "userId": Number(id),
            "name": name,
            "email": email,
            "phone": phone,
            "roleId": Number(roleId)
        }
<<<<<<< HEAD

        console.log("Sending:", data);

        axios.put("http://localhost:9011/user/update", data)
            .then((res) => {
                alert("User updated successfully!");
                navigate("/User/findUser");
=======
        const token = localStorage.getItem("token");
        axios.put("http://localhost:9011/user/update", data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then(() => {
                alert("User updated successfully!");
                navigate("/User/findAllUser");
>>>>>>> Rakesh
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
            <h2>Update User</h2>
            <form onSubmit={updateUser}>
                <label>Name</label>
                <input
                    placeholder="enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />

                <label>Email</label>
                <input
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />

                <label>Phone Number</label>
                <input
                    placeholder="enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /><br />

                <label>Role</label>
                {/* ✅ value is roleId matching DB */}
               <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
    <option value="">Select Role</option>
    <option value="1">Admin</option>
    <option value="2">User</option>
    <option value="3">Store Associate</option>
    <option value="4">Ecommerce Manager</option>
    <option value="5">Inventory Planner</option>
    <option value="6">Fulfillment Manager</option>
    <option value="7">Customer Service Agent</option>
    <option value="8">Marketing Manager</option>
</select><br />

                <button type="submit">Update User</button>
                &nbsp;
                <button type="button" onClick={() => navigate("/User/findUser")}>Cancel</button>
=======
        <div className="container mt-4">
            <h2>Update User</h2>
            <form onSubmit={updateUser}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="enter name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="enter email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input className="form-control" placeholder="enter phone"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={roleId}
    onChange={(e) => setRoleId(e.target.value)}>
    <option value="">Select Role</option>
    <option value="1">ADMIN</option>
    <option value="2">USER</option>
    <option value="3">STORE_ASSOCIATE</option>
    <option value="4">ECOMMERCE_MANAGER</option>
    <option value="5">INVENTORY_PLANNER</option>
    <option value="6">FULFILLMENT_MANAGER</option>
    <option value="7">CUSTOMER_SERVICE_AGENT</option>
    <option value="8">MARKETING_MANAGER</option>
</select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Update User</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate("/User/findAllUser")}>Cancel</button>
>>>>>>> Rakesh
            </form>
        </div>
    );
}