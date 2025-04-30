import React, { useState } from "react";
import api from "../../instance/api";

const RegisterPage = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorName, setErrorName] = useState();
    const [errorPasswordConfirmation, setErrorPasswordConfirmation] =
        useState();

    const submitHandle = async (e) => {
        setErrorName("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorPasswordConfirmation("");
        e.preventDefault();
        try {
            const res = await api.post("/api/login", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            console;
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                window.location.href = "/";
            }
        } catch (e) {
            if (e.response.data) {
                if (e.response.status === 422) {
                    if (e.response.data.errors.name) {
                        setErrorName(e.response.data.errors.name[0]);
                    }
                    if (e.response.data.errors.email) {
                        setErrorEmail(e.response.data.errors.email[0]);
                    }
                    if (e.response.data.errors.password) {
                        setErrorPassword(e.response.data.errors.password[0]);
                    }
                    if (e.response.data.errors.password_confirmation) {
                        setErrorPasswordConfirmation(
                            e.response.data.errors.password[0]
                        );
                    }
                }
            }
        }
    };
    return (
        <div className="flex justify-center items-center">
            <form className="flex flex-col px-4 py-2 border rounded-md gap-3 w-90 bg-secondary text-white" onSubmit={submitHandle}>
                <h1 className="text-2xl w-full flex justofy-center font-semibold py-2">
                    Register
                </h1>
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="email">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm bg-primary text-white"
                        placeholder="Your Name"
                    />
                </div>
                {errorName && (
                    <p className="text-red-400 text-sm">{errorName}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm bg-primary text-white"
                        placeholder="Your Password"
                    />
                </div>
                {errorPassword && (
                    <p className="text-red-400 text-sm">{errorPassword}</p>
                )}
                <div className="mb-2 flex flex-col gap-2">
                    <label htmlFor="email">Confirm Password</label>
                    <input
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        type="password"
                        className="w-full px-2 py-3 focus:outline-0 rounded-sm bg-primary text-white"
                        placeholder="Your Password"
                    />
                </div>
                {errorPasswordConfirmation && (
                    <p className="text-red-400 text-sm">
                        {errorPasswordConfirmation}
                    </p>
                )}
                <button
                    className="w-full px-2 py-3 rounded-sm mb-3 bg-primary text-white"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
