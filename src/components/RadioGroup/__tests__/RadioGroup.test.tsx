import React from 'react';
import { render, screen } from '@testing-library/react';

import { RadioGroup } from '../RadioGroup';

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;
type Item = {
  name: string;
};
type OnChange = (props: { e: React.ChangeEvent<HTMLInputElement>; value: Item | null }) => void;

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
      onChange={props.onChange || handleChange}
      name={testId}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);

const getItems = () => getRender().querySelectorAll('.Radio');

const getItemInput = () => getRender().querySelectorAll('.Radio-Input')[0] as HTMLInputElement;

describe('Компонент RadioGroup', () => {
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
  });
});
