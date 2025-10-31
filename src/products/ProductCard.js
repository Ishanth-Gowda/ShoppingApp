import React from "react";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
    const { cart, addToCart, increaseQty, decreaseQty } = useCart();
    const inCart = cart.find((c) => c.id === product.id);

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} onError={(e) => { e.target.style.display = 'none' }} />
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>

            {!inCart ? (
                <button className="btn add" onClick={() => addToCart(product)}>Add to Cart</button>
            ) : (
                <div className="qty-controls">
                    <button className="btn ghost small" onClick={() => decreaseQty(product.id)}>−</button>
                    <div className="qty-number">{inCart.quantity}</div>
                    <button className="btn ghost small" onClick={() => increaseQty(product.id)}>+</button>
                </div>
            )}
        </div>
    );
}