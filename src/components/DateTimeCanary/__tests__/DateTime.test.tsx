import * as React from 'react';
import { render } from '@testing-library/react';
import faIRLocale from 'date-fns/locale/fa-IR';

import { DateTime, dateTimePropType, dateTimePropView } from '../DateTimeCanary';

import { getDateTimeLabel, getDayItems, getRender, testId } from './helpers';

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

          renderComponent({ className });
          expect(getRender()).toHaveClass(className);
        });
      });
    });
  });

  describe('проверка ref', () => {
    it('добавление аттрибута с помощью ref', () => {
      const refAttrName = 'data-test-ref';
      const refAttrValue = 'test-ref';
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      renderComponent({ ref });
      if (ref.current) {
        ref.current.setAttribute(refAttrName, refAttrValue);
      }
      expect(getRender()).toHaveAttribute(refAttrName, refAttrValue);
    });
  });

  it('minDate и maxDate отображается верно', () => {
    renderComponent({
      value: new Date(2022, 5, 27, 11),
      minDate: new Date(2022, 5, 3),
      maxDate: new Date(2022, 5, 29),
      currentVisibleDate: new Date(2022, 5),
    });

    const minDate = getDayItems()[3];
    const nextDate = getDayItems()[4];

    expect(minDate).toHaveClass('DateTimeItem_disabled');
    expect(nextDate).not.toHaveClass('DateTimeItem_disabled');

    const maxDate = getDayItems()[31];
    const prevDate = getDayItems()[30];

    expect(maxDate).toHaveClass('DateTimeItem_disabled');
    expect(prevDate).not.toHaveClass('DateTimeItem_disabled');
  });

  it('проверка применения locale = en-US', () => {
    renderComponent({
      locale: faIRLocale,
      value: new Date(2022, 5, 27, 11),
      currentVisibleDate: new Date(2022, 5),
    });

    const label = getDateTimeLabel();

    expect(label).toHaveTextContent('جون 2022');
  });
});
