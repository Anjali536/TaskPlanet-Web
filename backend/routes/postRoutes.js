const express = require("express");

const {
    createPost,
    getPosts,
    toggleLike,
    addComment
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
    postValidator,
    commentValidator
} = require("../validators/postValidator");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get(
    "/",
    protect,
    getPosts
);

router.post(
    "/",
    protect,
    upload.single("image"),
    postValidator,
    validate,
    createPost
);

router.post(
    "/:postId/like",
    protect,
    toggleLike
);

router.post(
    "/:postId/comments",
    protect,
    commentValidator,
    validate,
    addComment
);

module.exports = router;