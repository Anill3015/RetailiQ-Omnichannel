import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
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
                if (res.data.role) setRoleId(String(res.data.role.roleId));
            })
            .catch((err) => {
                alert("Error loading user: " + err.message);
                navigate("/User/findAllUser");
            });
    }, [id]);

    let updateUser = (event) => {
        event.preventDefault();
        if (!roleId) { alert("Please select a role"); return; }

        let data = {
            "userId": Number(id),
            "name": name,
            "email": email,
            "phone": phone,
            "roleId": Number(roleId)
        }
        const token = localStorage.getItem("token");
        axios.put("http://localhost:9011/user/update", data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then(() => {
                alert("User updated successfully!");
                navigate("/User/findAllUser");
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
            </form>
        </div>
    );
}