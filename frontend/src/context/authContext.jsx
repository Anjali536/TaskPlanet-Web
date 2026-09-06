import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getMe,
    login as loginApi,
    signup as signupApi,
    logout as logoutApi
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const token =
                localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getMe();

                if (data.success) {
                    setUser(data.user);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                }
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);


    // =========================
    // LOGIN
    // =========================

    async function login(credentials) {
    const data = await loginApi(credentials);

    if (data.success && data.token) {
        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);
    }

    return data;
}

    // =========================
    // SIGNUP
    // =========================

    async function signup(userData) {
        const data =
            await signupApi(userData);

        if (
            data.success &&
            data.token
        ) {
            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setUser(data.user);
        }

        return data;
    }


    // =========================
    // LOGOUT
    // =========================

    function logout() {
        logoutApi();

        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}