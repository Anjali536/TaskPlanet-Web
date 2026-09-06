import { useState } from "react";

import {
    toggleLike
} from "../services/api";

import Comments from "./comments";

import FavoriteBorderOutlinedIcon from
    "@mui/icons-material/FavoriteBorderOutlined";

import ShareOutlinedIcon from
    "@mui/icons-material/ShareOutlined";

import FavoriteIcon from
    "@mui/icons-material/Favorite";

import ChatBubbleOutlineOutlinedIcon from
    "@mui/icons-material/ChatBubbleOutlineOutlined";

import MoreHorizIcon from
    "@mui/icons-material/MoreHoriz";


function PostCard({
    post,
    onPostUpdated
}) {
    const username =
        post.author?.username || "User";

    const [liked, setLiked] = useState(
        Boolean(post.likedByCurrentUser)
    );

    const [likesCount, setLikesCount] =
        useState(post.likesCount || 0);

    const [comments, setComments] =
        useState(post.comments || []);

    const [commentsCount, setCommentsCount] =
        useState(post.commentsCount || 0);

    const [showComments, setShowComments] = useState(false);
    const [commented, setCommented] = useState(
        Boolean(post.commentedByCurrentUser)
    );

    const [likeLoading, setLikeLoading] =
        useState(false);


    const createdAt = post.createdAt
        ? new Date(
              post.createdAt
          ).toLocaleString()
        : "";


    async function handleLike() {
        if (likeLoading) {
            return;
        }

        try {
            setLikeLoading(true);

            const data =
                await toggleLike(post._id);

            if (data.success) {
                setLiked(data.liked);

                setLikesCount(
                    data.likesCount
                );
            }

        } catch (error) {
            console.error(
                "Like error:",
                error
            );
        } finally {
            setLikeLoading(false);
        }
    }


    function handleCommentAdded(data) {
    if (data.comment) {
        setComments((previous) => [
            ...previous,
            data.comment
        ]);

        setCommented(true);
    }

    if (typeof data.commentsCount === "number") {
        setCommentsCount(data.commentsCount);
    } else {
        setCommentsCount(
            (previous) => previous + 1
        );
    }
}
    return (
        <article className="post-card">

            {/* POST HEADER */}

            <div className="post-header">

                <div className="post-author">

                <div className="post-avatar">
                    {username
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="post-author-info">

                    <h3>
                        {post.author?.username || "User"}
                    </h3>

                    <p className="post-username">
                        @{post.author?.username || "user"}
                    </p>

                    <p className="post-date">
                        {createdAt}
                    </p>

                </div>

           </div>
           </div>


            {/* CONTENT */}

            {post.content && (
                <p className="post-content">
                    {post.content}
                </p>
            )}


            {/* IMAGE */}

            {post.image && (
                <div className="post-image-wrapper">

                    <img
                        src={post.image}
                        alt="Post"
                        className="post-image"
                    />

                </div>
            )}


            {/* ACTIONS */}

            <div className="post-actions">

                <button
                    type="button"
                    className={
                        liked
                            ? "post-action-button post-liked"
                            : "post-action-button"
                    }
                    onClick={handleLike}
                    disabled={likeLoading}
                >
                    <span className="post-action-icon">
                        {liked ? (
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                    </span>

                    <span className="post-action-count">
                        {likesCount}
                    </span>
                </button>


                <button
                    type="button"
                    className={
                        commented
                            ? "post-action-button post-commented"
                            : "post-action-button"
                    }
                    onClick={() =>
                        setShowComments(
                            (previous) => !previous
                        )
                    }
                >
                    <span className="post-action-icon">
                        <ChatBubbleOutlineOutlinedIcon />
                    </span>

                    <span>{commentsCount}</span>
                </button>


                <button
                    type="button"
                    className="post-action-button post-share-button"
                    aria-label="Share post"
                >
                    <span className="post-action-icon">
                        <ShareOutlinedIcon />
                    </span>

                    <span className="post-action-count">
                        0
                    </span>
                </button>

            </div>


            {/* COMMENTS */}

            {showComments && (
                <Comments
                    post={{
                        ...post,
                        comments
                    }}
                    onCommentAdded={
                        handleCommentAdded
                    }
                />
            )}

        </article>
    );
}

export default PostCard;