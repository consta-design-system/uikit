import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { setRef } from '##/utils/setRef';

import { cnFieldButtonStyleReset } from '../../FieldButtonStyleReset';
import { FieldButton } from '..';

type Props = React.ComponentProps<typeof FieldButton>;

const testId = 'FieldButton';

const renderComponent = ({
  children = undefined,
  ...props
}: Omit<Props, 'children'> & {
  children?: React.ReactNode;
} = {}) => {
  return render(
    <FieldButton {...props} data-testid={testId}>
      {children}
    </FieldButton>,
  );
};

const getRender = () => screen.getByTestId(testId) as HTMLButtonElement;

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

  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({ className, children: undefined });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка children', () => {
    it(`Пробрасывается children`, () => {
      const children = 'children';

      renderComponent({ children });

      expect(getRender()).toHaveTextContent(children);
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

  describe('проверка type', () => {
    it('Кнопка имеет type="button"', () => {
      renderComponent();
      expect(getRender()).toHaveAttribute('type', 'button');
    });
  });

  describe('проверка cnFieldButtonStyleReset и cnMixHitSlop', () => {
    it('cnFieldButtonStyleReset применяется', () => {
      renderComponent();
      expect(getRender().className).toContain(cnFieldButtonStyleReset());
    });

    it('cnMixHitSlop применяется с mode="reverseMargin"', () => {
      renderComponent();
      expect(getRender().className).toContain(
        cnMixHitSlop({ mode: 'reverseMargin' }),
      );
    });
  });
});
