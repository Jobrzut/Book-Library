document.addEventListener("DOMContentLoaded", () => {
    const addBooksButton = document.querySelector(".addBooks")
    const modal = document.querySelector(".modal")

    addBooksButton.addEventListener("click", () => modal.showModal())
});