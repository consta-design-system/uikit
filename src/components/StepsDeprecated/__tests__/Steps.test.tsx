import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnSteps, Steps } from '../StepsDeprecated';

type StepsProps = React.ComponentProps<typeof Steps>;
type Item = {
  label: string;
  disabled?: boolean;
};
type OnChange = (props: { e: React.MouseEvent; value: Item | null }) => void;

const testId = 'Steps';

const items: Item[] = [
  {
    label: 'один',
  },
  {
    label: 'два',
  },
  {
    label: 'три',
    disabled: true,
  },
];

const additionalClass = 'additionalClass';

const renderComponent = (props: {
  size?: StepsProps['size'];
  onChange?: OnChange;
}) => {
  const handleChange = jest.fn();

  return render(
    <Steps
      items={items}
      value={items[0]}
      getLabel={(item) => item.label}
      getDisabled={(item) => item.disabled || false}
      onChange={props.onChange || handleChange}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);

const getItems = () => getRender().querySelectorAll(`.${cnSteps('Item')}`);

describe('Компонент Steps', () => {
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
      it('лэйбл совпадает', () => {
        renderComponent({});
        expect(getItems()[0].textContent).toEqual(`1 ${items[0].label}`);
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

        const item = getItems()[1];
        fireEvent.click(item);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value: items[1] }),
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
