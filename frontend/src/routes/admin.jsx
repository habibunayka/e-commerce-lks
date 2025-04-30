import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/admin";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductCreate from "../pages/products/ProductCreate";
import ProductEdit from "../pages/products/ProductEdit";
import ProductList from "../pages/products/ProductList";
import OrderList from "../pages/orders/OrderList";
import OrderShow from "../pages/orders/OrderShow";

const AdminRoutes = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
        setLoading(false);
    }, []);

    if (loading) return null;
    return (
        <AdminLayout>
            <Routes>
                <Route
                    path="/admin/products/"
                    element={
                        userData?.role === "admin" ? (
                            <ProductList />
                        ) : (
                            <Navigate to={"/"} />
                        )
                    }
                />
                <Route
                    path="/admin/products/create"
                    element={<ProductCreate />}
                />
                <Route path="/admin/products/:id" element={<ProductEdit />} />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/orders/1" element={<OrderShow />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminRoutes;
