import React from 'react';
import { Link } from 'react-router';
import { kebabCase } from 'lodash';

/**
 * Basic string shortening.
 *
 * @param {string} title A title string to be shortened.
 * @returns {string} The title if shorter than 28 chars, or the title shortened
 * to 28 chars with an added ellipsis.
 */
export function ellipsisTitle (title, charLength = 28) {
  if (title.length > charLength) {
    return title.slice(0, charLength).concat('...');
  } else {
    return title;
  }
}

/**
 * Creates a blog routed link with a `kebab-case` slugged category.
 * @param {string} category - The category string.
 * @returns {Link} The link.
 */
export function linkifyCategory (category) {
  return (
    <Link to={ `/blog/categories/${kebabCase(category)}` }>
      { category }
    </Link>
  );
}

/**
 * Creates a blog routed link with a `kebab-case` slugged author name.
 * @param {string} tag - The author string.
 * @returns {Link} The link.
 */
export function linkifyAuthor (author) {
  return (
    <Link to={ `/blog/authors/${kebabCase(author)}` }>
      { author }
    </Link>
  );
}
