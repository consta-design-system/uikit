import { render, screen } from '@testing-library/react';
import React from 'react';

import { cnFileCanaryBase } from '../FileCanaryBase/FileCanaryBase';
import { fileGenerator } from '../fileCanaryGenerator';
import { FileConfig } from '../types';

const iconDocTestId = 'icon-doc';
const IconDoc = () => <div data-testid={iconDocTestId} />;

const iconXlsTestId = 'icon-xls';
const IconXls = () => <div data-testid={iconXlsTestId} />;

const testId = 'custom-file';

const customConfig: FileConfig = {
  doc: { color: 'var(--file-color-document)', icon: IconDoc },
  xls: { color: 'var(--file-color-table)', icon: IconXls },
};

const CustomFile = fileGenerator(customConfig);

const renderComponent = (props: React.ComponentProps<typeof CustomFile>) => {
  render(<CustomFile data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

describe('fileGenerator', () => {
  describe('использует переданный конфиг', () => {
    Object.entries(customConfig).forEach(([ext, config]) => {
      it(`для .${ext} отображает правильную иконку и цвет`, () => {
        renderComponent({ extension: ext });

        const expectedIconTestId =
          ext === 'doc' ? iconDocTestId : iconXlsTestId;

        const extensionElement = getRender().querySelector(
          `.${cnFileCanaryBase('Extension')}`,
        );
        expect(extensionElement).toBeInTheDocument();
        expect(extensionElement).toHaveTextContent(ext);

        expect(screen.getByTestId(expectedIconTestId)).toBeInTheDocument();
        expect(getRender()).toHaveStyle(`background-color: ${config.color}`);
      });
    });
  });

  it('использует специальный конфиг для неизвестного расширения', () => {
    const extension = 'xyz';
    renderComponent({ extension });
    expect(document.querySelector('.IconFileUnknown')).toBeInTheDocument();
    expect(getRender()).toHaveStyle(
      'background-color: var(--file-color-unknown)',
    );
    const extensionElement = getRender().querySelector(
      `.${cnFileCanaryBase('Extension')}`,
    );
    expect(extensionElement).toBeInTheDocument();
    expect(extensionElement).toHaveTextContent(extension);
  });
});
