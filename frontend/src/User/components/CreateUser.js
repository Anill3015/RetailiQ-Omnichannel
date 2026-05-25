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

        axios.post("http://localhost:9011/user/add", data)
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
                <label>Name</label>
                <input
                    placeholder="enter name"
                    value={name}
                    onChange={nameHandler}
                /><br />

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
                <select value={role} onChange={roleHandler}>
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    <option value="store associate">Store Associate</option>
    <option value="ecommerce manager">Ecommerce Manager</option>
    <option value="inventory planner">Inventory Planner</option>
    <option value="fulfillment manager">Fulfillment Manager</option>
    <option value="customer service agent">Customer Service Agent</option>
    <option value="marketing manager">Marketing Manager</option>
</select><br />

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}