import { api, path } from "./api.js";
import { createPost, createComment } from "./element.js";

const postContainer = document.querySelector(".post_container");

async function updatePage() {
    const posts = await api.get(path.POSTS.url);

    while (postContainer.firstChild) {
        postContainer.removeChild(postContainer.firstChild);
    }
    posts.forEach(post => {
        const postElement = createPost(post.author, post.content);

        const postEditContainer = postElement.querySelector(".edit_container");
        const postViewContainer = postElement.querySelector(".view_container");
        addUpdateEventListener(postEditContainer, post.url, {author: post.author});
        addDeleteEventListener(postViewContainer, post.url);

        post.comment_set.forEach(async (commentUrl) => {
            const commentData = await api.get(commentUrl);
            const commentElement = createComment(
                commentData.author,
                commentData.content
            );
            const commentEditContainer = commentElement.querySelector(".edit_container");
            const commentViewContainer = commentElement.querySelector(".view_container");
            addUpdateEventListener(commentEditContainer, commentUrl, {
                author: post.author,
                post: post.url,
            });
            addDeleteEventListener(commentViewContainer, commentUrl);
            postElement.appendComment(commentElement);
        })

        const commentFormElement =
            postElement.querySelector("form.comment_input_container");
        addCreateEventListener(
            commentFormElement,
            path.COMMENTS.url,
            { post: post.url }
        );

        postContainer.appendChild(postElement);
    });
}

function addCreateEventListener(
    formElement,
    url,
    additionalData = {}
) {
    formElement.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const textArea =
            formElement.querySelector("textarea");
        const author =
            formElement.querySelector("input.author");

        const postText = textArea.value;
        const authorText = author.value;

        textArea.value = "";
        author.value = "";

        await api.post(url, {
            author: authorText,
            content: postText,
            ...additionalData,
        });
        await updatePage();
    });
}

function addUpdateEventListener(
    editContainer,
    url,
    additionalData = {}
) {
    const editButton = editContainer.querySelector("button.apply");
    editButton.addEventListener("click", async () => {
        const textArea =
        editContainer.querySelector("textarea");
        
        const postText = textArea.value;
        
        textArea.value = "";
        
        await api.put(url, {
            content: postText,
            ...additionalData,
        });
    })
}

function addDeleteEventListener(
    viewContainer,
    url
) {
    const editButton = viewContainer.querySelector("button.delete");
    editButton.addEventListener("click", async () => {
        await api.delete(url);
    })
}

async function init() {
    await updatePage();
    const postInputContainer =
        document.querySelector("form.post_input_container");
    addCreateEventListener(postInputContainer, path.POSTS.url);
}

init();
