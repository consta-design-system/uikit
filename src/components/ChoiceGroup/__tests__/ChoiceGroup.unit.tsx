import { IconComponent } from '@consta/icons/Icon';
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

import {
  ChoiceGroup,
  choiceGroupForms,
  choiceGroupSizes,
  choiceGroupViews,
  cnChoiceGroup,
} from '../ChoiceGroup';

createRoot();
clearStack();

type ChoiceGroupProps = React.ComponentProps<typeof ChoiceGroup>;

const testId = cnChoiceGroup();

type Item = {
  name: string;
  icon: IconComponent;
  disabled?: boolean;
};

const elements: Item[] = [
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
const defaultValue = elements[0];

const renderComponent = (
  ctx: TestContext,
  props: {
    items?: Item[];
    size?: ChoiceGroupProps['size'];
    view?: ChoiceGroupProps['view'];
    form?: ChoiceGroupProps['form'];
    onlyIcon?: ChoiceGroupProps['onlyIcon'];
    onChange?: (
      value: Item | null,
      props: {
        e: React.ChangeEvent<HTMLInputElement>;
      },
    ) => void;
    disabled?: boolean;
    getItemDisabled?: (item: Item) => boolean | undefined;
  },
) => {
  const { items = elements, ...otherProps } = props;
  const value = defaultValue;
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ChoiceGroup
            {...otherProps}
            items={items}
            value={value}
            multiple={false}
            onChange={props.onChange}
            getItemLabel={(item) => `Name-${item.name}`}
            getItemIcon={(item) => item.icon}
            name={testId}
            className={additionalClass}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const renderComponentMultiple = (
  ctx: TestContext,
  props: {
    items?: Item[];
    size?: ChoiceGroupProps['size'];
    view?: ChoiceGroupProps['view'];
    form?: ChoiceGroupProps['form'];
    onlyIcon?: ChoiceGroupProps['onlyIcon'];
    onChange?: (
      value: Item[] | null,
      props: {
        e: React.ChangeEvent<HTMLInputElement>;
      },
    ) => void;
    value?: Item[];
  },
) => {
  const { items = elements, ...otherProps } = props;
  const value = props.value || [defaultValue];
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ChoiceGroup
            {...otherProps}
            items={items}
            value={value}
            multiple
            onChange={props.onChange}
            getItemLabel={(item) => `Name-${item.name}`}
            getItemIcon={(item) => item.icon}
            name={testId}
            className={additionalClass}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
};

const getItems = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnChoiceGroup('Label')}`);
};

const getItem = (ctx: TestContext, index = 0) => {
  const items = getItems(ctx);
  return items[index] as HTMLLabelElement;
};

const getInputs = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(
    `.${cnChoiceGroup('Input')}`,
  ) as NodeListOf<HTMLInputElement>;
};

const getInput = (ctx: TestContext, index = 0) => {
  const inputs = getInputs(ctx);
  return inputs[index] as HTMLInputElement;
};

const getIcon = (ctx: TestContext, index = 0) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnChoiceGroup('Icon')}`)[
    index
  ] as HTMLSpanElement;
};

describe.concurrent('Компонент ChoiceGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка items', () => {
      test(`количество совпадает с передаваемым`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          const itemsRender = getItems(ctx);
          expect(itemsRender.length).toEqual(elements.length);
        }));
    });

    describe.concurrent('проверка value', () => {
      test(`выбранному элементу присвоился модификатор "_checked"`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getItem(ctx)).toHaveClass(
            cnChoiceGroup('Label', { checked: true }),
          );
        }));
    });

    describe.concurrent('проверка getItemLabel', () => {
      test(`label у элемента верный`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getItem(ctx).textContent).toEqual(`Name-${elements[0].name}`);
        }));
    });

    describe.concurrent('проверка getItemIcon', () => {
      test(`иконка отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getIcon(ctx)).toHaveClass('IconCamera');
        }));
    });

    describe.concurrent('проверка onlyIcon', () => {
      test(`текст не отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onlyIcon: true });
          await wrap(tick());
          expect(getItem(ctx).textContent).toEqual('');
        }));

      test(`присваивает класс`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onlyIcon: true });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnChoiceGroup({ onlyIcon: true }));
        }));
    });

    describe.concurrent('проверка name', () => {
      test(`name у элемента верный`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getInput(ctx).name).toEqual(testId);
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

    describe.concurrent('проверка form', () => {
      choiceGroupForms.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });
            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnChoiceGroup({ form }));
          }));
      });
    });

    describe.concurrent('проверка size', () => {
      choiceGroupSizes.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnChoiceGroup({ size }));
          }));
      });
    });

    describe.concurrent('проверка view', () => {
      choiceGroupViews.forEach((view) => {
        test(`присваивает класс для size=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { view });
            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnChoiceGroup({ view }));
          }));
      });
    });

    describe.concurrent('проверка onChange при multiple=false', () => {
      test(`клик по невыбранному элементу, должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const elementIndex = 1;

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItem(ctx, elementIndex);
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(elements[elementIndex], {
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

    describe.concurrent('проверка onChange при multiple=true', () => {
      test(`клик по невыбранному элементу, должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const elementIndex = 1;

          renderComponentMultiple(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItem(ctx, elementIndex);

          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(
            [defaultValue, elements[elementIndex]],
            {
              e: expect.any(Object),
            },
          );
        }));

      test(`клик по выбранному элементу (всего выбран 1 элемент), должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponentMultiple(ctx, { onChange: handleChange });
          await wrap(tick());

          const item = getItem(ctx, 0);

          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(null, {
            e: expect.any(Object),
          });
        }));

      test(`клик по выбранному элементу (всего выбрано 2 элемента), должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const elementIndex = 1;

          renderComponentMultiple(ctx, {
            onChange: handleChange,
            value: [defaultValue, elements[1]],
          });
          await wrap(tick());

          const item = getItem(ctx, elementIndex);

          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith([defaultValue], {
            e: expect.any(Object),
          });
        }));
    });

    describe.concurrent('проверка заблокированной группы элементов', () => {
      test(`группе присваивается класс ${cnChoiceGroup({
        disabled: true,
      })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { disabled: true });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnChoiceGroup({ disabled: true }));
        }));

      test(`всем лейблам присваивается класс ${cnChoiceGroup('Label', {
        disabled: true,
      })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { disabled: true });
          await wrap(tick());
          getItems(ctx).forEach((label) => {
            expect(label).toHaveClass(
              cnChoiceGroup('Label', { disabled: true }),
            );
          });
        }));

      test('всем полям присваивается disabled', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { disabled: true });
          await wrap(tick());
          getInputs(ctx).forEach((input) => {
            expect(input).toHaveAttribute('disabled');
          });
        }));

      test('при клике по лейблу колбэк не вызывается', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          renderComponent(ctx, { disabled: true, onChange: handleChange });
          await wrap(tick());

          getItems(ctx).forEach((label) => {
            fireEvent.click(label);
          });
          expect(handleChange).not.toHaveBeenCalled();
        }));
    });

    describe.concurrent('проверка выборочных заблокированных элементов', () => {
      const items = [
        {
          name: 'один',
          icon: IconCamera,
          disabled: true,
        },
        {
          name: 'два',
          icon: IconCamera,
          disabled: true,
        },
        {
          name: 'три',
          icon: IconCamera,
        },
      ];

      test(`disabled элементам присваивается класс ${cnChoiceGroup('Label', {
        disabled: true,
      })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items,
            getItemDisabled: (item) => item.disabled,
          });
          await wrap(tick());
          items.forEach((el, i) => {
            if (el.disabled) {
              expect(getItem(ctx, i)).toHaveClass(
                cnChoiceGroup('Label', { disabled: true }),
              );
            } else {
              expect(getItem(ctx, i)).not.toHaveClass(
                cnChoiceGroup('Label', { disabled: true }),
              );
            }
          });
        }));

      test('disabled элементы получают аттрибут disabled', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items,
            getItemDisabled: (item) => item.disabled,
          });
          await wrap(tick());
          items.forEach((el, i) => {
            if (el.disabled) {
              expect(getInput(ctx, i)).toHaveAttribute('disabled');
            } else {
              expect(getInput(ctx, i)).not.toHaveAttribute('disabled');
            }
          });
        }));

      test('события обрабатываются только у разблокированных элементов', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          renderComponent(ctx, {
            items,
            getItemDisabled: (item) => item.disabled,
            onChange: handleChange,
          });
          await wrap(tick());
          getItems(ctx).forEach((label) => {
            fireEvent.click(label);
          });
          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(
            items.filter((el) => !el.disabled).length,
          );
        }));
    });
    test(`на элементах есть миксин ${cnMixFocus()}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());
        const item = getItem(ctx);
        expect(item).toHaveClass(cnMixFocus());
      }));
  });
});
