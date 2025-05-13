const addBooksButton = document.querySelector(".addBooks");
const closeModalButton = document.querySelector(".close");
const modal = document.querySelector(".modal");


function ShowHideModal() {
    addBooksButton.addEventListener("click", () => modal.showModal());
    closeModalButton.addEventListener("click", () => modal.close());
    modal.addEventListener('click', function(e) {
        if (e.target === e.currentTarget) {
        e.stopPropagation();
        modal.close();
        }
    });
}

ShowHideModal();