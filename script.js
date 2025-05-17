const addBooksButton = document.querySelector(".addBooks");
const closeModalButton = document.querySelector(".close");
const modal = document.querySelector(".modal");
const statusSelect = document.querySelector(".status");
const submitButton = document.querySelector(".submitButton");
const form = document.querySelector("dialog form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const totalPagesInput = document.querySelector("#totalPages");
const readPagesInput = document.querySelector("#readPages");
const statusInput = document.querySelector("#status");

const booksGrid = document.querySelector(".books__grid");
const noBooks = document.querySelector(".no__books")

const readPagesCard = document.querySelector(".book__card input")

let books = [];

function noBooksToggle() {
    if (books.length == 0) {
        noBooks.style.display = "block";
    } else {
        noBooks.style.display = "none";
    }
}


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
        if (e.target.value == "Reading") {
            readPagesInput.disabled = false;
        } else {
            readPagesInput.disabled = true;
        }
    });
}

function addBookToLibrary() {
    submitButton.addEventListener("click", (e) =>{
        e.preventDefault();
        if (titleInput.value !== "" && authorInput.value !== "") {
            books.push(new Book(titleInput.value, authorInput.value, totalPagesInput.value, readPagesInput.value, statusInput.value));
        }
        modal.close();
        form.reset();
        readPagesInput.disabled = true;
        displayBooks();
    });
}

function displayBooks() {
    if (books.length !== 0) {
        while (booksGrid.firstChild) {
            booksGrid.firstChild.remove();
        }
    }

    noBooksToggle();

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book__card";

        const bookCardText = document.createElement("div");
        bookCardText.className = "book__card_text";

        const title = document.createElement("h2");
        title.textContent = `"` + book.title + `"`;
        bookCard.appendChild(title);

        const authorName = document.createElement("span");
        authorName.className = "author__name";
        authorName.textContent = book.author;
        const author = document.createElement("p");
        author.textContent = "By ";
        author.appendChild(authorName);
        bookCardText.appendChild(author);

        if (book.totalPages !== "") {
            const totalPages = document.createElement("p");
            totalPages.textContent = "Total pages: " + book.totalPages;
            bookCardText.appendChild(totalPages);
        }

        if (book.status == "Reading") {
            const readPages = document.createElement("p");
            readPages.textContent = "Read pages: " + book.readPages;
            bookCardText.appendChild(readPages);

            const progressBar = document.createElement("progress");
            progressBar.id = "readprogress";
            progressBar.value = book.readPages;
            progressBar.max = book.totalPages;
            bookCardText.appendChild(progressBar);
        } else {
            const status = document.createElement("p");
            status.textContent = "Status: " + book.status;
            bookCardText.appendChild(status);
        }
        
        bookCard.appendChild(bookCardText)

        const buttonsDiv = document.createElement("div");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove__button";
        removeButton.setAttribute("id", book.id);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit__button";
        
        buttonsDiv.append(removeButton, editButton);
        bookCard.appendChild(buttonsDiv);

        booksGrid.appendChild(bookCard);
    });
}

ShowHideModal();
EnableDisableInput();
addBookToLibrary();