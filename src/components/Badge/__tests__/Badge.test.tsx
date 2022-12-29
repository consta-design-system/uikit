import { IconCamera } from '@consta/icons/IconCamera';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  Badge,
  badgePropForm,
  badgePropSize,
  badgePropStatus,
  badgePropView,
  cnBadge,
} from '../Badge';

type BadgeProps = React.ComponentProps<typeof Badge>;

const testId = cnBadge();

function getRender() {
  return screen.getByTestId(testId);
}

function getIcon() {
  return getRender().querySelector(`.${cnBadge('Icon')}`);
}

const renderComponent = (props: BadgeProps) => {
  return render(<Badge data-testid={testId} {...props} />);
};

describe('Компонент Badge', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка size', () => {
      badgePropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          expect(getRender()).toHaveClass(cnBadge({ size }));
        });
      });
    });
    describe('проверка form', () => {
      badgePropForm.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });

          expect(getRender()).toHaveClass(cnBadge({ form }));
        });
      });
    });
    describe('проверка status', () => {
      badgePropStatus.forEach((status) => {
        it(`присваивает класс для status=${status}`, () => {
          renderComponent({ status });

          expect(getRender()).toHaveClass(cnBadge({ status }));
        });
      });
    });
    describe('проверка view', () => {
      badgePropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          expect(getRender()).toHaveClass(cnBadge({ view }));
        });
      });
    });
    describe('проверка label', () => {
      it(`текст отображается`, () => {
        const label = 'label';

        renderComponent({ label });

        expect(getRender().textContent).toEqual(label);
      });
    });
    describe('проверка icon', () => {
      it(`иконка отображается`, () => {
        renderComponent({ icon: IconCamera });

        expect(getIcon()).toHaveClass('IconCamera');
      });
    });
    describe('проверка minified', () => {
      it(`модификатор применяется`, () => {
        renderComponent({ minified: true });

        expect(getRender()).toHaveClass(cnBadge({ minified: true }));
      });
      it(`label используется как title`, () => {
        const label = 'label';
        renderComponent({ minified: true, label });

        expect(getRender().title).toEqual(label);
      });
      it(`нет дочерних элементов и не отображается label`, () => {
        renderComponent({ minified: true, label: 'label', icon: IconCamera });

        expect(getRender()).toBeEmptyDOMElement();
      });
    });
  });
});
