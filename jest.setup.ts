/* eslint-disable max-classes-per-file */
// @ts-nocheck
import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Fetch API globals for Jest/Node environment
if (typeof Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.input = input;
      this.init = init;
    }
  };
}

if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.init = init;
    }
  };
}

if (typeof Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init) {
      this.init = init;
    }
  };
}
