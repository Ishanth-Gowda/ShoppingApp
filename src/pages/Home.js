import React from "react";
import { Link } from "react-router-dom";

const categories = [
    { slug: "men", name: "Men", img: `${process.env.PUBLIC_URL}/images/menclothing.png` },
    { slug: "women", name: "Women", img: `${process.env.PUBLIC_URL}/images/womenclothing.png` },
    { slug: "footwear", name: "Footwear", img: `${process.env.PUBLIC_URL}/images/footwear.png` },
    { slug: "accessories", name: "Accessories", img: `${process.env.PUBLIC_URL}/images/accesories.png` },
];

export default function Home() {
    return (
        <section className="home">
            <div className="categories-grid">
                {categories.map((c) => (
                    <Link to={`/category/${c.slug}`} key={c.slug} className="category-card">
                        <img src={c.img} alt={c.name} />
                        <div className="category-label">{c.name}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}