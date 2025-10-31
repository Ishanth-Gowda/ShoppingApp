import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { products } from "../data/products";

export default function CategoryPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [sort, setSort] = useState("none");
    const normalized = category ? category.toLowerCase() : "";

    const filtered = useMemo(() => {
        return products.filter((p) => p.category && p.category.toLowerCase() === normalized);
    }, [normalized]);

    const sorted = useMemo(() => {
        if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
        if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
        return filtered;
    }, [filtered, sort]);

    return (
        <section className="category-page">
            {/* Go Back button */}
            <button className="btn back-btn" onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <div className="category-header">
                <h2>{category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}</h2>
                <div className="sort">
                    <label>Sort by: </label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="none">Default</option>
                        <option value="low">Price Low→High</option>
                        <option value="high">Price High→Low</option>
                    </select>
                </div>
            </div>

            <div className="products-grid">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}