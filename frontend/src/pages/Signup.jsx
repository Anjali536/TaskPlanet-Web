import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (
            !username.trim() ||
            !email.trim() ||
            !password
        ) {
            setError(
                "Please fill in all fields"
            );

            return;
        }

        if (username.trim().length < 3) {
            setError(
                "Username must be at least 3 characters"
            );

            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            );

            return;
        }


        try {
            setLoading(true);

            const data = await signup({
                username: username.trim(),
                email: email.trim(),
                password
            });


            if (data.success) {
                navigate("/feed", {
                    replace: true
                });
            } else {
                setError(
                    data.message ||
                    "Account creation failed"
                );
            }

        } catch (error) {
            setError(
                error.message ||
                "Unable to create account"
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <h1>
                        Create account
                    </h1>

                    <p>
                        Join the social feed
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

                        <label htmlFor="signup-username">
                            Username
                        </label>

                        <input
                            id="signup-username"
                            type="text"
                            value={username}
                            onChange={(event) => {
                                setUsername(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="Choose a username"
                            autoComplete="username"
                        />

                    </div>


                    <div className="form-field">

                        <label htmlFor="signup-email">
                            Email
                        </label>

                        <input
                            id="signup-email"
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

                        <label htmlFor="signup-password">
                            Password
                        </label>

                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="Create a password"
                            autoComplete="new-password"
                        />

                    </div>


                    <button
                        className="auth-submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>


                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Signup;