import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';
import { cnFieldControlLayout } from '##/components/FieldComponents';
import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  testSuiteId,
  tick,
} from '##/utils/vitest';

import {
  cnFlatSelect,
  FlatSelect,
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectProps,
} from '..';
import { groups, items } from '../__mocks__/data.mock';
import { cnFlatSelectCreateButton } from '../FlatSelectCreateButton';
import { cnFlatSelectItemAll } from '../FlatSelectItemAll';

createRoot();
clearStack();

/**
 * Идентификатор компонента для тестирования.
 */
const testId = 'FlatSelect';
/**
 * Длительность анимации в миллисекундах для тестов с таймерами.
 */
const animationDuration = 200;

/**
 * Пропсы по умолчанию для компонента FlatSelect в тестах.
 */
const defaultProps = {
  items,
  onChange: () => {},
  getItemDisabled: () => undefined,
  getItemGroup: () => undefined,
};

/**
 * Все возможные значения пропса `view` для тестирования.
 */
const views: FlatSelectProps['view'][] = ['default', 'clear'];
/**
 * Все возможные значения пропса `size` для тестирования.
 */
const sizes: FlatSelectProps['size'][] = ['s', 'm', 'l'];
/**
 * Все возможные значения пропса `form` для тестирования.
 */
const forms: FlatSelectProps['form'][] = ['default', 'brick', 'round'];

/**
 * Компонент-обёртка, который рендерит кнопку-якорь и FlatSelect с привязкой к этому якорю.
 * Используется для тестирования поведения FlatSelect с anchorRef.
 */
const ComponentWithAnchorRef: FlatSelectComponent = (props) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={ref} data-testid="anchor" type="button">
        Button
      </button>

      <FlatSelect {...props} anchorRef={ref} />
    </>
  );
};

/**
 * Рендерит компонент FlatSelect в тестовом окружении.
 *
 * @template ITEM - тип элемента списка.
 * @template GROUP - тип группы.
 * @template MULTIPLE - флаг множественного выбора.
 * @param ctx - контекст теста Vitest.
 * @param props - пропсы для FlatSelect.
 */
const renderComponent = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  ctx: TestContext,
  props: FlatSelectProps<ITEM, GROUP, MULTIPLE>,
) => {
  const { anchorRef } = props;
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault} style={{ width: 1000, height: 1000 }}>
          {anchorRef ? (
            <ComponentWithAnchorRef
              data-testid={testId}
              {...props}
              container={document.getElementById(testPopoverId(ctx))!}
              //   viewportRef={{
              //     current: document.getElementById(testPopoverId(ctx))!,
              //   }}
            />
          ) : (
            <FlatSelect data-testid={testId} {...props} />
          )}
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

/**
 * Возвращает DOM-элемент отрендеренного FlatSelect.
 */
const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testSuiteId(ctx)} [data-testid="${testId}"]`)!;
/**
 * Возвращает DOM-элемент кнопки-якоря.
 */
const getAnchor = (ctx: TestContext) =>
  document.querySelector(`#${testSuiteId(ctx)} [data-testid="anchor"]`)!;
// const getOutside = (ctx: TestContext) => screen.getByTestId('outside') as HTMLDivElement;

/**
 * Возвращает кнопку очистки поля ввода.
 */
const getClearButton = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.FieldClearButton`) as HTMLButtonElement;

/**
 * Симулирует клик на кнопке-якоре.
 */
const anchorClick = (ctx: TestContext) => fireEvent.click(getAnchor(ctx));

/**
 * Возвращает все DOM-элементы элементов списка (FlatSelectItem).
 */
const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];
/**
 * Возвращает DOM-элемент элемента списка по индексу.
 */
const getItem = (ctx: TestContext, index: number = 0) =>
  getItems(ctx)[index] as HTMLDivElement;
/**
 * Возвращает DOM-элемент поля ввода (input).
 */
const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector('input') as HTMLInputElement;

/**
 * Возвращает все DOM-элементы групп списка.
 */
const getGroups = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnListGroupLabel()}`);

/**
 * Возвращает DOM-элемент группы списка по индексу.
 */
const getGroup = (ctx: TestContext, index: number) => getGroups(ctx)[index];

/**
 * Возвращает DOM-элемент левой иконки.
 */
const getIcon = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${iconMockText}`) as HTMLSpanElement;

/**
 * Возвращает DOM-элемент кнопки создания нового элемента (onCreate).
 */
const getCreateButton = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnFlatSelectCreateButton()}`,
  ) as HTMLButtonElement;

/**
 * Возвращает DOM-элемент лейаута поля управления (FieldControlLayout).
 */
const getFieldControlLayout = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnFieldControlLayout()}`) as HTMLDivElement;

/**
 * Возвращает DOM-элемент кнопки "Выбрать все" (FlatSelectItemAll).
 */
const getSelectAll = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnFlatSelectItemAll()}`) as HTMLDivElement;

describe.concurrent(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);
      await wrap(tick());
      expect(getRender(ctx)).toBeInTheDocument();
    }));
  describe.concurrent('проверка ref', () => {
    test('ref присвоен', (ctx) =>
      context.start(async () => {
        const ref = { current: null };
        renderComponent(ctx, { ...defaultProps, ref });
        expect(ref.current).toBeTruthy();
      }));
  });
  describe.concurrent('проверка className', () => {
    test('Присваивается дополнительный className', (ctx) =>
      context.start(async () => {
        const className = 'custom-class';
        renderComponent(ctx, {
          ...defaultProps,
          className,
        });

        expect(getRender(ctx)).toHaveClass(className);
      }));
  });
  describe.concurrent('проверка other props', () => {
    test('Присваиваются дополнительные атрибуты', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          'aria-label': 'test-autocomplete',
        });
        expect(getRender(ctx)).toHaveAttribute(
          'aria-label',
          'test-autocomplete',
        );
      }));
  });
  describe.concurrent('рендерит элементы items', () => {
    test('рендерит элементы items', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, defaultProps);

        expect(getItems(ctx).length).toEqual(items.length);
        items.forEach((item, index) => {
          expect(getItem(ctx, index).textContent).toBe(item.label);
        });
      }));
  });
  describe.concurrent('рендерит группы', () => {
    test('рендерит группы', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...defaultProps, groups });

        expect(getGroups(ctx).length).toEqual(groups.length);
        groups.forEach((item, index) => {
          expect(getGroup(ctx, index).textContent).toBe(item.label);
        });
      }));
  });
  describe.concurrent('проверка onChange', () => {
    test('проверка onChange', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onChange: onChangeMock,
          value: null,
        });
        fireEvent.click(getItem(ctx, 1));
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(items[1], {
          e: expect.any(Object),
        });
      }));
    test('проверка onChange при multiple', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onChange: onChangeMock,
          multiple: true,
          value: null,
        });
        fireEvent.click(getItem(ctx, 1));
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith([items[1]], {
          e: expect.any(Object),
        });
      }));
    test('проверка onChange при multiple и value', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onChange: onChangeMock,
          multiple: true,
          value: [items[1]],
        });
        fireEvent.click(getItem(ctx, 1));
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(null, {
          e: expect.any(Object),
        });
      }));
    test('проверка onChange при клике на FlatSelectItemAll', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onChange: onChangeMock,
          multiple: true,
          selectAll: true,
          value: null,
        });
        const allButton = getSelectAll(ctx);
        fireEvent.click(allButton);
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(items, {
          e: expect.any(Object),
        });
      }));
    test('проверка onChange при клике на FlatSelectItemAll и выбранными всеми элементами', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onChange: onChangeMock,
          multiple: true,
          selectAll: true,
          value: items,
        });
        const allButton = getSelectAll(ctx);
        fireEvent.click(allButton);
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(null, {
          e: expect.any(Object),
        });
      }));
  });
  describe.concurrent('проверка onFocus', () => {
    test('проверка onFocus', (ctx) =>
      context.start(async () => {
        const onFocusMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onFocus: onFocusMock,
        });
        fireEvent.focus(getRender(ctx));
        expect(onFocusMock).toHaveBeenCalled();
        expect(onFocusMock).toHaveBeenCalledTimes(1);
        expect(onFocusMock).toHaveBeenCalledWith(expect.any(Object));
      }));
  });
  describe.concurrent('проверка onBlur', () => {
    test('проверка onBlur', (ctx) =>
      context.start(async () => {
        const onBlurMock = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onBlur: onBlurMock,
        });
        fireEvent.blur(getRender(ctx));
        expect(onBlurMock).toHaveBeenCalled();
        expect(onBlurMock).toHaveBeenCalledTimes(1);
        expect(onBlurMock).toHaveBeenCalledWith(expect.any(Object));
      }));
  });
  describe.concurrent('проверка onOpen', () => {
    test('проверка вызова onOpen по клику на якорь', (ctx) =>
      context.start(async () => {
        const onOpenMock = vi.fn();
        const anchorRef = { current: null };
        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            anchorRef,
            onOpen: onOpenMock,
          });
        });
        anchorClick(ctx);

        expect(onOpenMock).toHaveBeenCalled();
      }));
  });
  describe.concurrent('проверка input', () => {
    test('проверка input', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
        });
        const input = getInput(ctx);
        expect(input).toBeInTheDocument();
      }));
    test('проверка input с placeholder', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          placeholder: 'placeholder',
        });
        const input = getInput(ctx);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'placeholder');
      }));
    test('проверка input с value', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          inputValue: 'value',
        });
        const input = getInput(ctx);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('value');
      }));
    test('проверка onInput', (ctx) =>
      context.start(async () => {
        const onInput = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          inputValue: 'value',
          onInput,
        });
        const input = getInput(ctx);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('value');
        fireEvent.change(input, { target: { value: 'value2' } });
        expect(onInput).toHaveBeenCalledWith('value2');
      }));
    test('проверка clearButton c value', (ctx) =>
      context.start(async () => {
        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            input: true,
            inputValue: 'value',
            clearButton: true,
          });
        });

        expect(getClearButton(ctx)).toBeInTheDocument();
      }));
    test('проверка clearButton без value', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          clearButton: true,
        });

        expect(getClearButton(ctx)).not.toBeInTheDocument();

        fireEvent.change(getInput(ctx), { target: { value: 'value' } });

        await wrap(tick());
        await wrap(tick());

        expect(getClearButton(ctx)).toBeInTheDocument();
      }));
  });
  describe.concurrent('проверка iconLeft', () => {
    test('иконка отображается', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          iconLeft: IconMock,
        });
        expect(getIcon(ctx)).toBeInTheDocument();
      }));
  });
  describe.concurrent('проверка view,', () => {
    views.map((view) => {
      test(`проверка view=${view}, input=true`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            ...defaultProps,
            view,
            input: true,
          });
          expect(getRender(ctx)).toHaveClass(cnFlatSelect({ view }));
        }));
    });
    views.map((view) => {
      test(`проверка view=${view}, input=false`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            ...defaultProps,
            view,
            input: false,
          });
          expect(getRender(ctx)).toHaveClass(cnFlatSelect({ view: 'clear' }));
        }));
    });
  });
  describe.concurrent('проверка size', () => {
    sizes.map((size) => {
      test(`проверка size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            ...defaultProps,
            size,
          });
          expect(getRender(ctx)).toHaveClass(cnFlatSelect({ size }));
        }));
    });
  });
  describe.concurrent('проверка bordered', () => {
    test('класс присваивается', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          bordered: true,
        });
        expect(getRender(ctx)).toHaveClass(cnFlatSelect({ bordered: true }));
      }));
    test('при bordered=true view должен быть clear', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          bordered: true,
        });
        expect(getRender(ctx)).toHaveClass(cnFlatSelect({ view: 'clear' }));
      }));
  });
  describe.concurrent('проверка forms', () => {
    forms.map((form) => {
      test(`form=${form}, bordered=true, класс присваивается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            ...defaultProps,
            form,
            bordered: true,
          });
          expect(getRender(ctx)).toHaveClass(cnFlatSelect({ form }));
        }));
    });
    forms.map((form) => {
      test(`form=${form}, bordered=false класс не присваивается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            ...defaultProps,
            form,
            bordered: false,
          });
          expect(getRender(ctx)).not.toHaveClass(cnFlatSelect({ form }));
        }));
    });
  });
  describe.concurrent('проверка onCreate', () => {
    test('onCreate отображается и вызывается', (ctx) =>
      context.start(async () => {
        const onCreate = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          onCreate,
        });
        const button = getCreateButton(ctx);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onCreate).toHaveBeenCalled();
      }));
  });
  describe.concurrent('проверка disabled', () => {
    test('FieldControlLayout получил свойство disabled', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          disabled: true,
        });
        expect(getFieldControlLayout(ctx)).toHaveClass(
          cnFieldControlLayout({ disabled: true }),
        );
      }));
    test('input получил свойство disabled', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          disabled: true,
        });
        expect(getInput(ctx)).toHaveAttribute('disabled', '');
      }));
    test('onCreate не вызывается', (ctx) =>
      context.start(async () => {
        const onCreate = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          disabled: true,
          onCreate,
        });
        const button = getCreateButton(ctx);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onCreate).not.toHaveBeenCalled();
      }));
    test('onChange не вызывается при клике на Item', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          disabled: true,
          onChange,
        });
        fireEvent.click(getItem(ctx));
        expect(onChange).not.toHaveBeenCalled();
      }));
    test('onChange не вызывается при клике на selectAll', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          ...defaultProps,
          input: true,
          disabled: true,
          multiple: true,
          selectAll: true,
          onChange,
        });
        fireEvent.click(getSelectAll(ctx));
        expect(onChange).not.toHaveBeenCalled();
      }));
  });
  describe.concurrent('проверка anchorRef', () => {
    test('проверка isOpen', (ctx) =>
      context.start(async () => {
        const anchorRef = { current: null };
        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            anchorRef,
            isOpen: true,
          });
        });
        await wrap(tick());

        expect(getRender(ctx)).toBeInTheDocument();
      }));
    test('проверка открытия списка по клику на якорь', (ctx) =>
      context.start(async () => {
        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            anchorRef: { current: null },
          });
        });
        await wrap(tick());

        anchorClick(ctx);

        await wrap(tick());
        await wrap(sleep(animationDuration));

        expect(getRender(ctx)).toBeInTheDocument();
      }));
    test('проверка закрытия списка по клику на якорь', (ctx) =>
      context.start(async () => {
        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            anchorRef: { current: null },
            isOpen: true,
          });
        });
        await wrap(tick());

        anchorClick(ctx);

        await wrap(tick());
        await wrap(sleep(animationDuration));
        expect(getRender(ctx)).not.toBeInTheDocument();
      }));
  });
});
