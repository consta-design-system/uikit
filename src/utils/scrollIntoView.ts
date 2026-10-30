import { compute } from 'compute-scroll-into-view';

export function scrollIntoView(menuNode?: HTMLElement): void {
  if (!menuNode) {
    return;
  }
  const actions = compute(menuNode, {
    block: 'nearest',
    scrollMode: 'if-needed',
  });

  actions.forEach((action) => {
    const { el, top, left } = action;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
