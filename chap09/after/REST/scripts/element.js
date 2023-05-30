function createViewContainer(post) {
    const viewContainer = document.createElement("div");
    viewContainer.classList.add("view_container");

    const p = document.createElement("p");
    p.innerText = post;

    const buttonContainer = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    buttonContainer.classList.add("button_container");
    editButton.classList.add("edit");
    deleteButton.classList.add("delete");
    editButton.innerText = "수정";
    deleteButton.innerText = "삭제";

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    viewContainer.appendChild(buttonContainer);
    viewContainer.appendChild(p);

    return viewContainer;
}

function createEditContainer() {
    const editContainer = document.createElement("div");
    editContainer.classList.add("edit_container");

    const textArea = document.createElement("textarea");

    const buttonContainer = document.createElement("div");
    const applyButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    buttonContainer.classList.add("button_container");
    applyButton.classList.add("apply");
    cancelButton.classList.add("cancel");
    applyButton.innerText = "확인";
    cancelButton.innerText = "취소";

    buttonContainer.appendChild(applyButton);
    buttonContainer.appendChild(cancelButton);

    editContainer.appendChild(buttonContainer);
    editContainer.appendChild(textArea);

    return editContainer;
}

function addEventListenerViewAndEdit(
    postElement,
    viewContainer,
    editContainer
) {
    const editButton = viewContainer.querySelector("button.edit");
    const deleteButton = viewContainer.querySelector("button.delete");
    const applyButton = editContainer.querySelector("button.apply");
    const cancelButton = editContainer.querySelector("button.cancel");
    const viewPostElement = viewContainer.querySelector("p");
    const editTextArea = editContainer.querySelector("textarea");

    deleteButton.addEventListener("click", () => {
        postElement.parentElement.removeChild(postElement);
    });
    editButton.addEventListener("click", () => {
        postElement.classList.add("editing");
        editTextArea.value = viewPostElement.innerText;
    });
    cancelButton.addEventListener("click", () => {
        postElement.classList.remove("editing");
    });
    applyButton.addEventListener("click", () => {
        postElement.classList.remove("editing");
        viewPostElement.innerText = editTextArea.value;
    });
}

function createCommentArea() {
    const commentArea = document.createElement("div");
    const commentContainer = document.createElement("div");
    const commentInputContainer = document.createElement("form");
    
    commentArea.classList.add("comment_area");
    commentContainer.classList.add("comment_container");
    commentInputContainer.classList.add("comment_input_container");

    commentInputContainer.innerHTML = `
        <div class="author_container">
            <input required class="author" placeholder="작성자" type="text" maxlength="20">
        </div>
        <div class="textarea_container">
            <textarea required></textarea>
            <button>입력</button>
        </div>
    `;

    commentArea.appendChild(commentContainer);
    commentArea.appendChild(commentInputContainer);

    return commentArea;
}

function createPost(author, post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const h2 = document.createElement("h2");
    h2.innerText = author;
    postElement.appendChild(h2);


    const viewContainer = createViewContainer(post);
    const editContainer = createEditContainer();
    addEventListenerViewAndEdit(postElement, viewContainer, editContainer);
    postElement.appendChild(viewContainer);
    postElement.appendChild(editContainer);

    
    const commentArea = createCommentArea();
    postElement.appendChild(commentArea);

    postElement.appendComment = (comment) => {
        const commentContainer = commentArea.querySelector(".comment_container");
        commentContainer.appendChild(comment);
    }

    return postElement;
}

function createComment(author, comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const h2 = document.createElement("h2");
    h2.innerText = author;
    commentElement.appendChild(h2);


    const viewContainer = createViewContainer(comment);
    const editContainer = createEditContainer();
    addEventListenerViewAndEdit(commentElement, viewContainer, editContainer);
    commentElement.appendChild(viewContainer);
    commentElement.appendChild(editContainer);

    return commentElement;
}

export {createPost, createComment};