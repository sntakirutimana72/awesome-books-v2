/* eslint-disable no-plusplus */
/* eslint-disable radix */

import { $select, $html, $text } from './selectors.js';

const booksList = $select('.books-list');
const booksStorageRefId = 'bookStorage';

class BooksManager {
  constructor() {
    const idCounterTemp = localStorage.getItem('idCounter');

    if (idCounterTemp !== null) {
      this.idCounter = parseInt(idCounterTemp);
    } else {
      this.idCounter = 0;
    }

    const booksTemp = localStorage.getItem(booksStorageRefId);

    if (booksTemp !== null) {
      this.books = JSON.parse(booksTemp);
    } else {
      this.books = [];
    }
  }

  remove(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);

    localStorage.setItem(booksStorageRefId, JSON.stringify(this.books));
  }

  add(title, author) {
    const newBook = {
      id: ++this.idCounter,
      title,
      author
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
    true);

  return bookItem;
}

const toggleBooksPlaceholder = (force) => {
  booksList
    .querySelector('.books-placeholder')
    .classList.toggle('hidden', force);
}

export function removeBook(event) {
  if (event.target.classList.contains('remove-book-btn')) {
    const bookItem = event.target.parentElement;
    bookItem.style.display = 'none';
    manager.remove(parseInt(bookItem.id));

    if (manager.isEmpty()) {
      toggleBooksPlaceholder(false);
    }
  }
}

export function addBook(event) {
  event.preventDefault();
  toggleBooksPlaceholder(true);

  const book = manager.add(this.elements.title.value, this.elements.author.value);
  booksList.appendChild(render(book));

  $select('.navbar a').click();
  this.reset();
}

export const populateBooksFromStorage = () => {
  const books = manager.getAllBooks();
  books.forEach((book) => { booksList.appendChild(render(book)); });

  if (!manager.isEmpty()) {
    toggleBooksPlaceholder();
  }
}
