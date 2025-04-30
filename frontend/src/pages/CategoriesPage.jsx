import React, { useEffect, useState } from "react";
import api from "../instance/api";
import CategoriesComp from "../components/CategoriesComp";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get("/api/categories");
                console.log(res.data.data);
                setCategories(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCategory();
    }, []);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((c) => {
                    return (
                        <CategoriesComp key={c.id} id={c.id} name={c.name} />
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesPage;
