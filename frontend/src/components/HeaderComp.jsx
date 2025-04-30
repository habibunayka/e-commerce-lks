import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../instance/api";

const HeaderComp = () => {
    const location = useLocation();
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (
            location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname.startsWith("/admin")
        ) {
            setSearchEnabled(false);
        } else {
            setSearchEnabled(true);
        }
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, [location]);
    const logoutHandler = async (e) => {
        e.preventDefault();
        console.log("Logged out!")
        try {
            await api.post("api/logout");
            localStorage.clear();
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <nav className="w-full px-5 py-4 flex flex-col justify-between gap-6 bg-primary shadow-md">
            <div className="flex flex-row justify-between items-center">
                <img src="/logo.png" alt="" className="h-12" />
                <ul className="flex flex-row justify-center items-center gap-8 font-semibold">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/categories">Categories</Link>
                    </li>
                    {userData && (
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    )}
                    {userData ? (
                        <div className="flex flex-row justify-center items-center h-full gap-6">
                            {userData.role === "admin" && (
                                <li>
                                    <Link
                                        className="px-6 py-2 bg-secondary text-white rounded-sm"
                                        to="/admin/products"
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button
                                    className="px-6 py-2 bg-white text-secondary rounded-sm cursor-pointer"
                                    onClick={(e) => logoutHandler(e)}
                                >
                                    Logout
                                </button>
                            </li>
                        </div>
                    ) : (
                        <>
                            <li>
                                <Link
                                    className="px-6 py-2 bg-secondary text-white rounded-sm"
                                    to="/login"
                                >
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="px-6 py-2 bg-white text-secondary rounded-sm -ml-1"
                                    to="register"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {searchEnabled && (
                <search className="flex flex-row gap-4 justify-center items-center px-4 py-2 bg-white border border-gray-300">
                    <img
                        src="./icon/search.png"
                        alt=""
                        className="w-4 relative top-0.4 h-fit"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full focus:outline-0"
                    />
                </search>
            )}
        </nav>
    );
};

export default HeaderComp;
