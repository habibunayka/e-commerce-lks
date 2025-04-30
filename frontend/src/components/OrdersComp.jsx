import React from "react";
import { Link } from "react-router-dom";

const OrdersComp = ({ orderNumber, customer, date, id }) => {
    return (
        <div className="flex flex-row gap-4 justify-between items-center text-white bg-primary rounded-lg px-4 p-3 w-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 text-md">
                    <div className="">Order Number : </div>
                    <div className="">{orderNumber} </div>
                </div>
                <div className="flex flex-row gap-2 text-md">
                    <div className="">Customer : </div>
                    <div className="">{customer}</div>
                </div>
                <div className="flex flex-row gap-2 text-md">
                    <div className="">Date : </div>
                    <div className="">{date} </div>
                </div>
            </div>
            <Link to={'/admin/orders/' + id} className="px-4 py-2 bg-secondary rounded-sm">View</Link>
        </div>
    );
};

export default OrdersComp;
