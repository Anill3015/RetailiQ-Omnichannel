import axios from "axios";
import { useState } from "react";

export default function CreateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    let nameHandler = (event) => {
        setName(event.target.value);
    }

    let emailHandler = (event) => {
        setEmail(event.target.value);
    }

    let phoneHandler = (event) => {
        setPhone(event.target.value);
    }

    let roleHandler = (event) => {
        setRole(event.target.value);
    }

    let saveUser = (event) => {
        event.preventDefault();

        if (!role) {
            alert("Please select a role");
            return;
        }

        let data = {
            "name": name,
            "email": email,
            "phone": phone,
            "role": {
                "name": role
            }
        }
        const token = localStorage.getItem("token");
        axios.post("http://localhost:9011/user/add",{
            headers:{
                Authorization:`Bearer ${token}`
            }})
            .then((res) => {
                alert("User created successfully!");
                setName("");
                setEmail("");
                setPhone("");
                setRole("");
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
            <h2>Create User</h2>
            <form onSubmit={saveUser}>
                <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    placeholder="enter name"
                    value={name}
                    onChange={nameHandler}
                    className="form-control"
                />
                </div>

                <label>Email</label>
                <input
                    placeholder="enter email"
                    value={email}
                    onChange={emailHandler}
                /><br />

                <label>Phone Number</label>
                <input
                    placeholder="enter phone number"
                    value={phone}
                    onChange={phoneHandler}
                /><br />

                <label>Role</label>
                <select className="form-select" value={role}
    onChange={(e) => setRole(e.target.value)}>
    <option value="">Select Role</option>
    <option value="ADMIN">Admin</option>
    <option value="USER">User</option>
    <option value="STORE_ASSOCIATE">Store Associate</option>
    <option value="ECOMMERCE_MANAGER">Ecommerce Manager</option>
    <option value="INVENTORY_PLANNER">Inventory Planner</option>
    <option value="FULFILLMENT_MANAGER">Fulfillment Manager</option>
    <option value="CUSTOMER_SERVICE_AGENT">Customer Service Agent</option>
    <option value="MARKETING_MANAGER">Marketing Manager</option>
</select><br />

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}