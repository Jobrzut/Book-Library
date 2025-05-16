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
        bookCard.setAttribute("id", book.id);

        const title = document.createElement("h2");
        title.textContent = `"` + book.title + `"`;
        bookCard.appendChild(title);

        const author = document.createElement("p");
        author.textContent = "By " + book.author;
        bookCard.appendChild(author);

        const totalPages = document.createElement("p");
        totalPages.textContent = book.totalPages;
        bookCard.appendChild(totalPages);

        if (book.status == "reading") {
            const readPages = document.createElement("p");
            readPages.textContent = book.readPages;
            bookCard.appendChild(readPages);

            const progressLabel = document.createElement("label");
            progressLabel.setAttribute("for", "readprogress")
            const progressBar = document.createElement("progress");
            progressBar.id = "readprogress";
            progressBar.value = book.readPages;
            progressBar.max = book.totalPages;
            bookCard.appendChild(readPages);
            bookCard.appendChild(progressLabel);
            bookCard.appendChild(progressBar);
        } else {
            const status = document.createElement("p");
            status.textContent = book.status;
            bookCard.appendChild(status);
        }
        
        booksGrid.appendChild(bookCard);
    });
}

ShowHideModal();
EnableDisableInput();
addBookToLibrary();