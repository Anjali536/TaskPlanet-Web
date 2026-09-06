const { body } = require("express-validator");

const commentValidator = [
    body("text")
        .trim()
        .notEmpty()
        .withMessage("Comment cannot be empty")
        .isLength({ max: 500 })
        .withMessage("Comment cannot exceed 500 characters")
];

const postValidator = [
    body("content")
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage("Post cannot exceed 2000 characters")
];

module.exports = {
    postValidator,
    commentValidator
};