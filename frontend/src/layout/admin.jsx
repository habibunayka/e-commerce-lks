import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const storedUserData = localStorage.getItem("user");

        if (
            location.pathname.startsWith("/admin") &&
            JSON.parse(storedUserData).role === "admin"
        ) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }, [location]);
    return (
        <div className="relative top-0 flex flex-row right-0 w-full h-full">
            {enabled && (
                <div className="flex flex-col w-80 py-4 gap-5 px-7 h-lvh bg-primary text-white -ml-5 -my-4">
                    <Link
                        to={"/admin/orders"}
                        className="text-lg font-semibold"
                    >
                        Manage Orders
                    </Link>
                    <Link
                        to={"/admin/products"}
                        className="text-lg font-semibold"
                    >
                        Manage Products
                    </Link>
                </div>
            )}
            <div className="w-full ml-5">{children}</div>
        </div>
    );
};

export default AdminLayout;
