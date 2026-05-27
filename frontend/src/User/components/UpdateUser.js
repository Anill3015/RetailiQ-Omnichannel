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
                if (res.data.role) {
                    setRoleId(String(res.data.role.roleId));
                }
            })
            .catch((err) => {
                alert("Error loading user: " + err.message);
                navigate("/User/findUser");
            });
    }, [id]);

    let updateUser = (event) => {
        event.preventDefault();

        if (!roleId) {
            alert("Please select a role");
            return;
        }

        let data = {
            "userId": Number(id),
            "name": name,
            "email": email,
            "phone": phone,
            "roleId": Number(roleId)
        }

        console.log("Sending:", data);

        axios.put("http://localhost:9011/user/update", data)
            .then((res) => {
                alert("User updated successfully!");
                navigate("/User/findUser");
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
            </form>
        </div>
    );
}