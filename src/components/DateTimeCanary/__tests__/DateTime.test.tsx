import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { DateTime, dateTimePropType, dateTimePropView } from '../DateTimeCanary';

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const testId = 'DateTime';

const getRender = () => screen.getByTestId(testId);
const getAdditionalControls = () => getRender().querySelector(`.DateTimeAdditionalControls`);

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

          renderComponent({ className });
          expect(getRender()).toHaveClass(className);
        });
      });
    });
  });

  describe('проверка renderAdditionalControls', () => {
    const content = 'renderAdditionalControls';

    const renderAdditionalControls = {
      node: <div>{content}</div>,
      function: () => <div>{content}</div>,
    };

    Object.keys(renderAdditionalControls).forEach((renderType) => {
      dateTimePropType.forEach((type) => {
        dateTimePropView.forEach((view) => {
          it(`рендер при renderAdditionalControls="${renderType}" type="${type}" view="${view}"`, () => {
            renderComponent({
              renderAdditionalControls:
                renderAdditionalControls[renderType as keyof typeof renderAdditionalControls],
            });
            expect(getAdditionalControls()).toHaveTextContent(content);
          });
        });
      });
    });
  });
});
