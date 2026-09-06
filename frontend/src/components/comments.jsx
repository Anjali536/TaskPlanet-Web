import { useState } from "react";

import { addComment } from "../services/api";

import SendIcon from "@mui/icons-material/Send";


function Comments({
    post,
    onCommentAdded
}) {

    const [text, setText] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    async function handleSubmit(event) {

        event.preventDefault();

        if (!text.trim()) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data =
                await addComment(
                    post._id,
                    text
                );

            if (data.success) {

                onCommentAdded(data);

                setText("");
            }

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="comments-section">

            {/* PREVIOUS COMMENTS */}

            <div className="comments-list">

                {post.comments &&
                    post.comments.length > 0 ? (

                    post.comments.map(
                        (comment, index) => {

                            const username =
                                comment.author?.username ||
                                comment.user?.username ||
                                "User";

                            return (
                                <div
                                    className="comment-item"
                                    key={
                                        comment._id ||
                                        index
                                    }
                                >

                                    <div className="comment-avatar">
                                        {username
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="comment-body">

                                        <div className="comment-user">

                                            <strong>
                                                {username}
                                            </strong>

                                            
                                        </div>


                                        <p>
                                            {comment.text}
                                        </p>

                                    </div>

                                </div>
                            );
                        }
                    )

                ) : (

                    <div className="no-comments">
                        No comments yet.
                    </div>

                )}

            </div>


            {/* ERROR */}

            {error && (
                <div className="comment-error">
                    {error}
                </div>
            )}


            {/* WRITE COMMENT */}

            <form
                className="comment-form"
                onSubmit={handleSubmit}
            >

                <textarea
                    value={text}
                    onChange={(event) =>
                        setText(
                            event.target.value
                        )
                    }
                    placeholder="Write a comment..."
                    rows="1"
                />


                <button
                    type="submit"
                    disabled={
                        loading ||
                        !text.trim()
                    }
                >

                    <span>
                        {loading
                            ? "Sending..."
                            : "Send"}
                    </span>

                </button>

            </form>

        </div>
    );
}


export default Comments;