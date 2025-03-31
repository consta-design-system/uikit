import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { setRef } from '##/utils/setRef';

import { FieldClearButton } from '..';

type FieldCaptionProps = React.ComponentProps<typeof FieldClearButton>;

const testId = 'FieldClearButton';

const renderComponent = (props: FieldCaptionProps = {}) => {
  return render(<FieldClearButton data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

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

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
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

describe('проверка IconClear', () => {
  it('Иконка рендерится', () => {
    renderComponent();
    expect(getRender().querySelector('svg')).toBeInTheDocument();
  });
});
