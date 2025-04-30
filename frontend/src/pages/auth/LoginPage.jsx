import React, { useState } from "react";
import api from "../../instance/api";

const LoginPage = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [error, setError] = useState();

    const submitHandle = async (e) => {
        setError("");
        setErrorEmail("");
        setErrorPassword("");
        e.preventDefault();
        try {
            const res = await api.post("/api/login", { email, password });
            console
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                window.location.href = "/";
            }
        } catch (e) {
            if (e.response.data) {
                if (e.response.status === 422) {
                    if (e.response.data.errors.email) {
                        setErrorEmail(e.response.data.errors.email[0]);
                    }
                    if (e.response.data.errors.password) {
                        setErrorPassword(e.response.data.errors.password[0]);
                    }
                }
                if (e.response.status === 402) {
                    setError(e.response.data.message);
                }
            }
        }
    };
    return (
        <div className="flex justify-center items-center h-140">
            <form
                className="flex flex-col px-4 py-2 border rounded-md gap-3 w-90 bg-secondary text-white"
                onSubmit={submitHandle}
            >
                <h1 className="text-2xl w-full flex justofy-center font-semibold py-2">
                    Login
                </h1>
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm bg-primary text-white"
                        placeholder="Your Email"
                    />
                </div>
                {errorEmail && (
                    <p className="text-red-400 text-sm">{errorEmail}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm bg-primary text-white"
                        placeholder="Your Password"
                    />
                </div>
                {errorPassword && (
                    <p className="text-red-400 text-sm">{errorPassword}</p>
                )}
                {error && <p className=" text-red-400 text-sm">{error}</p>}
                <button
                    className="w-full px-2 py-3 rounded-sm mb-3 bg-primary text-white cursor-pointer"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
