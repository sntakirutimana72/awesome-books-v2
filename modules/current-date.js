import { DateTime } from './luxon.js';
import { $text } from './selectors.js';

$text(
  '.show-date span',
  DateTime
    .local()
    .toFormat('MMMM dd yyyy, h:mm:ss a'),
);
