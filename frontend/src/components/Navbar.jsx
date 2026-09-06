import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

import DarkModeOutlinedIcon from
    "@mui/icons-material/DarkModeOutlined";

import LightModeOutlinedIcon from
    "@mui/icons-material/LightModeOutlined";

import LogoutOutlinedIcon from
    "@mui/icons-material/LogoutOutlined";

import StarRoundedIcon from
    "@mui/icons-material/StarRounded";

import AccountBalanceWalletOutlinedIcon from
    "@mui/icons-material/AccountBalanceWalletOutlined";


function Navbar() {
    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
    }

    const firstLetter =
        user?.username
            ?.charAt(0)
            .toUpperCase() || "U";

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    return (
        <header className="navbar">

            <div className="navbar-inner">

                <div className="navbar-brand">
                    <h1>Social</h1>
                </div>


                <div className="navbar-actions">

                    <div className="navbar-stat">
                        <StarRoundedIcon />

                        <span>
                            50
                        </span>
                    </div>


                    <div className="navbar-stat wallet-stat">
                        <AccountBalanceWalletOutlinedIcon />

                        <span>
                            ₹0.00
                        </span>
                    </div>


                    <button
                        type="button"
                        className="navbar-icon-button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <LightModeOutlinedIcon />
                        ) : (
                            <DarkModeOutlinedIcon />
                        )}
                    </button>


                    <div className="navbar-user">

                        <div className="navbar-avatar">
                            {firstLetter}
                        </div>

                        

                    </div>


                    <button
                        type="button"
                        className="navbar-icon-button navbar-logout"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <LogoutOutlinedIcon />
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;