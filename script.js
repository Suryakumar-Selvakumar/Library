const myLibrary = [];
const books = document.querySelector(".books");
const newBook = document.querySelector(".new-book");
const addBook = document.querySelector(".add-book-btn");

function Book(bookName, author) {
  this.bookName = bookName;
  this.author = author;
  this.readStatus = false;
}

const book1 = new Book("Dracula", "Bram Stoker");
const book2 = new Book("Dune", "Frank Herbert");

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(book1);
addBookToLibrary(book2);

function displayBook(Library) {
  books.innerHTML = "";
  Library.forEach((book) => {
    const div = document.createElement("div");
    div.textContent = `${book.bookName}`;
    div.setAttribute("data-index", Library.indexOf(book));

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-btn", Library.indexOf(book));

    const readStatusLabel = document.createElement("label");
    readStatusLabel.setAttribute("for", "read-status-btn");
    readStatusLabel.textContent = "Read?";
    const readStatusBtn = document.createElement("input");
    readStatusBtn.setAttribute("type", "checkbox");
    readStatusBtn.setAttribute("id", "read-status-btn");
    readStatusBtn.setAttribute("data-read-btn", Library.indexOf(book));

    div.append(readStatusLabel, readStatusBtn);
    div.appendChild(deleteBtn);
    books.appendChild(div);
  });
}

displayBook(myLibrary);

const form = document.createElement("form");

const labelBookName = document.createElement("label");
labelBookName.setAttribute("for", "book-name");
labelBookName.textContent = "Book Name: ";
const inputBookName = document.createElement("input");
inputBookName.setAttribute("type", "text");
inputBookName.setAttribute("id", "book-name");
inputBookName.setAttribute("name", "book-name");

const labelAuthor = document.createElement("label");
labelAuthor.setAttribute("for", "author");
labelAuthor.textContent = "Author:";
const inputAuthor = document.createElement("input");
inputAuthor.setAttribute("type", "text");
inputAuthor.setAttribute("id", "author");
inputAuthor.setAttribute("name", "author");

const btnSubmit = document.createElement("button");
btnSubmit.setAttribute("type", "submit");
btnSubmit.textContent = "Submit";

form.append(labelBookName, inputBookName, labelAuthor, inputAuthor, btnSubmit);

addBook.addEventListener("click", () => {
  newBook.appendChild(form);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(form);
  form.reset();
  newBook.removeChild(form);
});

form.addEventListener("formdata", (e) => {
  const data = e.formData;
  const dataArray = [];
  let bookNameValue, AuthorValue;
  for (const value of data.values()) {
    dataArray.push(value);
  }
  bookNameValue = dataArray[0];
  AuthorValue = dataArray[1];
  const book = new Book(bookNameValue, AuthorValue);
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
    if (event.target.checked) {
      myLibrary[index].readStatus = true;
    } else {
      myLibrary[index].readStatus = false;
    }
  }
});
