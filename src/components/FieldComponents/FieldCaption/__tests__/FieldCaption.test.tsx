import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnText } from '##/components/Text';
import { setRef } from '##/utils/setRef';

import { fieldPropStatus } from '../../__mocks__/variants';
import { FieldCaption } from '..';

type FieldCaptionProps = React.ComponentProps<typeof FieldCaption>;

const testId = 'FieldCaption';

const renderComponent = (props: FieldCaptionProps = {}) => {
  return render(<FieldCaption data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    // const ref = useRef(null);

    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el: HTMLElement) => setRef(ref, el),
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
    describe('проверка children', () => {
      it(`Пробрасывается children`, () => {
        const children = 'children';

        renderComponent({ children });

        expect(getRender()).toHaveTextContent(children);
      });
    });

    describe('проверка status', () => {
      const tags = [...fieldPropStatus, undefined] as const;
      tags.forEach((status) => {
        it(`Должен рендериться как <${cnText({
          view: status || 'ghost',
        })}>`, () => {
          renderComponent({ status });

          const component = screen.getByTestId(testId);

          expect(component).toHaveClass(cnText({ view: status || 'ghost' }));
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

    describe('проверка Text props', () => {
      it('Присваивается size="xs"', () => {
        renderComponent();
        expect(getRender()).toHaveClass(cnText({ size: 'xs' }));
      });

      it('Присваивается lineHeight="m"', () => {
        renderComponent();
        expect(getRender()).toHaveClass(cnText({ lineHeight: 'm' }));
      });
    });
  });
});
