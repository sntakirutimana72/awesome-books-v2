/* eslint-disable no-restricted-syntax */

import { addBook, removeBook, populateBooksFromStorage } from './modules/books-manager.js';
import { $select, $selectById, addNewForm as form } from './modules/selectors.js';

const anchors = Array.from($select('.navbar a', true));

const switchSection = (event) => {
  event.preventDefault();

  const recentAnchor = anchors.find(node => node.classList.contains('active'))
  const $this = event.target;

  if (recentAnchor === $this) return;

  recentAnchor.classList.remove('active');
  $this.classList.add('active');

  const [, recentSectionId] = recentAnchor.href.split('#');

  $selectById(recentSectionId).classList.add('invisible');
  $selectById($this.href.split('#')[1]).classList.remove('invisible');
}

form.addEventListener('submit', addBook);
document.body.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', populateBooksFromStorage);

anchors.forEach((anchor) => anchor.addEventListener('click', switchSection));
