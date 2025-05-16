const addBooksButton = document.querySelector(".addBooks");
const closeModalButton = document.querySelector(".close");
const modal = document.querySelector(".modal");
const statusSelect = document.querySelector(".status");
const submitButton = document.querySelector(".submitButton");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const totalPagesInput = document.querySelector("#totalPages");
const readPagesInput = document.querySelector("#readPages");
const statusInput = document.querySelector("#status");

let books = [];



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

function Book(title, author, totalPages, readPages, status)  {
    if(!new.target) {
        throw new TypeError("Calling constructor without new is invalid!");
    }
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readPages = readPages;
    this.status = status;
    this.id = crypto.randomUUID();
}

function EnableDisableInput() {
    statusSelect.addEventListener("change", (e) => {
        if (e.target.value == "reading") {
            readPagesInput.disabled = false;
        } else {
            readPagesInput.disabled = true;
        }
    });
}

function addBookToLibrary() {
    submitButton.addEventListener("click", (e) =>{
        e.preventDefault();
        books.push(new Book(titleInput.value, authorInput.value, totalPagesInput.value, readPagesInput.value, statusInput.value));
        modal.close();
    });
}

ShowHideModal();
EnableDisableInput();
addBookToLibrary();