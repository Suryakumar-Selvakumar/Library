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
    div.setAttribute("data-index", Library.indexOf(book));
    div.classList.add("book-card");

    const paraBook = document.createElement("p");
    paraBook.textContent = `${book.bookName}`;
    const paraAuthor = document.createElement("p");
    paraAuthor.textContent = `${book.author}`;

    const divBook = document.createElement("div");
    divBook.classList.add("div-book");
    divBook.append(paraBook, paraAuthor);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("data-btn", Library.indexOf(book));
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -2.5 24 24' width='30px' height='30px'><path d='M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z' fill='white'/></svg>";

    const readStatusBtn = document.createElement("input");
    readStatusBtn.setAttribute("type", "checkbox");
    readStatusBtn.setAttribute("id", "read-status-btn");
    readStatusBtn.setAttribute("data-read-btn", Library.indexOf(book));
    readStatusBtn.classList.add("read-btn");

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

const divBookInput = document.createElement("div");
divBookInput.append(labelBookName, inputBookName);

const labelAuthor = document.createElement("label");
labelAuthor.setAttribute("for", "author");
labelAuthor.textContent = "Author:";
const inputAuthor = document.createElement("input");
inputAuthor.setAttribute("type", "text");
inputAuthor.setAttribute("id", "author");
inputAuthor.setAttribute("name", "author");

const divAuthorInput = document.createElement("div");
divAuthorInput.append(labelAuthor, inputAuthor);

const btnSubmit = document.createElement("button");
btnSubmit.setAttribute("type", "submit");
btnSubmit.textContent = "Submit";

form.append(divBookInput, divAuthorInput, btnSubmit);

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
