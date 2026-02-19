import { render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import { defaultConfig } from '../config';
import { File } from '../FileCanary';
import { cnFileCanaryBase } from '../FileCanaryBase/FileCanaryBase';

jest.mock('##/components/Theme', () => ({
  useTheme: () => ({
    themeClassNames: {
      color: { accent: 'mock-theme-accent' },
    },
  }),
}));

const testId = 'default-file';

const renderComponent = (props: React.ComponentProps<typeof File>) => {
  return render(<File data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент File', () => {
  describe('проверка props', () => {
    describe('проверка extensions', () => {
      Object.entries(defaultConfig).forEach(([ext, config]) => {
        it(`для .${ext} использует правильный цвет`, () => {
          renderComponent({ extension: ext });

          expect(getRender()).toHaveStyle(`background-color: ${config.color}`);
          const extensionElement = getRender().querySelector(
            `.${cnFileCanaryBase('Extension')}`,
          );
          expect(extensionElement).toBeInTheDocument();
          expect(extensionElement).toHaveTextContent(ext);
        });
      });
    });

    it('передаёт пропс size в FileBase', () => {
      renderComponent({ extension: 'pdf', size: 's' });
      expect(getRender()).toHaveClass(cnFileCanaryBase({ size: 's' }));
    });

    it('передаёт пропс className в FileBase', () => {
      renderComponent({ extension: 'doc', className: 'extra-class' });
      expect(getRender()).toHaveClass('extra-class');
    });

    it('применяет класс темы', () => {
      renderComponent({ extension: 'pdf' });
      expect(getRender()).toHaveClass('mock-theme-accent');
    });
  });

  describe('проверка полиморфизма as и ref', () => {
    const extension = 'doc';
    it('рендерится с тегом по умолчанию (div)', () => {
      renderComponent({ extension });
      expect(getRender().tagName).toBe('DIV');
    });

    it('рендерится с переданным тегом (span)', () => {
      renderComponent({ as: 'span', extension });
      expect(getRender().tagName).toBe('SPAN');
    });

    it('рендерится с тегом a и принимает атрибут href', () => {
      renderComponent({ as: 'a', href: 'https://example.com', extension });
      expect(getRender().tagName).toBe('A');
      expect(getRender()).toHaveAttribute('href', 'https://example.com');
    });

    it('переданный ref указывает на DOM-элемент', () => {
      const ref = createRef<HTMLElement>();
      renderComponent({ ref, extension });
      expect(ref.current).toBe(getRender());
    });
  });

  it('использует специальный конфиг для неизвестного расширения', () => {
    renderComponent({ extension: 'xyz' });
    expect(getRender()).toHaveStyle(
      'background-color: var(--file-color-unknown)',
    );
    expect(document.querySelector('.IconFileUnknown')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
  });
});
