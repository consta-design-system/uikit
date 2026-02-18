import { render, screen } from '@testing-library/react';
import * as React from 'react';

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

  it('использует специальный конфиг для неизвестного расширения', () => {
    renderComponent({ extension: 'xyz' });
    expect(getRender()).toHaveStyle(
      'background-color: var(--file-color-unknown)',
    );
    expect(document.querySelector('.IconFileUnknown')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
  });

  it('передаёт пропс size в FileBase', () => {
    renderComponent({ extension: 'pdf', size: 's' });
    expect(getRender()).toHaveClass(cnFileCanaryBase({ size: 's' }));
  });

  it('применяет класс темы', () => {
    renderComponent({ extension: 'pdf' });
    expect(getRender()).toHaveClass('mock-theme-accent');
  });
});
