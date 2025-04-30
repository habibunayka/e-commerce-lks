import React, { useEffect, useState } from "react";
import api from "../../instance/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [imageBefore, setImageBefore] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [variations, setVariations] = useState([""]);
    const [errorName, setErrorName] = useState("");
    const [errorCategory, setErrorCategory] = useState("");
    const [errorImage, setErrorImage] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorVariations, setErrorVariations] = useState("");
    const [errorIsFeatured, setErrorIsFeatured] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get("/api/categories");
                console.log(res.data.data);
                setCategories(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCategory();
        const fetchProduct = async () => {
            try {
                const res = await api.get("/api/products/" + id);
                const product = res.data.data;
                setName(product.name);
                setPrice(product.price);
                setDescription(product.description);
                setImageBefore(product.image_url);
                setSelectedCategory(product.category_id);
                setIsFeatured(product.isFeatured);

                let vars = [];
                product.product_variations.forEach((v, i) => {
                    vars[i] = v.name;
                });
                setVariations(vars);
            } catch (e) {
                console.log(e);
            }
        };
        fetchProduct();
    }, [id]);

    const variationsChange = (value, index) => {
        const newVariation = [...variations];
        newVariation[index] = value;
        setVariations(newVariation);
    };
    const variationsAdd = (e) => {
        e.preventDefault();
        const newVariation = [...variations, ""];
        console.log(variations);
        setVariations(newVariation);
    };
    const variationsDelete = (index) => {
        const newVariation = [...variations];
        if (newVariation.length === 1) {
            return;
        }
        newVariation.splice(index, 1);
        setVariations(newVariation);
    };

    const submitHandle = async (e) => {
        setErrorDescription("");
        setErrorName("");
        setErrorPrice("");
        setErrorImage("");
        setErrorCategory("");
        setErrorVariations("");
        setErrorIsFeatured("");
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category_id", selectedCategory);
            formData.append("image_url", image === null ? imageBefore : image);
            variations.forEach((v, i) => {
                formData.append(`product_variations[${i}]`, v);
                console.log(v);
            });
            formData.append("is_featured", isFeatured ? 1 : 0);
            const res = await api.post("/api/admin/products/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Http-Method-Override": "PUT"
                },
            });
            console;
            if (res.status === 200) {
                navigate("/admin/products");
            }
        } catch (e) {
            if (e.response.data) {
                if (e.response.status === 422) {
                    if (e.response.data.errors.name) {
                        setErrorName(e.response.data.errors.name[0]);
                    }
                    if (e.response.data.errors.description) {
                        setErrorDescription(
                            e.response.data.errors.description[0]
                        );
                    }
                    if (e.response.data.errors.price) {
                        setErrorPrice(e.response.data.errors.price[0]);
                    }
                    if (e.response.data.errors.category_id) {
                        setErrorCategory(e.response.data.errors.category_id[0]);
                    }
                    if (e.response.data.errors.image_url) {
                        setErrorImage(e.response.data.errors.image_url[0]);
                    }
                    // if (e.response.data.errors.product_variations[0]) {
                    //     setErrorVariations(
                    //         e.response.data.errors.product_variations
                    //     );
                    // }
                    if (e.response.data.errors.is_featured[0]) {
                        setErrorIsFeatured(
                            e.response.data.errors.is_featured[0]
                        );
                    }
                }
            }
        }
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-semibold">Create Products</h1>
            <form
                className="flex flex-col px-4 py-2  rounded-md gap-3 w-full"
                onSubmit={submitHandle}
            >
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="Description">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm border"
                        placeholder="Your Name"
                    />
                </div>
                {errorName && (
                    <p className="text-red-400 text-sm">{errorName}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm border"
                    />
                </div>
                {errorDescription && (
                    <p className="text-red-400 text-sm">{errorDescription}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm border"
                    />
                </div>
                {errorPrice && (
                    <p className="text-red-400 text-sm">{errorPrice}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm border"
                    />
                </div>
                {imageBefore && (
                    <img
                        src={`http://127.0.0.1:8000/storage/${imageBefore}`}
                        className="w-40"
                        alt=""
                    />
                )}
                <div
                    className="px-4 py-2 bg-red-500 rounded-sm w-20 text-white cursor-pointer"
                    onClick={() => setImageBefore(null)}
                >
                    Delete
                </div>
                {errorImage && (
                    <p className="text-red-400 text-sm">{errorImage}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="Category">Category</label>
                    <select
                        name=""
                        id=""
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm border"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => {
                            return (
                                <option value={c.id} key={c.id}>
                                    {c.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {errorCategory && (
                    <p className="text-red-400 text-sm">{errorCategory}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="Variations">Variations</label>
                    {variations.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-row justify-center items-center gap-3"
                            >
                                <input
                                    name=""
                                    id=""
                                    className="w-full h-12 px-2 py-2 focus:outline-0 rounded-sm border"
                                    value={variations[index]}
                                    onChange={(e) =>
                                        variationsChange(e.target.value, index)
                                    }
                                ></input>
                                <div
                                    className="px-2 py-2 rounded-sm mb-3 bg-red-500 border-2 mt-2 font-semibold text-white cursor-pointer"
                                    onClick={() => variationsDelete(index)}
                                >
                                    Delete
                                </div>
                            </div>
                        );
                    })}
                    <div
                        className="w-full px-2 py-3 rounded-sm mb-3 bg-white text-center border-primary border-2 mt-2 font-semibold text-primary cursor-pointer"
                        onClick={(e) => variationsAdd(e)}
                    >
                        Add Variations
                    </div>
                    {errorVariations && (
                        <p className="text-red-400 text-sm">
                            {errorVariations}
                        </p>
                    )}
                    <div className="mb-2 flex flex-row justify-center items-center gap-2">
                        <input
                            type="checkbox"
                            name=""
                            id="featured"
                            checked={isFeatured === true}
                            onClick={() => setIsFeatured(!isFeatured)}
                        />
                        <label htmlFor="featured">Is featured</label>
                    </div>

                    {errorIsFeatured && (
                        <p className="text-red-400 text-sm">
                            {errorIsFeatured}
                        </p>
                    )}
                </div>
                <button
                    className="w-full px-2 py-3 rounded-sm mb-3 bg-primary text-white cursor-pointer"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
