/* eslint-disable no-restricted-syntax */

import { addBook, removeBook, populateBooksFromStorage } from "./modules/books_manager.js";
import { $select, $selectById } from "./modules/selectors.js";

const anchors = $select('.navbar a', true);

function switchSection(event) {
  event.preventDefault();

  this.classList.toggle('active', true);

  let recentSectionId;

  for (const anchor of anchors) {
    if (anchor !== this && anchor.classList.contains('active')) {
      [, recentSectionId] = anchor.href.split('#');
      anchor.classList.remove('active');
      break;
    }
  }

  if (recentSectionId !== undefined) {
    $selectById(recentSectionId).classList.add('invisible');
    $selectById(this.href.split('#')[1]).classList.remove('invisible');
  }
}

document.forms[0].addEventListener('submit', addBook);
document.body.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', populateBooksFromStorage);

anchors.forEach((anchor) => anchor.addEventListener('click', switchSection));
