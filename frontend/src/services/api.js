const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data;
}


// =========================
// AUTH
// =========================

export async function signup(userData) {
    return request("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
}

export async function login(userData) {
    return request("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
}

export async function getMe() {
    return request("/auth/me");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}


// =========================
// POSTS
// =========================

export async function getPosts() {
    return request("/posts");
}

export async function toggleLike(postId) {
    return request(
        `/posts/${postId}/like`,
        {
            method: "POST"
        }
    );
}

export async function addComment(postId, text) {
    return request(
        `/posts/${postId}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text
            })
        }
    );
}

export async function createPost(content, image) {
    const formData = new FormData();

    if (content && content.trim()) {
        formData.append(
            "content",
            content.trim()
        );
    }

    if (image) {
        formData.append("image", image);
    }

    return request("/posts", {
        method: "POST",
        body: formData
    });
}