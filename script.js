const myLibrary = [];
const books = document.querySelector(".books");
const addBook = document.querySelector(".add-book");

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
  Library.forEach((book) => {
    const div = document.createElement("div");
    div.textContent = `${book.bookName}`;
    books.appendChild(div);
  });
}

displayBook(myLibrary);

addBook.addEventListener("click", (book) => {});
