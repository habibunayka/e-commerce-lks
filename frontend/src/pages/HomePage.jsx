import React, { useEffect, useState } from "react";
import api from "../instance/api";
import FeaturedProductComp from "../components/FeaturedProductComp";
import CategoriesComp from "../components/CategoriesComp";

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get("/api/products?is_featured=true");
                console.log(res.data.data);
                setFeaturedProducts(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        const fetchCategory = async () => {
            try {
                const res = await api.get("/api/categories");
                console.log(res.data.data);
                setCategories(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchFeatured();
        fetchCategory();
    }, []);
    return (
        <main className="flex flex-col px-5 py-4 gap-5">
            <img src="./banner.png" alt="" className="w-full h-80 " />
            <h2 className="text-2xl font-bold text-secondary">
                Featured Products
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map((f) => {
                    return (
                        <FeaturedProductComp
                            key={f.id}
                            name={f.name}
                            image={f.image_url}
                            price={f.price}
                            id={f.id}
                        />
                    );
                })}
            </div>
            <h2 className="text-2xl font-bold text-secondary">
                Featured Products
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((c) => {
                    return (
                        <CategoriesComp key={c.id} id={c.id} name={c.name} />
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
