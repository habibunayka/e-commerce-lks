import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/products/ProductDetail";
import CartPage from "../pages/CartPage";
import ProductList from "../pages/products/ProductList";
import ProductEdit from "../pages/products/ProductEdit";
import ProductAll from "../pages/products/ProductAll";
import OrderShow from "../pages/orders/OrderShow";
import OrderHistory from "../pages/orders/OrderHistory";
import ProductCreate from "../pages/products/ProductCreate";
import OrderList from "../pages/orders/OrderList";
import CategoriesPage from "../pages/CategoriesPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CheckoutPage from "../pages/CheckoutPage";
import AdminLayout from "../layout/admin";

const AppRoutes = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
        setLoading(false)
    }, []);

    if (loading) return null;
    return (
        <Routes>
            <Route path="/login" element={!userData? <LoginPage /> : <Navigate to={'/'}/>} />
            <Route path="/register" element={!userData? <RegisterPage />: <Navigate to={'/'}/>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductAll />} />
            <Route path="/categories" element={<CategoriesPage />} />

            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/history" element={userData?<OrderHistory />: <Navigate to={'/'}/>} />
            <Route path="/cart" element={userData?<CartPage />: <Navigate to={'/login'}/>} />
            <Route path="/checkout" element={userData?<CheckoutPage />: <Navigate to={'/'}/>} />
    
        </Routes>
    );
};

export default AppRoutes;
