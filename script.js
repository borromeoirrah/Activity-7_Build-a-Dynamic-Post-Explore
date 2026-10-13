const loadPostsButton = document.getElementById("loadPosts");
const retryButton = document.getElementById("retryButton");
const status = document.getElementById("status");
const postList = document.getElementById("postList");

const API_URL = "https://jsonplaceholder.typicode.com/posts";
async function loadPosts() {

    loadPostsButton.disabled = true;
    retryButton.hidden = true;

    status.textContent = "Loading...";
    postList.textContent = "";

    try {
        //data sa API
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const posts = await response.json();
        const firstFivePosts = posts.slice(0, 5);
        renderPosts(firstFivePosts);
        status.textContent = "Posts loaded successfully.";

    } catch (error) {
        status.textContent = "Failed to load posts...please try again! :))";
        retryButton.hidden = false;
        console.error(error);

    } finally {
        loadPostsButton.disabled = false;

    }
}


function renderPosts(posts) {
    postList.textContent = "";
    if (posts.length === 0) {
        status.textContent = "No posts found.";
        return;
    }

    for (const post of posts) {
        const card = document.createElement("article");
        card.className = "post-card";
        const title = document.createElement("h2");
        title.textContent = post.title;
        const body = document.createElement("p");
        body.textContent = post.body;

        card.appendChild(title);
        card.appendChild(body);
        postList.appendChild(card);
    }
}

loadPostsButton.addEventListener("click", loadPosts);
retryButton.addEventListener("click", loadPosts);