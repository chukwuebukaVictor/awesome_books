import Book from './modules/addBook.js';

let removeBtn = document.querySelectorAll('.remove');

function addEvents() {
  removeBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
      const ref = e.target.id;
      Book.removeBook(ref);
      e.target.parentElement.remove();
    });
  });
}

// populate dom with the list

const addBtn = document.querySelector('#add-btn');

function populateDom(list) {
  const booksListDiv = document.querySelector('#books-list');
  for (let i = 0; i < list.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'book';
    const pTitle = document.createElement('p');
    pTitle.innerHTML = `"${list[i].title}" by ${list[i].author}`;
    div.appendChild(pTitle);
    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerHTML = 'Remove';
    btn.id = list[i].id;
    div.appendChild(btn);
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll('.remove');
  addEvents();
}

function nav(element, link) {
  document.querySelector('.show').className = 'hidden';
  document.querySelector(element).className = 'show';
  document.querySelectorAll('a').forEach((item) => {
    item.className = '';
  });
  link.className = 'active';
}

// get input from form and call addToBooks method

function addNewBook() {
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  if (bookTitle && bookAuthor) {
    const newBook = new Book(bookTitle, bookAuthor);
    Book.addToBooks(newBook);
    populateDom([newBook]);
    document.querySelector('form').reset();
    const listLink = document.querySelector('#list-link');
    nav('#books', listLink);
  }
}

addBtn.addEventListener('click', addNewBook);

document.querySelectorAll('a').forEach((item) => {
  const ref = item.getAttribute('href');
  item.addEventListener('click', () => {
    nav(ref, item);
  });
});

/* eslint-disable no-undef */
const time = document.querySelector('.date');
const currentDate = luxon.DateTime.local().toLocaleString(
  luxon.DateTime.DATETIME_FULL,
);
time.innerHTML = currentDate;

window.onload = () => {
  if (localStorage.getItem('data') === null) {
    populateDom(Book.books);
  } else {
    const localBooks = JSON.parse(localStorage.getItem('data'));
    populateDom(localBooks);
    Book.books = localBooks;
  }
};