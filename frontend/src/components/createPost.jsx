import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { useRef, useState } from "react";
import { createPost } from "../services/api";

function CreatePost({ onPostCreated }) {
    const [content, setContent] =
        useState("");

    const [image, setImage] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const fileInputRef = useRef(null);
    


    function handleImageChange(event) {
        const file =
            event.target.files?.[0];

        setError("");
        setSuccess("");

        if (!file) {
            return;
        }
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            event.target.value = "";
            setImage(null);
            setImagePreview("");
            return;
        }


        if (file.size > 10 * 1024 * 1024) {
            setError(
                "Image size must be less than 10 MB"
            );

            event.target.value = "";
            setImage(null);
            setImagePreview("");

            return;
        }

        setImage(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }


    function removeImage() {
        setImage(null);
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }


    async function handleSubmit() {
    if (!content.trim() && !image) {
        setError("Please write something or select an image.");
        return;
    }

    try {
        setLoading(true);
        setError("");
        setSuccess("");

        const data = await createPost(
            content,
            image
        );

        if (data.success) {
            onPostCreated(data.post);

            setContent("");
            setImage(null);
            setImagePreview("");

            setSuccess("Post created successfully!");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } else {
            setError(
                data.message ||
                "Unable to create post"
            );
        }

    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}


    return (
        <div className="create-post-card">

    <div className="create-post-header">
        <h2>Create Post</h2>
    </div>

    {error && (
    <div className="create-post-error">
        {error}
    </div>
    )}

    {success && (
        <div className="create-post-success">
            {success}
        </div>
    )}

    <textarea
        className="create-post-textarea"
        value={content}
        onChange={(event) =>
            setContent(event.target.value)
        }
        placeholder="What's on your mind?"
    />

    {image && (
        <div className="selected-image">
            <span>{image.name}</span>

            <button
                type="button"
                onClick={() => setImage(null)}
            >
                ×
            </button>
        </div>
    )}
    {imagePreview && (
    <div className="create-post-preview">
        <img
            src={imagePreview}
            alt="Selected preview"
        />

        <button
            type="button"
            className="remove-preview-button"
            onClick={() => {
                setImage(null);
                setImagePreview("");
            }}
        >
            ×
        </button>
    </div>
)}

    <div className="create-post-bottom">

        <div className="create-post-tools">

            <label
                htmlFor="post-image"
                className="create-post-icon"
                title="Add image"
            >
                <ImageOutlinedIcon />
            </label>

            <input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

        </div>

        <button
            type="button"
            className="create-post-submit"
            onClick={handleSubmit}
            disabled={loading || (!content.trim() && !image)}
        >
            {loading ? "Posting..." : "Post"}
        </button>

    </div>

</div>
    );
}

export default CreatePost;