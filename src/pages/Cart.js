import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
    const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, totalPrice } = useCart();
    const navigate = useNavigate();

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear all items in your cart?")) {
            clearCart();
        }
    };

    return (
        <section className="cart">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <>
                    <p>Your cart is empty.</p>
                    <button className="continue-btn" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button className="clear-cart" onClick={handleClear}>
                            Clear All
                        </button>
                    </div>

                    <div className="cart-list">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <div className="ci-body">
                                    <h4>{item.name}</h4>
                                    <p>₹ {item.price}</p>
                                    <div className="qty">
                                        <button className="btn ghost small" onClick={() => decreaseQty(item.id)}>
                                            -
                                        </button>
                                        <input type="number" min="1" value={item.quantity} readOnly />
                                        <button className="btn ghost small" onClick={() => increaseQty(item.id)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button className="btn ghost delete" onClick={() => removeFromCart(item.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-footer">
                        <h3>Total: ₹ {totalPrice}</h3>
                        <div>
                            <button className="btn" style={{ marginRight: 12 }}>
                                Checkout
                            </button>
                            <button className="continue-btn" onClick={() => navigate("/")}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}