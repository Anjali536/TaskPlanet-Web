const Post = require("../models/Post");
const uploadToCloudinary = require("../utils/uploadToCloudinary");


// CREATE POST
const createPost = async (req, res, next) => {
    try {
        const { content } = req.body;

        const hasContent = content?.trim();
        const hasImage = !!req.file;

        if (!hasContent && !hasImage) {
            return res.status(400).json({
                success: false,
                message: "Post must contain text or an image"
            });
        }

        let imageUrl = "";

        if (req.file) {
            const result = await uploadToCloudinary(
                req.file.buffer
            );

            imageUrl = result.secure_url;
        }

        const post = await Post.create({
            author: req.user._id,
            content: hasContent || "",
            image: imageUrl
        });

        const populatedPost = await post.populate(
            "author",
            "username"
        );

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: populatedPost
        });

    } catch (error) {
        next(error);
    }
};


// GET FEED
const getPosts = async (req, res) => {
    try {
        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            parseInt(req.query.limit) || 10,
            50
        );

        const skip = (page - 1) * limit;

        const [posts, totalPosts] = await Promise.all([
            Post.find()
                .populate("author", "username")
                .populate("comments.user", "username")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Post.countDocuments()
        ]);

        const totalPages = Math.ceil(
            totalPosts / limit
        );

        res.json({
            success: true,
            posts: posts.map(post => ({
                ...post.toObject(),

                likesCount: post.likes.length,

                commentsCount: post.comments.length,

                // Useful for React
                likedByCurrentUser: req.user
                    ? post.likes.some(
                        id => id.toString() === req.user._id.toString()
                    )
                    : false
            })),

            pagination: {
                page,
                limit,
                totalPosts,
                totalPages
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch posts"
        });
    }
};


// LIKE / UNLIKE
const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.some(
            id => id.toString() === userId.toString()
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                id => id.toString() !== userId.toString()
            );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.json({
            success: true,
            liked: !alreadyLiked,
            likesCount: post.likes.length
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update like"
        });
    }
};


// ADD COMMENT
const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        if (!text?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        post.comments.push({
            user: req.user._id,
            text: text.trim()
        });

        await post.save();

        const addedComment =
            post.comments[post.comments.length - 1];

        await post.populate(
            "comments.user",
            "username"
        );

        const populatedComment =
            post.comments.find(
                comment =>
                    comment._id.toString() ===
                    addedComment._id.toString()
            );

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: populatedComment,
            commentsCount: post.comments.length
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add comment"
        });
    }
};


module.exports = {
    createPost,
    getPosts,
    toggleLike,
    addComment
};