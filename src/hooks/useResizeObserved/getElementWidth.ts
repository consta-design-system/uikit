export const getElementWidth = (
  el: HTMLElement | SVGGraphicsElement | null,
): number => (el ? el.getBoundingClientRect().width : 0);
