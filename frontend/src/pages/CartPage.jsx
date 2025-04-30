import React, { useEffect, useState } from "react";
import ProductAll from "./products/ProductAll";
import api from "../instance/api";
import { Link } from "react-router-dom";

const CartPage = () => {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get("/api/carts");
                console.log(res.data.data);
                setCarts(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCategory();
    }, []);

    const increaseHandle = async (e, id) => {
        e.preventDefault();
        try {
            await api.post(`/carts/${id}/increase`,{}, {
                "X-Http-Method-Override": "PUT",
            });
            const res = await api.get("/api/carts");
                console.log(res.data.data);
                setCarts(res.data.data);
        } catch (e) {
            console.log(e);
        }
    };
    const decreaseHandle = async (e, id) => {
        e.preventDefault();
        try {
            await api.post(`/carts/${id}/decrease`, {}, {
                "X-Http-Method-Override": "PUT"
            });
            const res = await api.get("/api/carts");
                console.log(res.data.data);
                setCarts(res.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Cart</h1>
            <div className="flex flex-row w-full gap-8 justify-between">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="text-lg py-5 font-semibold border-b-2">
                                Product
                            </td>
                            <td className="text-lg py-5 font-semibold border-b-2">
                                Price
                            </td>
                            <td className="text-lg py-5 font-semibold border-b-2">
                                Quantity
                            </td>
                            <td className="text-lg py-5 font-semibold border-b-2">
                                Total
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((c) => {
                            return (
                                <tr key={c.id}>
                                    <td className="text-lg py-5 font-semibold">
                                        <div className="flex flex-row items-center gap-4">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${c.product.image_url}`}
                                                className="w-30"
                                                alt=""
                                            />
                                            {c.product.name}
                                        </div>
                                    </td>
                                    <td className="text-lg py-5 font-semibold">
                                        ${c.product.price * c.quantity}.00
                                    </td>
                                    <td className="text-lg py-5 font-semibold">
                                        <div className="flex flex-row bg-primary w-25 rounded-md text-white">
                                            <div className="px-3 py-2 cursor-pointer" onClick={(e)=>decreaseHandle(e, c.id)}>-</div>
                                            <input
                                                type="text"
                                                value={c.quantity}
                                                className="text-center focus:outline-0 w-full"
                                            />
                                            <div className="px-3 py-2 cursor-pointer" onClick={(e)=>increaseHandle(e, c.id)}>+</div>
                                        </div>
                                    </td>
                                    <td className="text-lg py-5 font-semibold">
                                        Total
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex flex-col p-4 gap-4 w-90 bg-secondary rounded-sm text-white">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <div className="border-b"></div>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-lg font-semibold">Subtotal</h2>
                        <h2 className="text-lg font-semibold">$0</h2>
                    </div>
                    <Link
                        className="w-full py-2 flex font-semibold mt-2 bg-primary justify-center"
                        to="/checkout"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
