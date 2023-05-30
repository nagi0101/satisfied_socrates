import { api, path } from "./api.js";
import { createPost, createComment } from "./element.js";

const postContainer = document.querySelector(".post_container");

async function updatePage() {
    /** 서버로부터 post들을 가져와 posts 변수에 저장하시오  */
    // const posts = ...;

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
            /** posts 내 각 post의 comment_set property에는 post에 달린 
             * 각 comment의 정보를 가져올 수 있는 api endpoint들이 저장되어 있다.
             * 각 comment들의 정보를 가져와 commentData 변수에 저장하시오.
             *  */
            // const commentData = ...;
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

        /** 새로운 post 혹은 comment를 생성하는 요청을 보내시오.
         * 이 때 요청 endpoint는 url이며, 요청 body는 다음의 property를 포함합니다.
         * author: authorText
         * content: postText
         * ...additionalData
         */
        // await api.~();
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

        /** post 혹은 comment를 수정하는 요청을 보내시오.
         * 이 때 요청 endpoint는 url이며, 요청 body는 다음의 property를 포함합니다.
         * content: postText
         * ...additionalData
         */
        // await api.~();
    })
}

function addDeleteEventListener(
    viewContainer,
    url
) {
    const editButton = viewContainer.querySelector("button.delete");
    editButton.addEventListener("click", async () => {
        /** post 혹은 comment를 삭제하는 요청을 보내시오.
         * 이때 요청 endpoint는 url입니다.
         */
        // await api.~();
    })
}

async function init() {
    await updatePage();
    const postInputContainer =
        document.querySelector("form.post_input_container");
    addCreateEventListener(postInputContainer, path.POSTS.url);
}

init();
