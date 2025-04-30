import React from "react";

const OrderPlacedComp = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[#00000090] py-20">
            <div className=" flex flex-col gap-4 w-200 bg-white px-6 py-4 rounded-md shadow-md">
                <div className="flex w-full items-center flex-col justify-center">
                    <img src="/icon/cart.png" className="w-14 h-14" alt="" />
                    <h2 className="font-semibold text-xl">
                        Thank you, your order has been placed!
                    </h2>
                </div>
                <div className="flex pt-2 justify-center w-full">
                    <table>
                        <tr>
                            <td className="px-3">Order Number</td>
                            <td className="px-3 font-semibold">A</td>
                        </tr>
                        <tr>
                            <td className="px-3">Order Date</td>
                            <td className="px-3 font-semibold">A</td>
                        </tr>
                        <tr>
                            <td className="px-3">Status</td>
                            <td className="px-3 font-semibold">A</td>
                        </tr>
                    </table>
                </div>
                <div className="w-full py-2 border-b"></div>
                <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center w-full mb-3 gap-2 items-center">
                            <img
                                src="/icon/order.png"
                                className="w-12 h-12"
                                alt=""
                            />
                            <h1 className="text-xl font-semibold">
                                Order Details
                            </h1>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg mb-2 font-semibold">
                                Shipping Information
                            </h1>
                            <div className="flex flex-row">
                                <p className="text-md font-semibold">
                                    Billing Address :
                                </p>
                                <p className="text-md"> AA</p>
                            </div>
                            <div className="flex flex-row mb-3">
                                <p className="text-md font-semibold">
                                    Shipping Address :
                                </p>
                                <p className="text-md"> AA</p>
                            </div>
                            <h1 className="text-lg mb-2 font-semibold">
                                Payment Method
                            </h1>
                            <div className="flex flex-row">
                                <p className="text-md">AA</p>
                            </div>
                        </div>
                    </div>
                    <table>
                        <thead className="border-b">
                            <tr>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody className="border-b">
                            <tr>
                                <td className="px-4 py-2">A</td>
                                <td className="px-4 py-2 text-center">
                                    A
                                </td>
                                <td className="px-4 py-2 text-right">
                                    $9
                                </td>
                            </tr>
                        </tbody>
                        <tr>
                            <td colspan="2" className="px-4 py-2">
                                Total
                            </td>
                            <td className="px-4 py-2 font-semibold">$9.00</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderPlacedComp;
