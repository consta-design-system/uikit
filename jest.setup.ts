import '@testing-library/jest-dom';

import ResizeObserver from './__mocks__/ResizeObserver';

jest.mock('resize-observer-polyfill', () => {
  return ResizeObserver;
});
