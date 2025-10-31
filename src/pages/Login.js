import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            const raw = localStorage.getItem("users_v1") || "[]";
            const users = JSON.parse(raw);
            const found = users.find((u) => u.email === email && u.password === password);
            if (found) {
                const user = { name: found.name, email: found.email };
                loginUser(user);
                alert("Login successful!");
                navigate("/");
            } else {
                alert("Invalid credentials. Try signing up.");
            }
        } catch {
            alert("Something went wrong.");
        }
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
}