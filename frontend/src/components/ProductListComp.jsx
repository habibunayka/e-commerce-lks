import React from "react";
import { Link } from "react-router-dom";

const ProductListComp = ({ name, price, image, id }) => {
    return (
        <div className="flex flex-row gap-4 justify-between items-center text-white bg-primary rounded-lg px-4 p-3 w-full">
            <div className="flex flex-row gap-4 justify-center items-center">
                <img
                    src={`http://127.0.0.1:8000/storage/${image}`}
                    className="h-25 w-25"
                    alt=""
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2  font-semibold text-lg">
                        <div className="">{name}</div>
                    </div>
                    <div className="flex flex-row gap-2 text-md">
                        <div className="">${price} </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-center gap-4">
                <Link
                    to={"/admin/products/" + id}
                    className="px-4 py-2 bg-yellow-400 font-semibold rounded-sm"
                >
                    Edit
                </Link>
                <Link
                    to={"/admin/products/" + id}
                    className="px-4 py-2 bg-red-500 text-center font-semibold rounded-sm"
                >
                    Delete
                </Link>
            </div>
        </div>
    );
};

export default ProductListComp;
