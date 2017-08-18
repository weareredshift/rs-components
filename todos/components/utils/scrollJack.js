import { scrollDebounce } from 'utils/debounce';

// TODO Remove all of these functions in favor of new scroll event system

// stores Y value when a touch event is initiated
let touchStartY;

// Returns 'up' or 'down' depending on scroll direction of passed event
export function getScrollDirection (event) {
  let direction;

  if (event.type === 'wheel') {
    direction = event.deltaY >= 0 ? 'down' : 'up';
  } else if (event.type === 'keydown') {
    if (event.key === 'ArrowDown') direction = 'down';
    if (event.key === 'ArrowUp') direction = 'up';
  } else if (event.type === 'touchend') {
    direction = event.pageY < touchStartY ? 'down' : 'up';
  }

  return direction;
}

// Creates scroll handlers for various input devices
export function onScroll (wait, leadingFunc, trailingFunc) {
  window.ontouchstart = (event) => { touchStartY = event.pageY; };
  window.onwheel = wait > 0 ? scrollDebounce(wait, leadingFunc, trailingFunc) : leadingFunc;
  window.onmousewheel = wait > 0 ? scrollDebounce(wait, leadingFunc, trailingFunc) : leadingFunc;
  window.ontouchend = wait > 0 ? scrollDebounce(wait, leadingFunc, trailingFunc) : leadingFunc;
  document.onkeydown = wait > 0 ? scrollDebounce(wait, leadingFunc, trailingFunc) : leadingFunc;
}

// Enables free page scrolling
export function enableScroll (elem) {
  const scroller = elem || document.querySelector('html');
  scroller.classList.remove('disable-scroll');
}

// Disables free page scrolling
export function disableScroll (elem) {
  const scroller = elem || document.querySelector('html');
  scroller.classList.add('disable-scroll');
}
