import { browserHistory } from 'react-redux';

export function setQueryString(key, val) {
  if (window) {
    const url = window.location.pathname + window.location.search;
    const regex = new RegExp(`/${key}=([^&]+)/`);
    let newURL = url.includes('?')
      ? url.replace(
        regex,
        match => val
          ? [match.split('=')[0], val].join('=')
          : ''
      )
      : url.concat(`?${key}=${val}`);

    if (newURL[newURL.length - 1] === '?') {
      newURL = newURL.slice(0, newURL.length - 1);
    }

    browserHistory.push(newURL);
  }
}

/**
 * Compares given query key on new and old URL locations, and performs callback on change.
 *
 * @param      {string}    key          The querystring key to watch
 * @param      {object}    oldLocation  The old location
 * @param      {object}    newLocation  The new location
 * @param      {Function}  onChange     Called on change with the new query value
 */
export function handleQueryStringChange(key, oldLocation, newLocation, onChange) {
  if (!oldLocation.query || !newLocation.query) return;

  if (oldLocation.query[key] !== newLocation.query[key]) {
    onChange(newLocation.query[key]);
  }
}

