import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import { useAuth } from "./context/authContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="route-loading">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login page */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Signup page */}
                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* Optional direct login URL */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected feed */}
                <Route
                    path="/feed"
                    element={
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    }
                />

                {/* Unknown routes */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;