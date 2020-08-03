/* eslint-disable @typescript-eslint/no-empty-function */
class ResizeObserver {
  // eslint-disable-next-line class-methods-use-this
  observe(): void {}

  // eslint-disable-next-line class-methods-use-this
  unobserve(): void {}

  // eslint-disable-next-line class-methods-use-this
  disconnect(): void {}
}

window.ResizeObserver = ResizeObserver;

export default ResizeObserver;
