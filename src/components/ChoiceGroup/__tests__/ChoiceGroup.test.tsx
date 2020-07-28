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

const handleChange = jest.fn();

const renderComponent = (props: {
  size?: ChoiceGroupProps['size'];
  view?: ChoiceGroupProps['view'];
  form?: ChoiceGroupProps['form'];
  onlyIcon?: ChoiceGroupProps['onlyIcon'];
}) => {
  const value = items[0];

  return render(
    <>
      <ChoiceGroup
        {...props}
        items={items}
        value={value}
        multiple={false}
        onChange={handleChange}
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
    expect(renderComponent).not.toThrow();
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
        const item = getItem();
        expect(item).toHaveClass(cnChoiceGroup('Label', { checked: true }));
      });
    });
    describe('проверка getLabel', () => {
      it(`label у элемента верный`, () => {
        renderComponent({});
        const item = getItem();
        expect(item.textContent).toEqual(`Name-${items[0].name}`);
      });
    });
    describe('проверка getIcon', () => {
      it(`иконка отображается`, () => {
        renderComponent({});
        const icon = getIcon();
        expect(icon).toHaveClass('IconCamera');
      });
    });
    describe('проверка onlyIcon', () => {
      it(`текст не отображается`, () => {
        renderComponent({ onlyIcon: true });
        const item = getItem();
        expect(item.textContent).toEqual('');
      });
      it(`присваивает класс`, () => {
        renderComponent({ onlyIcon: true });
        const choiceGroup = screen.getByTestId(testId);
        expect(choiceGroup).toHaveClass(cnChoiceGroup({ onlyIcon: true }));
      });
    });
    describe('проверка name', () => {
      it(`name у элемента верный`, () => {
        renderComponent({});
        const input = getInput();
        expect(input.name).toEqual(testId);
      });
    });
    describe('проверка className', () => {
      it(`присвоился дополнительный класс`, () => {
        renderComponent({});
        const choiceGroup = getRender();
        expect(choiceGroup).toHaveClass(additionalClass);
      });
    });
    describe('проверка form', () => {
      choiceGroupForms.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });
          const choiceGroup = getRender();
          expect(choiceGroup).toHaveClass(cnChoiceGroup({ form }));
        });
      });
    });
    describe('проверка size', () => {
      choiceGroupSizes.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          const choiceGroup = getRender();
          expect(choiceGroup).toHaveClass(cnChoiceGroup({ size }));
        });
      });
    });
    describe('проверка view', () => {
      choiceGroupViews.forEach((view) => {
        it(`присваивает класс для size=${view}`, () => {
          renderComponent({ view });
          const choiceGroup = getRender();
          expect(choiceGroup).toHaveClass(cnChoiceGroup({ view }));
        });
      });
    });
    describe('проверка onChange', () => {
      renderComponent({});
      const item = getItem(1);
      fireEvent.click(item);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
  it(`на элементах есть миксин ${cnMixFocus()}`, () => {
    renderComponent({});
    const item = getItem();
    expect(item).toHaveClass(cnMixFocus({ before: true }));
  });
});
