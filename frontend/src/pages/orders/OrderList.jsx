import React, { useEffect, useState } from 'react'
import api from '../../instance/api';
import OrdersComp from '../../components/OrdersComp';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/api/admin/orders");
                console.log(res.data.data);
                setOrders(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-semibold">Manage Orders</h1>
            <div className="flex flex-col gap-4 w-full">
                {orders.map((c) => {
                    return (
                        <OrdersComp key={c.id} id={c.id} name={c.name} />
                    );
                })}
            </div>
        </div>
    );
}

export default OrderList