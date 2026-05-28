import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let login = (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        axios.post("http://localhost:9011/loginapi/login", {
            username: username,
            password: password
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);
            alert("Login successful! Welcome " + res.data.username);
            alert(res.data.token)
            let decoded = jwtDecode(res.data.token);
            alert("Decoded Token: " + JSON.stringify(decoded));
            alert(decoded.role)


            navigate("/User/findUser");
        })
        .catch((err) => {
            alert("Login failed: " + (err.response?.data?.message || err.message));
        });
    }

    return (
        <div>
            <h2>RetailIQ Login</h2>
            <form onSubmit={login}>
                <label>Username</label>
                <input
                    placeholder="enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}