import { useEffect, useState } from "react";

import { getPosts } from "../services/api";
import { useAuth } from "../context/authContext";

import Navbar from "../components/Navbar";
import PostCard from "../components/postCard";
import CreatePost from "../components/createPost";
import FilterTabs from "../components/filterTabs";

function Feed() {
    const { user } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        try {
            setLoading(true);
            setError("");

            const data = await getPosts();

            if (data.success) {
                setPosts(data.posts || []);
            } else {
                setError(
                    data.message ||
                    "Unable to load posts"
                );
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function handlePostCreated(newPost) {
        setPosts((previous) => [
            newPost,
            ...previous
        ]);
    }

    function handlePostUpdated(updatedPost) {
        setPosts((previous) =>
            previous.map((post) =>
                post._id === updatedPost._id
                    ? updatedPost
                    : post
            )
        );
        
    }
        function handleFilter(filter) {
        setActiveFilter(filter);
    }

    const visiblePosts = [...posts];

    if (activeFilter === "liked") {
        visiblePosts.sort(
            (a, b) =>
                (b.likesCount || 0) -
                (a.likesCount || 0)
        );
    }

    if (activeFilter === "commented") {
        visiblePosts.sort(
            (a, b) =>
                (b.commentsCount || 0) -
                (a.commentsCount || 0)
        );
    }


    return (
        <div className="feed-page">

            <Navbar />

            <main className="feed-container">

                

                <CreatePost
                    onPostCreated={
                        handlePostCreated
                    }
                />
                <FilterTabs
                    activeFilter={activeFilter}
                    onFilter={handleFilter}
                />

                {loading && (
                    <div className="feed-state">
                        Loading posts...
                    </div>
                )}

                {error && !loading && (
                    <div className="feed-error">
                        {error}
                    </div>
                )}

                {!loading &&
                !error &&
                visiblePosts.length > 0 && (
                    <div className="posts-list">

                        {visiblePosts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onPostUpdated={handlePostUpdated}
                            />
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}

export default Feed;