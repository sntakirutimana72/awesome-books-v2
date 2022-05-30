import { $select, $html, addNewForm as form } from './selectors.js';

const booksList = $select('.books-list');

const booksStorageRefId = 'bookStorage';

class BooksManager {
  constructor() {
    this.idCounter = 0;
    this.books = [];

    const idCounterTemp = localStorage.getItem('idCounter');

    if (idCounterTemp !== null) {
      this.idCounter = parseInt(idCounterTemp, 10);
    }

    const booksTemp = localStorage.getItem(booksStorageRefId);

    if (booksTemp !== null) {
      this.books = JSON.parse(booksTemp);
    }
  }

  remove(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);

    localStorage.setItem(booksStorageRefId, JSON.stringify(this.books));
  }

  add(title, author) {
    this.idCounter += 1;

    const newBook = {
      id: this.idCounter,
      title,
      author,
    };
    this.books.push(newBook);

    localStorage.setItem(booksStorageRefId, JSON.stringify(this.books));
    localStorage.setItem('idCounter', this.idCounter);

    return newBook;
  }

  getAllBooks() {
    return this.books;
  }

  isEmpty() {
    return this.books.length === 0;
  }
}

const manager = new BooksManager();

const render = ({ id: bookId, title, author }) => {
  const bookItem = document.createElement('div');
  bookItem.id = bookId;
  bookItem.className = 'book-item';

  $html(
    bookItem,
    `<span><b>“${title}”</b> by ${author}</span><button class="remove-book-btn btn" type="button">Remove</button>`,
    true,
  );

  return bookItem;
};

const toggleBooksPlaceholder = (force) => {
  booksList
    .querySelector('.books-placeholder')
    .classList.toggle('hidden', force);
};

export const removeBook = (event) => {
  if (event.target.classList.contains('remove-book-btn')) {
    const bookItem = event.target.parentElement;
    bookItem.style.display = 'none';
    manager.remove(parseInt(bookItem.id, 10));

    if (manager.isEmpty()) {
      toggleBooksPlaceholder(false);
    }
  }
};

export const addBook = (event) => {
  event.preventDefault();
  toggleBooksPlaceholder(true);

  const book = manager.add(form.elements.title.value, form.elements.author.value);
  booksList.appendChild(render(book));

  $select('.navbar a').click();
  form.reset();
};

export const populateBooksFromStorage = () => {
  const books = manager.getAllBooks();
  books.forEach((book) => { booksList.appendChild(render(book)); });

  if (!manager.isEmpty()) {
    toggleBooksPlaceholder();
  }
};
