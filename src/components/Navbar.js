import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
    const { user, logoutUser } = useContext(UserContext);
    const { cart } = useCart();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutUser();
        navigate("/");
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-inner container-fluid">
                <div className="nav-left">
                    <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
                        The Shopping Store
                    </Link>
                </div>

                {/* Hamburger visible only on mobile */}
                <button
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Right-side actions */}
                <div className="nav-actions">
                    <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
                        {user ? (
                            <>
                                <span className="user-text">Hi, {user.name || user.email}</span>
                                <button className="btn ghost logout" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn" onClick={() => setMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/signup" className="btn ghost" onClick={() => setMenuOpen(false)}>
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Cart always visible */}
                    <Link to="/cart" className="cart-btn">
                        Cart ({cart.reduce((a, i) => a + i.quantity, 0)})
                    </Link>
                </div>
            </div>
        </nav>
    );
}