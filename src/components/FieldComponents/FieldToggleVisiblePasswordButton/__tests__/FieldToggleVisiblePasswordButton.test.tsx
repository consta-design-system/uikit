import { cnIcon } from '@consta/icons/Icon';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { getFieldIconSize } from '##/components/FieldComponents';
import { setRef } from '##/utils/setRef';

import { FieldToggleVisiblePasswordButton } from '..';

type Props = React.ComponentProps<typeof FieldToggleVisiblePasswordButton>;

const testId = 'FieldToggleVisiblePasswordButton';

const renderComponent = (props: Props = {}) => {
  return render(
    <FieldToggleVisiblePasswordButton data-testid={testId} {...props} />,
  );
};

const getRender = () => screen.getByTestId(testId);
const getAnimateIconBase = () =>
  getRender().querySelector(`.${cnIcon()}`) as HTMLSpanElement;
const getIcon = () => getAnimateIconBase().querySelector(`.${cnIcon()}`);

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

    describe('проверка active', () => {
      it(`при  active: false отображается иконка IconEye`, () => {
        renderComponent({ active: false });
        expect(getIcon()).toHaveClass('IconEye');
      });
      it(`при  active: true отображается иконка IconEyeClose`, () => {
        renderComponent({ active: true });
        expect(getIcon()).toHaveClass('IconEyeClose');
      });
    });

    describe('проверка size', () => {
      const sizes = ['s', 'm', 'l', 'xs'] as const;
      sizes.forEach((size) => {
        it(`У иконки класс ${cnIcon({
          size,
        })}`, () => {
          renderComponent({ size });

          expect(getAnimateIconBase()).toHaveClass(
            cnIcon({ size: getFieldIconSize(size) }),
          );
        });
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
