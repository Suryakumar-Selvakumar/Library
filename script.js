const myLibrary = [];
const books = document.querySelector(".books");
const newBook = document.querySelector(".new-book");
const addBook = document.querySelector(".add-book-btn");

function Book(bookName, readStatus) {
  this.bookName = bookName;
  this.readStatus = readStatus;
}

const book1 = new Book("Dracula", true);
const book2 = new Book("Dune", false);

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

const labelReadStatus = document.createElement("label");
labelReadStatus.setAttribute("for", "read-status");
labelReadStatus.textContent = "Read already?";
const inputReadStatus = document.createElement("input");
inputReadStatus.setAttribute("type", "checkbox");
inputReadStatus.setAttribute("id", "read-status");
inputReadStatus.setAttribute("name", "read-status");

const btnSubmit = document.createElement("button");
btnSubmit.setAttribute("type", "submit");
btnSubmit.textContent = "Submit";

form.append(
  labelBookName,
  inputBookName,
  labelReadStatus,
  inputReadStatus,
  btnSubmit
);

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
  let bookNameValue, readStatusValue;
  for (const value of data.values()) {
    dataArray.push(value);
  }
  bookNameValue = dataArray[0];
  if (dataArray[1] === "on") {
    readStatusValue = true;
  } else {
    readStatusValue = false;
  }
  const book = new Book(bookNameValue, readStatusValue);
  addBookToLibrary(book);
  displayBook(myLibrary);
});

for (const div of books.children) {
  console.log(div.lastChild);
  const deleteBtn = div.lastChild;
  deleteBtn.addEventListener("click", () => {
    for (const div of books.children) {
      if (div.dataset.index === deleteBtn.dataset.btn) {
        myLibrary.splice(div.dataset.index, 1);
      }
    }
    displayBook(myLibrary);
  });
}
