import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnRadioGroup, RadioGroup } from '../RadioGroupDeprecated';

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;
type Item = {
  name: string;
  disabled?: boolean;
};
type OnChange = (props: {
  e: React.ChangeEvent<HTMLInputElement>;
  value: Item;
}) => void;

const testId = 'RadioGroup';

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

const renderComponent = (props: {
  direction?: RadioGroupProps['direction'];
  size?: RadioGroupProps['size'];
  view?: RadioGroupProps['view'];
  onChange?: OnChange;
}) => {
  const handleChange = jest.fn();

  return render(
    <RadioGroup
      items={items}
      getLabel={(item) => `${item.name}`}
      getDisabled={(item) => item.disabled}
      onChange={props.onChange || handleChange}
      name={testId}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);

const getItems = () => getRender().querySelectorAll(`.${cnRadioGroup('Item')}`);

const getItemInput = () =>
  getRender().querySelectorAll('.Radio-Input')[0] as HTMLInputElement;

describe('Компонент RadioGroupDeprecated', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка items', () => {
      it('количество совпадает с передаваемым', () => {
        renderComponent({});
        const itemsRender = getItems();
        expect(itemsRender.length).toEqual(items.length);
      });
    });

    describe('проверка getLabel', () => {
      it('label совпадает', () => {
        renderComponent({});
        expect(getItems()[0].textContent).toEqual(items[0].name);
      });
    });

    describe('проверка name', () => {
      it(`name у элемента верный`, () => {
        renderComponent({});
        expect(getItemInput().name).toEqual(testId);
      });
    });

    describe('проверка className', () => {
      it(`присвоился дополнительный класс`, () => {
        renderComponent({});
        expect(getRender()).toHaveClass(additionalClass);
      });
    });

    describe('проверка onChange', () => {
      it(`клик по элементу должен вызвать callback`, () => {
        const handleChange = jest.fn();

        renderComponent({ onChange: handleChange });

        const item = getItems()[0];
        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: items[0] }),
        );
      });
    });

    describe('проверка getDisabled', () => {
      it(`клик по disabled элементу не должен вызывать handleChange`, () => {
        const handleChange = jest.fn();

        renderComponent({ onChange: handleChange });

        const item = getItems()[2];
        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalledTimes(0);
      });
    });
  });
});
