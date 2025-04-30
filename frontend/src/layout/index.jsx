import React from "react";
import HeaderComp from "../components/HeaderComp";
import FooterComp from "../components/FooterComp";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="flex flex-col h-full justify-start">
                <HeaderComp />
                <div className="my-4 mx-5">{children}</div>
            </div>
            <FooterComp />
        </div>
    );
};

export default Layout;
