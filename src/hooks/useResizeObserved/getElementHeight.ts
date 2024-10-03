export const getElementHeight = (
  el: HTMLElement | SVGGraphicsElement | null,
): number => (el ? el.getBoundingClientRect().height : 0);
