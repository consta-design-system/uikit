import { IconComponent } from '@consta/icons/Icon';
import { IconCamera } from '@consta/icons/IconCamera';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import {
  ChoiceGroup,
  choiceGroupForms,
  choiceGroupSizes,
  choiceGroupViews,
  cnChoiceGroup,
} from '../ChoiceGroupDeprecated';

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

const renderComponent = (props: {
  items?: Item[];
  size?: ChoiceGroupProps['size'];
  view?: ChoiceGroupProps['view'];
  form?: ChoiceGroupProps['form'];
  onlyIcon?: ChoiceGroupProps['onlyIcon'];
  onChange?: (props: {
    e: React.ChangeEvent<HTMLInputElement>;
    value: Item | null;
  }) => void;
  disabled?: boolean;
  getDisabled?: (item: Item) => boolean | undefined;
}) => {
  const { items = elements, ...otherProps } = props;
  const value = defaultValue;
  const handleChange = jest.fn();

  return render(
    <ChoiceGroup
      {...otherProps}
      items={items}
      value={value}
      multiple={false}
      onChange={props.onChange || handleChange}
      getLabel={(item) => `Name-${item.name}`}
      getIcon={(item) => item.icon}
      name={testId}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

const renderComponentMultiple = (props: {
  items?: Item[];
  size?: ChoiceGroupProps['size'];
  view?: ChoiceGroupProps['view'];
  form?: ChoiceGroupProps['form'];
  onlyIcon?: ChoiceGroupProps['onlyIcon'];
  onChange?: (props: {
    e: React.ChangeEvent<HTMLInputElement>;
    value: Item[] | null;
  }) => void;
  value?: Item[];
}) => {
  const { items = elements, ...otherProps } = props;
  const value = props.value || [defaultValue];
  const handleChange = jest.fn();

  return render(
    <ChoiceGroup
      {...otherProps}
      items={items}
      value={value}
      multiple
      onChange={props.onChange || handleChange}
      getLabel={(item) => `Name-${item.name}`}
      getIcon={(item) => item.icon}
      name={testId}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnChoiceGroup('Label')}`);
}

function getItem(index = 0) {
  return getItems()[index] as HTMLLabelElement;
}

function getInputs() {
  return getRender().querySelectorAll(
    `.${cnChoiceGroup('Input')}`,
  ) as NodeListOf<HTMLInputElement>;
}

function getInput(index = 0) {
  return getInputs()[index] as HTMLInputElement;
}

function getIcon(index = 0) {
  return getRender().querySelectorAll(`.${cnChoiceGroup('Icon')}`)[
    index
  ] as HTMLSpanElement;
}

describe('Компонент ChoiceGroup', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка items', () => {
      it(`количество совпадает с передоваемым`, () => {
        renderComponent({});
        const itemsRender = getItems();
        expect(itemsRender.length).toEqual(elements.length);
      });
    });
    describe('проверка value', () => {
      it(`выбранному элементу присвоился модификатор "_checked"`, () => {
        renderComponent({});
        expect(getItem()).toHaveClass(
          cnChoiceGroup('Label', { checked: true }),
        );
      });
    });
    describe('проверка getLabel', () => {
      it(`label у элемента верный`, () => {
        renderComponent({});
        expect(getItem().textContent).toEqual(`Name-${elements[0].name}`);
      });
    });
    describe('проверка getIcon', () => {
      it(`иконка отображается`, () => {
        renderComponent({});
        expect(getIcon()).toHaveClass('IconCamera');
      });
    });
    describe('проверка onlyIcon', () => {
      it(`текст не отображается`, () => {
        renderComponent({ onlyIcon: true });
        expect(getItem().textContent).toEqual('');
      });
      it(`присваивает класс`, () => {
        renderComponent({ onlyIcon: true });
        expect(getRender()).toHaveClass(cnChoiceGroup({ onlyIcon: true }));
      });
    });
    describe('проверка name', () => {
      it(`name у элемента верный`, () => {
        renderComponent({});
        expect(getInput().name).toEqual(testId);
      });
    });
    describe('проверка className', () => {
      it(`присвоился дополнительный класс`, () => {
        renderComponent({});
        expect(getRender()).toHaveClass(additionalClass);
      });
    });
    describe('проверка form', () => {
      choiceGroupForms.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });
          expect(getRender()).toHaveClass(cnChoiceGroup({ form }));
        });
      });
    });
    describe('проверка size', () => {
      choiceGroupSizes.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          expect(getRender()).toHaveClass(cnChoiceGroup({ size }));
        });
      });
    });
    describe('проверка view', () => {
      choiceGroupViews.forEach((view) => {
        it(`присваивает класс для size=${view}`, () => {
          renderComponent({ view });
          expect(getRender()).toHaveClass(cnChoiceGroup({ view }));
        });
      });
    });
    describe('проверка onChange при multiple=false', () => {
      it(`клик по невыбраному элементу, должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();
        const elementIndex = 1;

        renderComponent({ onChange: handleChange });

        const item = getItem(elementIndex);
        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: elements[elementIndex] }),
        );
      });
      it('клик по выбраному элементу, не должен вызвать callback', () => {
        const handleChange = jest.fn();

        renderComponent({ onChange: handleChange });

        const item = getItem(0);

        fireEvent.click(item);

        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    describe('проверка onChange при multiple=true', () => {
      it(`клик по невыбраному элементу, должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();
        const elementIndex = 1;

        renderComponentMultiple({ onChange: handleChange });

        const item = getItem(elementIndex);

        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            value: [defaultValue, elements[elementIndex]],
          }),
        );
      });
      it(`клик по выбраному элементу (всего выбран 1 элемент), должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();

        renderComponentMultiple({ onChange: handleChange });

        const item = getItem(0);

        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: null }),
        );
      });
      it(`клик по выбраному элементу (всего выбрано 2 элемента), должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();
        const elementIndex = 1;

        renderComponentMultiple({
          onChange: handleChange,
          value: [defaultValue, elements[1]],
        });

        const item = getItem(elementIndex);

        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: [defaultValue] }),
        );
      });
    });

    describe('проверка заблокированной группы элементов', () => {
      it(`группе присваивается класс ${cnChoiceGroup({
        disabled: true,
      })}`, () => {
        renderComponent({ disabled: true });
        expect(getRender()).toHaveClass(cnChoiceGroup({ disabled: true }));
      });

      it(`всем лайблам присваивается класс ${cnChoiceGroup('Label', {
        disabled: true,
      })}`, () => {
        renderComponent({ disabled: true });
        getItems().forEach((label) => {
          expect(label).toHaveClass(cnChoiceGroup('Label', { disabled: true }));
        });
      });

      it('всем инпутам присваивается disabled', () => {
        renderComponent({ disabled: true });
        getInputs().forEach((input) => {
          expect(input).toHaveAttribute('disabled');
        });
      });

      it('при клике по лейблу коллбэк не вызывается', () => {
        const handleChange = jest.fn();
        renderComponent({ disabled: true, onChange: handleChange });

        getItems().forEach((label) => {
          fireEvent.click(label);
        });
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    describe('проверка выборочных заблокированных элементов', () => {
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

      it(`disabled элементам присваивается класс ${cnChoiceGroup('Label', {
        disabled: true,
      })}`, () => {
        renderComponent({ items, getDisabled: (item) => item.disabled });
        items.forEach((el, i) => {
          if (el.disabled) {
            expect(getItem(i)).toHaveClass(
              cnChoiceGroup('Label', { disabled: true }),
            );
          } else {
            expect(getItem(i)).not.toHaveClass(
              cnChoiceGroup('Label', { disabled: true }),
            );
          }
        });
      });

      it('disabled элементы получают аттрибут disabled', () => {
        renderComponent({ items, getDisabled: (item) => item.disabled });
        items.forEach((el, i) => {
          if (el.disabled) {
            expect(getInput(i)).toHaveAttribute('disabled');
          } else {
            expect(getInput(i)).not.toHaveAttribute('disabled');
          }
        });
      });

      it('события обрабатываются только у разблокированных элементов', () => {
        const handleChange = jest.fn();
        renderComponent({
          items,
          getDisabled: (item) => item.disabled,
          onChange: handleChange,
        });
        getItems().forEach((label) => {
          fireEvent.click(label);
        });
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(
          items.filter((el) => !el.disabled).length,
        );
      });
    });
  });

  it(`на элементах есть миксин ${cnMixFocus()}`, () => {
    renderComponent({});
    const item = getItem();
    expect(item).toHaveClass(cnMixFocus());
  });
});
