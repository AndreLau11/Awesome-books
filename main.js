const titleInput = document.getElementById('bookTitle');
const authorInput = document.getElementById('bookAuthor');
const submitButton = document.getElementById('addButton');

const radix = 10;

let bookStorage = {
  totalBook: 0,
  bookList: [],
};

function loadLocalStorage() {
  const data = localStorage.getItem('book');
  bookStorage = JSON.parse(data);
}

function createLocalStorage() {
  if (localStorage.getItem('book') === null) {
    localStorage.setItem('book', JSON.stringify(bookStorage));
    loadLocalStorage();
  } else {
    loadLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem('book', JSON.stringify(bookStorage));
}

const renderBook = (book) => {
  const { id, title, author } = book;

  const renderContainer = document.createElement('div');
  renderContainer.setAttribute('data-id', id);
  renderContainer.innerHTML = `
            <h4>${title}</h4>
            <h5>${author}</h5>
            <button type="button" onclick="removeBook('${book.id}')">Remove</button>
            <hr>
  `;
  return renderContainer;
};

const renderBooks = () => {
  createLocalStorage();
  const container = document.getElementById('bookBase');
  container.innerHTML = '';
  if (bookStorage.bookList !== null) {
    bookStorage.bookList.forEach((book) => {
      container.appendChild(renderBook(book));
    });
  }
};

function removeBook(bookId) {
  const books = bookStorage.bookList.filter((item) => item.id !== parseInt(bookId, radix));
  bookStorage.bookList = books;
  updateLocalStorage();
  renderBooks();
}

removeBook();

function addBook(book) {
  bookStorage.bookList.push(book);
  updateLocalStorage();
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  bookStorage.totalBook += 1;
  const book = {};
  book.id = bookStorage.totalBook;
  book.title = titleInput.value;
  book.author = authorInput.value;
  titleInput.value = '';
  authorInput.value = '';
  addBook(book);
  renderBooks();
});

renderBooks();
