import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { CheckboxGroup, cnCheckboxGroup } from '../CheckboxGroup';

createRoot();
clearStack();

type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroup>;
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

const testId = 'CheckboxGroupCanary';

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
    direction?: CheckboxGroupProps['direction'];
    size?: CheckboxGroupProps['size'];
    view?: CheckboxGroupProps['view'];
    onChange?: OnChange;
  },
) => {
  const handleChange = vi.fn();
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <CheckboxGroup
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
  getRender(ctx).querySelectorAll(`.${cnCheckboxGroup('Item')}`);

const getItemInput = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll('.Checkbox-Input')[0] as HTMLInputElement;

describe.concurrent('Компонент CheckboxGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка items', () => {
      test('количество совпадает с передаваемым', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          const itemsRender = getItems(ctx);
          expect(itemsRender.length).toEqual(items.length);
        }));
    });

    describe.concurrent('проверка getLabel', () => {
      test('label совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getItems(ctx)[0].textContent).toEqual(items[0].name);
        }));
    });

    describe.concurrent('проверка name', () => {
      test(`name у элемента верный`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getItemInput(ctx).name).toEqual(testId);
        }));
    });

    describe.concurrent('проверка className', () => {
      test(`присвоился дополнительный класс`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(additionalClass);
        }));
    });

    describe.concurrent('проверка onChange', () => {
      test(`клик по элементу должен вызвать callback`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItems(ctx)[0];
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith([items[0]], {
            e: expect.any(Object),
          });
        }));
    });

    describe.concurrent('проверка getDisabled', () => {
      test(`клик по disabled элементу не должен вызывать handleChange`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItems(ctx)[2];
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalledTimes(0);
        }));
    });
  });
});
