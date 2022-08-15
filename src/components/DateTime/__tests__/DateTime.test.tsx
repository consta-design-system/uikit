import { render } from '@testing-library/react';
import * as React from 'react';

import { DateTime, dateTimePropType, dateTimePropView } from '../DateTime';
import { getRender, testId } from './helpers';

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const renderComponent = (props: DateTimeProps = {}) => {
  return render(<DateTime {...props} data-testid={testId} />);
};

describe('Компонент DateTime', () => {
  describe('рендериться без ошибок', () => {
    it('должен рендериться без ошибок', () => {
      expect(renderComponent).not.toThrow();
    });

    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        it(`должен рендериться без ошибок при type="${type}" view="${view}"`, () => {
          expect(() => renderComponent({ type, view })).not.toThrow();
        });
      });
    });
  });

  describe('проверка className', () => {
    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        it(`className присваевается при type="${type}" view="${view}"`, () => {
          const className = 'className';

          renderComponent({ className, type, view });
          expect(getRender()).toHaveClass(className);
        });
      });
    });
  });

  describe('проверка ref', () => {
    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        it(`добавление аттрибута с помощью ref при type="${type}" view="${view}"`, () => {
          const refAttrName = 'data-test-ref';
          const refAttrValue = 'test-ref';
          const ref = { current: null } as React.RefObject<HTMLDivElement>;
          renderComponent({ type, view, ref });
          if (ref.current) {
            ref.current.setAttribute(refAttrName, refAttrValue);
          }
          expect(getRender()).toHaveAttribute(refAttrName, refAttrValue);
        });
      });
    });
  });
});
