import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSwitchGroup, SwitchGroup } from '../SwitchGroup';

type SwitchGroupProps = React.ComponentProps<typeof SwitchGroup>;
type Item = {
  name: string;
  disabled?: boolean;
};
type OnChange = (
  value: Item[] | null,
  props: {
    e: React.ChangeEvent<HTMLInputElement>;
  },
) => void;

const testId = 'SwitchGroup';

const items: Item[] = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
  {
    name: 'три',
    disabled: true,
  },
];

const additionalClass = 'additionalClass';

const renderComponent = (
  ctx: TestContext,
  props: {
    direction?: SwitchGroupProps['direction'];
    size?: SwitchGroupProps['size'];
    view?: SwitchGroupProps['view'];
    onChange?: OnChange;
  },
) => {
  const handleChange = vi.fn();

  act(() => {
    const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SwitchGroup
            items={items}
            getItemLabel={(item) => `${item.name}`}
            getItemDisabled={(item) => item.disabled}
            onChange={props.onChange || handleChange}
            name={testId}
            className={additionalClass}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnSwitchGroup('Item')}`);

const getItemInput = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll('.Switch-Input')[0] as HTMLInputElement;

createRoot();
clearStack();

describe('Компонент SwitchGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка items', () => {
      test('количество совпадает с передаваемым', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          const itemsRender = getItems(ctx);
          expect(itemsRender.length).toEqual(items.length);
        }));
    });

    describe('проверка getItemLabel', () => {
      test('label совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(getItems(ctx)[0].textContent).toEqual(items[0].name);
        }));
    });

    describe('проверка name', () => {
      test('name у элемента верный', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(getItemInput(ctx).name).toEqual(testId);
        }));
    });

    describe('проверка className', () => {
      test('присвоился дополнительный класс', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(getRender(ctx)).toHaveClass(additionalClass);
        }));
    });

    describe('проверка onChange', () => {
      test('клик по элементу должен вызвать callback', (ctx) =>
        context.start(async () => {
          const onChange = vi.fn();
          const index = 0;

          renderComponent(ctx, { onChange });

          fireEvent.click(getItems(ctx)[index]);

          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith([items[index]], {
            e: expect.any(Object),
          });
        }));
    });

    describe('проверка getItemDisabled', () => {
      test('клик по disabled элементу не должен вызывать handleChange', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });

          const item = getItems(ctx)[2];
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalledTimes(0);
        }));
    });
  });
});
