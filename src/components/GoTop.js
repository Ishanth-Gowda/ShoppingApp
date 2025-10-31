import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function GoTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    if (!visible) return null;
    return (
        <button className="go-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <FaArrowUp />
        </button>
    );
}