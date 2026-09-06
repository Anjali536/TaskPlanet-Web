import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
        const data = await login({
            email,
            password
        });

        console.log("LOGIN RESPONSE:", data);

        if (data.success) {
            navigate("/feed", {
                replace: true
            });
        } else {
            setError(
                data.message || "Login failed"
            );
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
}

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Login to your social account
                    </p>

                </div>


                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-field">

                        <label htmlFor="login-email">
                            Email
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />

                    </div>


                    <div className="form-field">

                        <label htmlFor="login-password">
                            Password
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                    </div>


                    <button
                        className="auth-submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/signup">
                        Sign up
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;