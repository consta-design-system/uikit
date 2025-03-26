import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnTagBase } from '##/components/TagBase';
import { setRef } from '##/utils/setRef';

import { cnFieldArrayValueItem, FieldArrayValueItem } from '..';

type Props = React.ComponentProps<typeof FieldArrayValueItem>;

export type PropsWithDefault<Object extends {}, Key extends keyof Object> = {
  [Property in Key]?: Object[Property];
};

const testId = 'FieldArrayValueItem';

const renderComponent = ({
  label = 'Item',
  size = 'm',
  ...props
}: PropsWithDefault<Props, keyof Props> = {}) => {
  return render(
    <FieldArrayValueItem
      {...props}
      label={label}
      data-testid={testId}
      size={size}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);
const getRemoveButton = () =>
  getRender().querySelector(`.${cnTagBase('CancelButton')}`);

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Присваивается дополнительный className`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка label', () => {
      it(`Пробрасывается children`, () => {
        const label = 'label';

        renderComponent({ label });

        expect(getRender()).toHaveTextContent(label);
      });
    });
    describe('проверка size', () => {
      const sizes = ['s', 'm', 'l', 'xs'] as const;
      sizes.forEach((size) => {
        it(`Должен рендериться как <${cnTagBase({
          size,
        })}>`, () => {
          renderComponent({ size });

          const component = screen.getByTestId(testId);

          expect(component).toHaveClass(cnTagBase({ size }));
        });
      });
    });
    describe('проверка disabled', () => {
      it(`Должен рендериться как <${cnFieldArrayValueItem({
        disabled: true,
      })}>`, () => {
        renderComponent({ disabled: true });
        expect(getRender()).toHaveClass(
          cnFieldArrayValueItem({
            disabled: true,
          }),
        );
      });
    });
    describe('проверка onRemove', () => {
      it(`отрабатывает onRemove`, () => {
        const handleClick = jest.fn();

        renderComponent({ onRemove: handleClick });

        const button = getRemoveButton() as HTMLElement;

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка other props', () => {
      const props = ['data-attr', 'role', 'id'] as const;

      props.forEach((prop) => {
        it(`присваивается  ${prop}=${prop}`, () => {
          renderComponent({ [prop]: prop });

          expect(getRender()).toHaveAttribute(prop, prop);
        });
      });
    });
  });
});
