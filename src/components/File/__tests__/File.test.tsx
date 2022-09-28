import { render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnIconFile,
  fileIconPropSize,
} from '../../../fileIcons/FileIcon/FileIcon';
import { cnFile, File } from '../File';

type FileProps = React.ComponentProps<typeof File>;

const testId = cnFile();

const renderComponent = (props: FileProps = {}) => {
  return render(<File data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLoader() {
  return getRender().querySelector(`.${cnFile('Loader')}`);
}

describe('Компонент File', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      fileIconPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          expect(getRender()).toHaveClass(cnIconFile({ size }));
        });
      });
    });
    describe('проверка extension', () => {
      it(`рисует верную иконку для extension=undefined`, () => {
        renderComponent();

        expect(getRender()).toHaveClass('FileIconUndefined');
      });
      it(`рисует верную иконку для extension=doc`, () => {
        renderComponent({ extension: 'doc' });

        expect(getRender()).toHaveClass('FileIconDoc');
      });
      it(`рисует верную иконку для extension=blabla`, () => {
        renderComponent({ extension: 'blabla' });

        expect(getRender()).toHaveClass('FileIconUndefined');
      });
    });
    describe('проверка loading', () => {
      it(`рисует верную иконку для loading=true`, () => {
        renderComponent({ loading: true });

        expect(getRender()).toHaveClass('FileIconLoading');
      });
      it(`при loadingWithProgressSpin = true появляется ProgressSpin`, () => {
        renderComponent({ loading: true, loadingWithProgressSpin: true });

        expect(getLoader()).toHaveClass(cnFile('Loader'));
      });
    });
  });
});
