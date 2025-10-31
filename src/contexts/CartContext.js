import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const raw = localStorage.getItem("cart_v1");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart_v1", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find((p) => p.id === product.id);
            if (found) {
                return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQty = (id) =>
        setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));

    const decreaseQty = (id) =>
        setCart((prev) =>
            prev
                .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
                .filter((p) => p.quantity > 0)
        );

    const updateQuantity = (id, qty) =>
        setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)));

    const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, increaseQty, decreaseQty, updateQuantity, removeFromCart, clearCart, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}