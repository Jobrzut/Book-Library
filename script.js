const addBooksButton = document.querySelector(".addBooks");
const closeModalButton = document.querySelector(".modal .close");
const closeEditModalButton = document.querySelector(".modal__edit .close");
const modal = document.querySelector(".modal");
const statusSelect = document.querySelector(".status");
const statusSelectEdit = document.querySelector(".statusEdit");
const submitButton = document.querySelector(".submitButton");
const form = document.querySelector("dialog form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const totalPagesInput = document.querySelector("#totalPages");
const readPagesInput = document.querySelector("#readPages");
const readPagesEdit = document.querySelector(".readPagesEdit");
const statusInput = document.querySelector("#status");

const booksGrid = document.querySelector(".books__grid");
const noBooks = document.querySelector(".no__books");

const readPagesCard = document.querySelector(".book__card input");
let bookGridCards = document.querySelectorAll(".books__grid > div");

const modalEdit = document.querySelector(".modal__edit");
const submitModalEdit = document.querySelector(".submitEditButton")

let books = [];

function noBooksToggle() {
    if (books.length == 0) {
        noBooks.style.display = "block";
    } else {
        noBooks.style.display = "none";
    }
}

function checkMaxPages() {
    function displayPagesError() {
        if (+readPagesInput.value > +totalPagesInput.value && !modal.querySelector("div .errorInfo")) {
            submitButton.disabled = true;
            submitButton.style.cursor = "not-allowed";
            let errorInfo = document.createElement("p");
            errorInfo.className = "errorInfo";
            errorInfo.style.color = "#8c3a3a";
            errorInfo.style.marginTop = "5px";
            errorInfo.textContent = "Impossible number of read pages..."
            modal.querySelector("div").appendChild(errorInfo);
        } else if (+readPagesInput.value <= +totalPagesInput.value && modal.querySelector("div .errorInfo")) {
            submitButton.disabled = false;
            submitButton.style.cursor = "pointer";
            modal.querySelector("div .errorInfo").remove();
        }
    }
    
    readPagesInput.addEventListener("change", () => {
        displayPagesError();
    });
    totalPagesInput.addEventListener("change", () => {
        displayPagesError();
        checkIfField();
    })

    titleInput.addEventListener("change", () => {
        checkIfField();
    })

    authorInput.addEventListener("change", () => {
        checkIfField();
    })

    function displayPagesErrorEdit() {
        if (+readPagesEdit.value > +readPagesEdit.max && !modalEdit.querySelector("div .errorInfo")) {
                submitModalEdit.disabled = true;
                submitModalEdit.style.cursor = "not-allowed";
                let errorInfo = document.createElement("p");
                errorInfo.className = "errorInfo";
                errorInfo.style.color = "#8c3a3a";
                errorInfo.style.marginTop = "5px";
                errorInfo.textContent = "Impossible number of read pages..."
                modalEdit.querySelector("div").appendChild(errorInfo);
        } else if (+readPagesEdit.value <= +readPagesEdit.max && modalEdit.querySelector("div .errorInfo")) {
            submitModalEdit.disabled = false;
            submitModalEdit.style.cursor = "pointer";
            modalEdit.querySelector("div .errorInfo").remove();
        }
    }

    readPagesEdit.addEventListener("change", () => {
        displayPagesErrorEdit();
    });
}

function checkIfField() {
    if ((titleInput.value == "" || authorInput.value == "" || totalPagesInput.value == "") && !modal.querySelector(".requiredInfo") ) {
        submitButton.disabled = true
        submitButton.style.cursor = "not-allowed";
        let errorInfo = document.createElement("p");
        errorInfo.className = "requiredInfo";
        errorInfo.style.color = "#8c3a3a";
        errorInfo.style.marginTop = "5px";
        errorInfo.textContent = "Fill all the required fields!"
        modal.querySelector("div").appendChild(errorInfo);
    } else if (titleInput.value !== "" && authorInput.value !== "" && totalPagesInput.value !== "" && modal.querySelector(".requiredInfo")) {
        submitButton.disabled = false;
        submitButton.style.cursor = "pointer";
        modal.querySelector(".requiredInfo").remove();
    }
}


function ShowHideModal() {
    addBooksButton.addEventListener("click", () => { 
        modal.showModal()
        if (modal.querySelector(".requiredInfo")) {
            modal.querySelector(".requiredInfo").remove();
        }
    });
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

Book.prototype.changeStatus = function(status, readPages) {
    this.status = status;
    if (status == "Reading") {
        this.readPages = readPages;
        if (this.readPages == this.totalPages) {
            this.status = "Read";
        }
    }
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
        if (titleInput.value !== "" && authorInput.value !== "" && totalPagesInput.value !== "") {
            books.push(new Book(titleInput.value, authorInput.value, totalPagesInput.value, readPagesInput.value, statusInput.value));
            modal.close();
            form.reset();
            readPagesInput.disabled = true;
            displayBooks();
            bookGridCards = document.querySelectorAll(".books__grid > div");
            removeCard();
            editCard();
        } 
        checkIfField();
    });
}

function displayBooks() {
    noBooksToggle();

    books.forEach((book) => {
        let displayedIds = Array.from(bookGridCards).map(card => card.id)

        if (displayedIds ? !displayedIds.includes(book.id) : true) {
            const bookCard = document.createElement("div");
            bookCard.className = "book__card";
            bookCard.setAttribute("id", book.id);

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
                readPages.className = "read__pages";
                bookCardText.appendChild(readPages);

                const status = document.createElement("p");
                status.textContent = "Status: " + book.status;
                status.className = "status";
                bookCardText.appendChild(status);

                const progressBar = document.createElement("progress");
                progressBar.id = "readprogress";
                progressBar.value = book.readPages;
                progressBar.max = book.totalPages;
                bookCardText.appendChild(progressBar);
            } else {
                const status = document.createElement("p");
                status.textContent = "Status: " + book.status;
                status.className = "status";
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
        } 
    });
}

function removeCard() {
    let removeButtons = document.querySelectorAll(".remove__button");
    if (removeButtons) {
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                let deleteIndex = books.findIndex((book) => book.id === button.id)
                if (deleteIndex !== -1) {
                    books.splice(deleteIndex,1);
                    bookGridCards[deleteIndex].remove()
                }
            });
    });
}
}

function editCard() {
    let editButtons = document.querySelectorAll(".edit__button");
    if (editButtons) {
        editButtons.forEach((button) => {
            button.addEventListener("click", (e) => { 
                modalEdit.showModal()
                const statusEditInput = document.querySelector(".modal__edit .statusEdit");
                let currentCard = button.parentElement.parentElement.id;
                let indexOfCard = books.findIndex(book => book.id == currentCard);
                statusEditInput.value = books[indexOfCard].status;
                const readEditInput = document.querySelector(".modal__edit .readPagesEdit");
                readEditInput.max = books[indexOfCard].totalPages;
                if (statusEditInput.value == "Reading") {
                    readPagesEdit.disabled = false;
                    readEditInput.value = books[indexOfCard].readPages;
                }
            });
            closeEditModalButton.addEventListener("click", () => modalEdit.close());
            modalEdit.addEventListener('click', function(e) {
                if (e.target === e.currentTarget) {
                e.stopPropagation();
                modalEdit.close();
                }
            });
            let editedCard = button.parentElement.parentElement
            let currentCardId = editedCard.id;
            let indexOfCard = books.findIndex(book => book.id == currentCardId);
            editBooks(indexOfCard, editedCard);
        });
    }
}

function EnableDisableEditInput() {
    statusSelectEdit.addEventListener("change", (e) => {
        if (e.target.value == "Reading") {
            readPagesEdit.disabled = false;
        } else {
            readPagesEdit.disabled = true;
            readPagesEdit.value = "";
        }
    });
}

function editBooks(indexOfCard, editedCard) {
    let submitEditButton = document.querySelector(".submitEditButton");
    submitEditButton.addEventListener("click", (e) => {
        e.preventDefault();
        modalEdit.close();
        books[indexOfCard].changeStatus(statusSelectEdit.value,readPagesEdit.value);
        editedCard.querySelector(".status").textContent = "Status: " + books[indexOfCard].status;
        if (books[indexOfCard].status == "Reading") {
            if(editedCard.querySelector("progress")) {
                editedCard.querySelector("progress").remove();
            }
            if(editedCard.querySelector(".read__pages")) {
                editedCard.querySelector(".read__pages").remove();
            }
            
            const readPages = document.createElement("p");
            readPages.className = "read__pages";
            readPages.textContent = "Read pages: " + books[indexOfCard].readPages;
            editedCard.querySelector(".book__card_text").appendChild(readPages);
            const progressBar = document.createElement("progress");
            progressBar.id = "readprogress";
            progressBar.value = books[indexOfCard].readPages;
            progressBar.max = books[indexOfCard].totalPages;
            editedCard.querySelector(".book__card_text").appendChild(progressBar);
        } else {
            if(editedCard.querySelector("progress")) {
                editedCard.querySelector("progress").remove();
            }
            if(editedCard.querySelector(".read__pages")) {
                editedCard.querySelector(".read__pages").remove();
            }
        }
    });
}

ShowHideModal();
EnableDisableInput();
addBookToLibrary();
EnableDisableEditInput();
checkMaxPages();