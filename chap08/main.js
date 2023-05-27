const commentContainer = document.querySelector(".comment_container");
const textArea = document.querySelector("textarea");
const author = document.querySelector("#author");
const inputContainer = document.querySelector("form.input_container");

function createViewContainer(comment) {
    const viewContainer = document.createElement("div");
    viewContainer.classList.add("view_container");

    const p = document.createElement("p");
    p.innerText = comment;

    const buttonContainer = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
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
    commentElement,
    viewContainer,
    editContainer
) {
    const editButton = viewContainer.querySelector("button.edit");
    const deleteButton = viewContainer.querySelector("button.delete");
    const applyButton = editContainer.querySelector("button.apply");
    const cancelButton = editContainer.querySelector("button.cancel");
    const viewCommentElement = viewContainer.querySelector("p");
    const editTextArea = editContainer.querySelector("textarea");

    deleteButton.addEventListener("click", () => {
        commentContainer.removeChild(commentElement);
    });
    editButton.addEventListener("click", () => {
        commentElement.classList.add("editing");
        editTextArea.value = viewCommentElement.innerText;
    });
    cancelButton.addEventListener("click", () => {
        commentElement.classList.remove("editing");
    });
    applyButton.addEventListener("click", () => {
        commentElement.classList.remove("editing");
        viewCommentElement.innerText = editTextArea.value;
    });
}

function createComment(author, comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const h2 = document.createElement("h2");
    h2.innerText = author;

    const viewContainer = createViewContainer(comment);
    const editContainer = createEditContainer();
    addEventListenerViewAndEdit(commentElement, viewContainer, editContainer);

    commentElement.appendChild(h2);
    commentElement.appendChild(viewContainer);
    commentElement.appendChild(editContainer);

    return commentElement;
}

inputContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const commentText = textArea.value;
    const authorText = author.value;

    const comment = createComment(authorText, commentText);
    commentContainer.appendChild(comment);

    textArea.value = "";
    author.value = "";
});
