import { rAF, take, wrap } from '@reatom/core';
import { aroundEach } from 'vitest';

export type TestContext = { task: { id: string } };

export const testSuiteId = (context?: TestContext) =>
  ['suite', context?.task.id].filter(Boolean).join('_');
export const testRootId = (context?: TestContext) =>
  ['root', context?.task.id].filter(Boolean).join('_');
export const testOutsideId = (context?: TestContext) =>
  ['outside', context?.task.id].filter(Boolean).join('_');
export const testPopoverId = (context?: TestContext) =>
  ['popover', context?.task.id].filter(Boolean).join('_');
export const testOtherControlId = (context?: TestContext) =>
  ['other_control', context?.task.id].filter(Boolean).join('_');

export const tick = async () => {
  await wrap(take(rAF));
  await wrap(take(rAF));
};

const addBlock = (id: string, name: string, to: HTMLElement, as = 'div') => {
  const block = document.createElement(as);
  block.id = id;
  block.setAttribute('data-test-block', name);
  to.append(block);

  Object.assign(block.style, {
    minWidth: '100px',
    minHeight: '100px',
  });

  return block;
};

export const createRoot = () => {
  aroundEach(async (runTest, ctx) => {
    const suite = addBlock(
      testSuiteId(ctx),
      testSuiteId(),
      document.querySelector('body')!,
    );

    addBlock(testOutsideId(ctx), testOutsideId(), suite);
    addBlock(testRootId(ctx), testRootId(), suite);
    addBlock(testPopoverId(ctx), testPopoverId(), suite);

    await runTest();

    document.getElementById(testSuiteId(ctx))?.remove();
  });
};
