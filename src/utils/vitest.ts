import { rAF, take, wrap } from '@reatom/core';
import { aroundEach } from 'vitest';

export type TestContext = { task: { id: string } };

export const testSuiteId = (context: TestContext) => `suite_${context.task.id}`;
export const testRootId = (context: TestContext) => `root_${context.task.id}`;
export const testOutsideId = (context: TestContext) =>
  `outside_${context.task.id}`;
export const testPopoverId = (context: TestContext) =>
  `popover_${context.task.id}`;
export const tick = async () => {
  await wrap(take(rAF));
  await wrap(take(rAF));
};

const addBlock = (id: string, to: HTMLElement) => {
  const block = document.createElement('div');
  block.id = id;
  to.append(block);

  return block;
};

export const createRoot = () => {
  aroundEach(async (runTest, ctx) => {
    const suite = addBlock(testSuiteId(ctx), document.querySelector('body')!);

    addBlock(testRootId(ctx), suite);
    addBlock(testOutsideId(ctx), suite);
    addBlock(testPopoverId(ctx), suite);

    await runTest();

    document.getElementById(testSuiteId(ctx))?.remove();
  });
};
