import { TweenMax } from 'gsap';

export function setBlurFilter (element, blurAmount) {
  TweenMax.set(element, {
    webkitFilter: `blur(${blurAmount}px)`,
    filter: `blur(${blurAmount}px)`
  });
}

