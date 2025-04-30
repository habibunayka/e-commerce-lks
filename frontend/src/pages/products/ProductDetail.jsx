import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../instance/api";

const ProductDetail = ({ name, price, description, image, ids }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get("/api/products/" + id);
                console.log(res.data.data);
                setProduct(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandle = async () => {
        try {
            await api.post("/api/carts/" + id, {
                product_id: id,
                quantity: quantity
            });
            navigate('/cart');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="flex justify-center items-center">
                <img
                    src={`http://localhost:8000/storage/${image}`}
                    alt=""
                    className="w-100 h-100 bg-gray-200"
                />
            </div>
            <div className="flex flex-col gap-4 pr-40">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <h2 className="text-xl font-semibold">{product.price}</h2>
                <h2 className="text-xl mt-2 font-semibold">Description</h2>
                <p className="text-md font-normal">{product.description}</p>
                <div className="flex flex-row gap-6">
                    <div className="flex flex-row rounded-sm bg-primary text-white">
                        <button className="px-3 py-2 font-semibold">-</button>
                        <input
                            type="text"
                            className="w-12 focus:outline-0 text-center"
                            disa
                            value={quantity}
                        />
                        <button className="px-3 py-2 font-semibold">+</button>
                    </div>
                    <button onClick={()=> addToCartHandle} className="px-4 py-2 bg-secondary text-white text-lg rounded-sm">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
