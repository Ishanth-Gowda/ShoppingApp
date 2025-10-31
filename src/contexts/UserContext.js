import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        // keep localStorage in sync (useful if other parts change user)
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    function loginUser(userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    function logoutUser() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}