import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import {
  ChoiceGroup,
  choiceGroupForms,
  choiceGroupSizes,
  choiceGroupViews,
  cnChoiceGroup,
} from '../ChoiceGroup';

type ChoiceGroupProps = React.ComponentProps<typeof ChoiceGroup>;

const testId = cnChoiceGroup();

type Item = {
  name: string;
  icon: React.FC<IconProps>;
};

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
const defaultValue = items[0];

const renderComponent = (props: {
  size?: ChoiceGroupProps['size'];
  view?: ChoiceGroupProps['view'];
  form?: ChoiceGroupProps['form'];
  onlyIcon?: ChoiceGroupProps['onlyIcon'];
  onChange?: (props: { e: React.ChangeEvent<HTMLInputElement>; value: Item | null }) => void;
}) => {
  const value = defaultValue;
  const handleChange = jest.fn();

  return render(
    <>
      <ChoiceGroup
        {...props}
        items={items}
        value={value}
        multiple={false}
        onChange={props.onChange || handleChange}
        getLabel={(item) => `Name-${item.name}`}
        getIcon={(item) => item.icon}
        name={testId}
        className={additionalClass}
        data-testid={testId}
      />
    </>,
  );
};

const renderComponentMultiple = (props: {
  size?: ChoiceGroupProps['size'];
  view?: ChoiceGroupProps['view'];
  form?: ChoiceGroupProps['form'];
  onlyIcon?: ChoiceGroupProps['onlyIcon'];
  onChange?: (props: { e: React.ChangeEvent<HTMLInputElement>; value: Item[] | null }) => void;
  value?: Item[];
}) => {
  const value = props.value || [defaultValue];
  const handleChange = jest.fn();

  return render(
    <>
      <ChoiceGroup
        {...props}
        items={items}
        value={value}
        multiple
        onChange={props.onChange || handleChange}
        getLabel={(item) => `Name-${item.name}`}
        getIcon={(item) => item.icon}
        name={testId}
        className={additionalClass}
        data-testid={testId}
      />
    </>,
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

function getInput(index = 0) {
  return getRender().querySelectorAll(`.${cnChoiceGroup('Input')}`)[index] as HTMLInputElement;
}

function getIcon(index = 0) {
  return getRender().querySelectorAll(`.${cnChoiceGroup('Icon')}`)[index] as HTMLSpanElement;
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
        expect(itemsRender.length).toEqual(items.length);
      });
    });
    describe('проверка value', () => {
      it(`выбранному элементу присвоился модификатор "_checked"`, () => {
        renderComponent({});
        expect(getItem()).toHaveClass(cnChoiceGroup('Label', { checked: true }));
      });
    });
    describe('проверка getLabel', () => {
      it(`label у элемента верный`, () => {
        renderComponent({});
        expect(getItem().textContent).toEqual(`Name-${items[0].name}`);
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
          expect.objectContaining({ value: items[elementIndex] }),
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
          expect.objectContaining({ value: [defaultValue, items[elementIndex]] }),
        );
      });
      it(`клик по выбраному элементу (всего выбран 1 элемент), должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();

        renderComponentMultiple({ onChange: handleChange });

        const item = getItem(0);

        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: null }));
      });
      it(`клик по выбраному элементу (всего выбрано 2 элемента), должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();
        const elementIndex = 1;

        renderComponentMultiple({ onChange: handleChange, value: [defaultValue, items[1]] });

        const item = getItem(elementIndex);

        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: [defaultValue] }),
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
