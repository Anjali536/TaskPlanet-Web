const express = require("express");

const {
    signup,
    login,
    getMe
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
    signupValidator,
    loginValidator
} = require("../validators/authValidator");

const router = express.Router();

router.post(
    "/signup",
    signupValidator,
    validate,
    signup
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get(
    "/me",
    protect,
    getMe
);

module.exports = router;