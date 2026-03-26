import { cnIcon, IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixFocus } from '##/mixs/MixFocus/MixFocus';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnTabs, cnTabsTab, Tabs, TabsProps, tabsSizes, tabsViews } from '..';

createRoot();
clearStack();

const testId = cnTabs();

type Item = {
  name: string;
  icon: IconComponent;
};

type TabsPropsType = TabsProps<Item>;

const items: Item[] = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
    icon: IconCamera,
  },
  {
    name: 'три',
    icon: IconCamera,
  },
];

const additionalClass = 'additionalClass';

const renderComponent = (
  ctx: TestContext,
  props: {
    size?: TabsPropsType['size'];
    view?: TabsPropsType['view'];
    onlyIcon?: TabsPropsType['onlyIcon'];
    renderItem?: TabsPropsType['renderItem'];
    onChange?: TabsPropsType['onChange'];
  },
) => {
  const value = items[0];
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Tabs
            {...props}
            items={items}
            value={value}
            onChange={props.onChange || vi.fn()}
            getItemLabel={(item) => `Name-${item.name}`}
            getItemLeftIcon={(item) => item.icon}
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
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

const getItems = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnTabsTab()}`);
};

const getItem = (ctx: TestContext, index = 0) => {
  return getItems(ctx)[index] as HTMLLabelElement;
};

const getIcon = (ctx: TestContext, index = 0) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnIcon()}`)[index] as HTMLSpanElement;
};

describe.concurrent('Компонент Tabs', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    test('количество совпадает с передаваемым', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const itemsRender = getItems(ctx);
        expect(itemsRender.length).toEqual(items.length);
      }));

    test('выбранному элементу присвоился модификатор "_checked"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const item = getItem(ctx, 0);
        expect(item).toHaveClass(cnTabsTab({ checked: true }));
      }));

    test('label у элемента верный', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const item = getItem(ctx, 0);
        expect(item.textContent).toEqual(`Name-${items[0].name}`);
      }));

    test('иконка отображается', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const icon = getIcon(ctx, 0);
        expect(icon).toHaveClass('IconCamera');
      }));

    describe.concurrent('проверка onlyIcon', () => {
      test('текст не отображается', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onlyIcon: true });
          await wrap(tick());
          const item = getItem(ctx, 0);
          expect(item.textContent).toEqual('');
        }));

      test('присваивает класс', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onlyIcon: true });
          await wrap(tick());
          const item = getItem(ctx, 0);
          expect(item).toHaveClass(cnTabsTab({ onlyIcon: true }));
        }));
    });

    test('присвоился дополнительный класс', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const tabs = getRender(ctx);
        expect(tabs).toHaveClass(additionalClass);
      }));

    tabsSizes.forEach((size) => {
      test(`присваивает класс для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });
          await wrap(tick());
          const tabs = getRender(ctx);
          expect(tabs).toHaveClass(cnTabs({ size }));
        }));
    });

    tabsViews.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });
          await wrap(tick());
          const tabs = getRender(ctx);
          expect(tabs).toHaveClass(cnTabs({ view }));
        }));
    });

    describe.concurrent('проверка onChange', () => {
      test('клик по невыбранному элементу, должен вызвать callback c ожидаемыми параметрами', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const elementIndex = 1;

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItem(ctx, elementIndex);
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(items[elementIndex], {
            e: expect.any(Object),
          });
        }));

      test('клик по выбранному элементу, не должен вызвать callback', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItem(ctx, 0);
          fireEvent.click(item);

          expect(handleChange).not.toHaveBeenCalled();
        }));
    });

    test('рендер элемента производится прокинутой функцией', (ctx) =>
      context.start(async () => {
        const renderText = 'customRenderItem';
        // eslint-disable-next-line react/jsx-no-useless-fragment
        renderComponent(ctx, { renderItem: () => <>{renderText}</> });
        await wrap(tick());
        const render = getRender(ctx);
        expect(render.textContent).toEqual(
          `${renderText}${renderText}${renderText}`,
        );
      }));
  });

  test(`на элементах есть миксин ${cnMixFocus()}`, (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {});
      await wrap(tick());
      const item = getItem(ctx, 0);
      expect(item).toHaveClass(cnMixFocus({ before: true }));
    }));
});
