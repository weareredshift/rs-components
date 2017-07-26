import mojs from 'mo-js';

/**
 * Function that when called on an element (usually document.body), scrolls to a
 * target height over a given duration.
 * @param {Element} element - The element to scroll.
 * @param {number} target - The target height
 * @param {number} duration - The target duration
 */
export function smoothScroll (element, target, duration) {
  new mojs.Tween({
    duration,
    onUpdate: progress => {
      element.scrollTop = progress * target;
    }
  }).play();
}
