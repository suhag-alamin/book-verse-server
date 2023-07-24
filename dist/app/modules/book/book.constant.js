'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = [
  'title',
  'author.firstName',
  'author.lastName',
  'genre',
];
exports.bookFilterableFields = ['searchTerm', 'genre', 'publicationYear'];
