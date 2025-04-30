import React from "react";
import api from "../instance/api";
import { useNavigate } from "react-router-dom";

const FeaturedProductComp = ({ image, name, price, id }) => {
    const navigate = useNavigate();
    const cartHandle = async (e) => {
        e.preventDefault()
        try {
            await api.post("/api/carts", { product_id: id, quantity: 1 });
            navigate('/cart');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <img
                src={`http://127.0.0.1:8000/storage/${image}`}
                alt=""
                className="w-full h-fit bg-gray-200"
            />
            <h2 className="text-lg font-semibold">{name}</h2>
            <h3 className="text-md">${price}</h3>
            <button className="text-md bg-primary text-white font-semibold px-4 py-2 cursor-pointer rounded-sm" onClick={(e) => cartHandle(e)}>Add To Cart</button>
        </div>
    );
};

export default FeaturedProductComp;
