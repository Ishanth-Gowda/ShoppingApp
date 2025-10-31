import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
    const { user, logoutUser } = useContext(UserContext);
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-inner container-fluid">
                <div className="nav-left">
                    <Link to="/" className="logo">
                        The Shopping Store
                    </Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <span className="user-text">Hi, {user.name || user.email}</span>
                            <button className="btn ghost logout" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn">Login</Link>
                            <Link to="/signup" className="btn ghost">Sign up</Link>
                        </>
                    )}
                    <Link to="/cart" className="cart-btn">Cart ({cart.reduce((a, i) => a + i.quantity, 0)})</Link>
                </div>
            </div>
        </nav>
    );
}