import React, { useEffect, useState } from "react";
import api from "../../instance/api";
import ProductListComp from "../../components/ProductListComp";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const res = await api.get("/api/admin/products");
                console.log(res.data.data);
                setProducts(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchproducts();
    }, []);
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-semibold">Manage Products</h1>
                <Link to={"/admin/products/create"} className="px-4 py-2 bg-secondary rounded-sm text-white font-semibold">Add Product</Link>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {products.map((p) => {
                    return (
                        <ProductListComp
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            image={p.image_url}
                            price={p.price}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
