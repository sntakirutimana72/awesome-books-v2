import { $text } from './selectors.js';

const DateTime = luxon.DateTime;

$text(
  '.show-date span',
  DateTime
    .local()
    .toFormat('MMMM dd yyyy, h:mm:ss a'));
