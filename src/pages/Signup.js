import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        try {
            const raw = localStorage.getItem("users_v1") || "[]";
            const users = JSON.parse(raw);
            if (users.find((u) => u.email === email)) {
                alert("Email already registered. Please login.");
                return;
            }
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem("users_v1", JSON.stringify(users));
            const user = { name, email };
            loginUser(user);
            alert("Signup successful!");
            navigate("/");
        } catch {
            alert("Something went wrong.");
        }
    };

    return (
        <div className="auth-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    );
}