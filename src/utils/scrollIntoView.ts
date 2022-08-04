import computeScrollIntoView from 'compute-scroll-into-view';

export function scrollIntoView(
  node: HTMLDivElement,
  menuNode: HTMLDivElement,
): void {
  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  });
  actions.forEach((action) => {
    const { el, top, left } = action;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
