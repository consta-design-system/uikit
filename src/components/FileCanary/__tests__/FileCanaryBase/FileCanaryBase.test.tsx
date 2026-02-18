import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cn } from '##/utils/bem';

import {
  cnFileCanaryBase,
  FileBase,
} from '../../FileCanaryBase/FileCanaryBase';
import { filePropSize } from '../../types';

const cnIconFile = cn('TestIcon');
const iconTestID = 'test-icon';
const TestIcon = () => (
  <div data-testid={iconTestID} className={cnIconFile()} />
);

const defaultProps = {
  size: 'm' as const,
  extension: 'txt',
  icon: TestIcon,
  color: 'red',
};
const testId = cnFileCanaryBase();
const renderComponent = (
  props: Partial<React.ComponentProps<typeof FileBase>> = {},
) => {
  return render(<FileBase data-testid={testId} {...defaultProps} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент FileBase', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      filePropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          expect(getRender()).toHaveClass(cnFileCanaryBase({ size }));
        });
      });
    });

    describe('проверка extension', () => {
      it('не пустой extension', () => {
        const extension = 'pdf';
        renderComponent({ extension });
        const extensionElement = getRender().querySelector(
          `.${cnFileCanaryBase('Extension')}`,
        );
        expect(extensionElement).toBeInTheDocument();
        expect(extensionElement).toHaveTextContent(extension);
      });

      it('пустой extension', () => {
        const extension = '';
        renderComponent({ extension });
        const extensionElement = getRender().querySelector(
          `.${cnFileCanaryBase('Extension')}`,
        );
        expect(extensionElement).toBeInTheDocument();
        expect(extensionElement).toHaveTextContent(extension);
      });
    });

    it('проверка icon', () => {
      renderComponent();
      expect(screen.getByTestId(iconTestID)).toBeInTheDocument();
      expect(screen.getByTestId(iconTestID).parentElement).toHaveClass(
        cnFileCanaryBase('IconContainer'),
      );
    });

    it('проверка color', () => {
      const color = 'var(--test-color)';
      renderComponent({ color });
      expect(getRender()).toHaveStyle(`background-color: ${color}`);
    });

    it('проверка className', () => {
      const customClass = 'custom-class';
      renderComponent({ className: customClass });
      expect(getRender()).toHaveClass(customClass);
    });
  });
});
