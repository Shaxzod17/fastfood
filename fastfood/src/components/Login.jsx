import React, {useState} from 'react';
import axios from "axios";
import "./Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submitLogin = async (e) => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                username: trimmedUsername,
                password: trimmedPassword,
            });

            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);

            alert("Login successful!");
            console.log(res.data);
            // ... rest is the same
        } catch (err) {
            console.log(err.response?.status, err.response?.data); // temporary debug
            alert("Invalid username or password");
        }
    };

    return (
        <div className="container-login">
            <form className="form-control"  onSubmit={submitLogin}>
                <p className="title">Login</p>
                <div className="input-field">
                    <input
                        required
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="label" htmlFor="input">Enter username</label>
                </div>
                <div className="input-field">
                    <input
                        required
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label" htmlFor="input">Enter Password</label>
                </div>
                <a>Forgot your password?</a>
                <button className="submit-btn">Sign In</button>
            </form>

        </div>
    );
}

export default Login;