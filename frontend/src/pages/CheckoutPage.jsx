import React, { useEffect, useState } from "react";
import api from "../instance/api";
import OrderPlacedComp from "../components/OrderPlacedComp";

const CheckoutPage = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [address, setAddress] = useState([]);
    const [billingAddress, setBillingAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [ordered, setOrdered] = useState(false);
    const [total, setTotal] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/api/carts");
                console.log(res.data.data);
                setOrders(res.data.data);
                let tot = 0;
                res.data.data.forEach((d) => {
                    tot += Number(d.product.price) * Number(d.quantity);
                });
                setTotal(tot);
                console.log(tot);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrders();
        const fetchAddress = async () => {
            try {
                const res = await api.get("/api/addresses");
                console.log(res.data.data);
                setAddress(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchAddress();
    }, []);
    const orderHandle = async (e) => {
        e.preventDefault();
        // const res = await api.post("/api/orders", {
        //     payment_method: "e-money",
        //     shipping_address_id: shippingAddress,
        //     billing_address_id: billingAddress,
        //     shipping_method: "normal",
        // });
        // setOrderDetail(res.data.data);
        setOrdered(true);
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Checkout</h1>
            <h1 className="text-xl font-semibold">Product Details</h1>
            <div className="flex flex-row w-full gap-8 justify-between">
                <div className="flex flex-col gap-6">
                    {orders.map((o) => {
                        return (
                            <div
                                key={o.id}
                                className="flex flex-row justify-between items-center"
                            >
                                <div className="flex flex-row gap-6">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${o.product.image_url}`}
                                        alt=""
                                        className="h-40 w-40"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-lg font-semibold">
                                            {o.product.name}
                                        </h1>
                                        <p className="text-md">
                                            {o.product.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <h3 className="text-md font-semibold">
                                        ${o.product.price}
                                    </h3>
                                    <h3 className="text-md font-semibold">
                                        x
                                    </h3>
                                    <h3 className="text-md font-semibold">
                                        {o.quantity}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex flex-col">
                        <h1 className="text-xl mb-2 font-semibold" onChange={(e)=> setBillingAddress(e.target.value)}>
                            Billing Address
                        </h1>
                        <select name="" id="" className="px-2 py-1 mb-4 text-md bg-gray-200 rounded-md">
                            {address.map((a) => {
                                return (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                );
                            })}
                        </select>
                        <h1 className="text-xl mb-2 font-semibold">
                            Shipping Address
                        </h1>
                        <select name="" id="" className="px-2 py-1 mb-4 text-md bg-gray-200 rounded-md" onChange={(e)=> setShippingAddress(e.target.value)}>
                            {address.map((a) => {
                                return (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col p-4 gap-4 w-90 h-fit bg-secondary rounded-sm text-white">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <div className="border-b"></div>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-lg font-semibold">Subtotal</h2>
                        <h2 className="text-lg font-semibold">${total}</h2>
                    </div>
                    <button
                        onClick={(e) => orderHandle(e)}
                        className="w-full py-2 flex font-semibold mt-2 bg-primary justify-center"
                    >
                        Place Order
                    </button>
                </div>
            </div>
            {ordered && <OrderPlacedComp />}
        </div>
    );
};

export default CheckoutPage;
