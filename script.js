const myLibrary = [];
const books = document.querySelector(".books");
const newBook = document.querySelector(".new-book");
const addBook = document.querySelector(".add-book-btn");


class Book {
  constructor(bookName, author, pages) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
  }
}


const book1 = new Book("Dracula", "Bram Stoker", 488);
const book2 = new Book("Dune", "Frank Herbert", 412);
const book3 = new Book("Atomic Habits", "James Clear", 320);
const book4 = new Book("Where the Crawdads Sing", "Delia Owens", 384);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function displayBook(Library) {
  books.innerHTML = "";
  Library.forEach((book) => {
    const index = Library.indexOf(book);
    const div = document.createElement("div");
    div.setAttribute("data-index", index);
    div.classList.add("book-card");

    const paraBook = document.createElement("p");
    paraBook.textContent = `${book.bookName}`;
    const paraAuthor = document.createElement("p");
    paraAuthor.textContent = `${book.author}`;
    const paraPages = document.createElement("p");
    paraPages.textContent = `${book.pages} pages`;

    const divBook = document.createElement("div");
    divBook.classList.add("div-book");
    divBook.append(paraBook, paraAuthor, paraPages);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("data-btn", index);
    deleteBtn.classList.add("delete-btn");

    const readStatusBtn = document.createElement("input");
    readStatusBtn.setAttribute("type", "checkbox");
    readStatusBtn.setAttribute("id", "read-status-btn");
    readStatusBtn.setAttribute("data-read-btn", index);
    readStatusBtn.classList.add("read-btn");
    if (book.readStatus === true) {
      readStatusBtn.checked = true;
    } else if (book.readStatus === false) {
      readStatusBtn.checked = false;
    }

    const divBtns = document.createElement("div");
    divBtns.classList.add("div-btns");
    divBtns.append(readStatusBtn, deleteBtn);

    div.append(divBook, divBtns);
    books.appendChild(div);
  });
}

displayBook(myLibrary);

const form = document.createElement("form");
form.classList.add("add-book-form");

const labelBookName = document.createElement("label");
labelBookName.setAttribute("for", "book-name");
labelBookName.textContent = "Book Name: ";
const inputBookName = document.createElement("input");
inputBookName.setAttribute("type", "text");
inputBookName.setAttribute("id", "book-name");
inputBookName.setAttribute("name", "book-name");
inputBookName.required = true;

const divBookInput = document.createElement("div");
divBookInput.append(labelBookName, inputBookName);

const labelAuthor = document.createElement("label");
labelAuthor.setAttribute("for", "author");
labelAuthor.textContent = "Author:";
const inputAuthor = document.createElement("input");
inputAuthor.setAttribute("type", "text");
inputAuthor.setAttribute("id", "author");
inputAuthor.setAttribute("name", "author");
inputAuthor.required = true;

const divAuthorInput = document.createElement("div");
divAuthorInput.append(labelAuthor, inputAuthor);

const labelPages = document.createElement("label");
labelPages.setAttribute("for", "pages");
labelPages.textContent = "No. of Pages:";
const inputPages = document.createElement("input");
inputPages.setAttribute("type", "tel");
inputPages.setAttribute("id", "pages");
inputPages.setAttribute("name", "pages");
inputPages.required = true;
inputPages.setAttribute("pattern", "^\\d*\\.?\\d+$");
inputPages.setAttribute("title", "Pages are positive numbers!");

const divPagesInput = document.createElement("div");
divPagesInput.append(labelPages, inputPages);

const btnSubmit = document.createElement("button");
btnSubmit.setAttribute("type", "submit");
btnSubmit.textContent = "Submit";

const btnCancel = document.createElement("button");
btnCancel.setAttribute("type", "button");
btnCancel.textContent = "Cancel";

const divButtons = document.createElement("div");
divButtons.append(btnCancel, btnSubmit);

form.append(divBookInput, divAuthorInput, divPagesInput, divButtons);

addBook.addEventListener("click", () => {
  newBook.removeChild(addBook);
  newBook.appendChild(form);
});

btnCancel.addEventListener("click", () => {
  form.reset();
  newBook.removeChild(form);
  newBook.appendChild(addBook);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(form);
  form.reset();
  newBook.removeChild(form);
  newBook.appendChild(addBook);
});

form.addEventListener("formdata", (e) => {
  const data = e.formData;
  const dataArray = [];
  let bookNameValue, authorValue, pagesValue;
  for (const value of data.values()) {
    dataArray.push(value);
  }
  bookNameValue = dataArray[0];
  authorValue = dataArray[1];
  pagesValue = dataArray[2];
  const book = new Book(bookNameValue, authorValue, pagesValue);
  addBookToLibrary(book);
  displayBook(myLibrary);
});

books.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const index = event.target.getAttribute("data-btn");
    myLibrary.splice(index, 1);
    displayBook(myLibrary);
  }
  if (event.target.tagName === "INPUT") {
    const index = event.target.getAttribute("data-read-btn");
    if (event.target.checked && myLibrary[index].readStatus === false) {
      myLibrary[index].readStatus = true;
    } else if (myLibrary[index].readStatus === true) {
      myLibrary[index].readStatus = false;
    }
    displayBook(myLibrary);
  }
});
