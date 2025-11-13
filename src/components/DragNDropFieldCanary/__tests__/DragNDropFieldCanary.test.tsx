import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { DragNDropField } from '../DragNDropFieldCanary';

type Props = React.ComponentProps<typeof DragNDropField>;

const testId = 'DragNDropFieldCanary';

const renderComponent = (props: Props = {}) => {
  return render(<DragNDropField {...props} data-testid={testId} />);
};

const getRender = () => screen.getByTestId(testId);

const createDtWithFiles = (files: File[] = []) => {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file' as const,
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
};

const dropFiles = async (files: File[]) => {
  await act(() => {
    fireEvent.drop(getRender(), createDtWithFiles(files));
  });
};

const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });

describe('Компонент DragNDropFieldCanary', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('ref должен быть присвоен', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ ref });
    expect(ref.current).toBe(getRender());
  });

  it('должен присваиваться дополнительный className', () => {
    const className = 'custom-class';
    renderComponent({ className });
    expect(getRender()).toHaveClass(className);
  });

  it('не должен реагировать на drop в состоянии disabled', async () => {
    const onDrop = jest.fn();
    renderComponent({ onDrop, disabled: true });
    await dropFiles([file1]);
    expect(onDrop).not.toHaveBeenCalled();
  });

  describe('проверка children', () => {
    it('рендерит React.ReactNode', () => {
      const childText = 'Custom content';
      renderComponent({ children: <div>{childText}</div> });
      expect(screen.getByText(childText)).toBeInTheDocument();
    });

    it('рендерит с помощью render-функции', () => {
      const childText = 'Render prop content';
      renderComponent({
        children: () => <div>{childText}</div>,
      });
      expect(screen.getByText(childText)).toBeInTheDocument();
    });
  });

  describe('проверка callback', () => {
    it('onDrop вызывается с принятыми и отклоненными файлами', async () => {
      const onDrop = jest.fn();
      renderComponent({
        onDrop,
        accept: { 'image/png': ['.png'] },
        multiple: true,
      });
      await dropFiles([file1, file2]);
      expect(onDrop).toHaveBeenCalledWith(
        [file1],
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('onDropAccepted вызывается с принятыми файлами', async () => {
      const onDropAccepted = jest.fn();
      renderComponent({
        onDropAccepted,
        accept: { 'image/png': ['.png'] },
      });
      await dropFiles([file1]);
      expect(onDropAccepted).toHaveBeenCalledWith([file1], expect.any(Object));
    });

    it('onDropRejected вызывается с отклоненными файлами', async () => {
      const onDropRejected = jest.fn();
      const onDropAccepted = jest.fn();
      renderComponent({
        onDropRejected,
        onDropAccepted,
        accept: { 'image/png': ['.png'] },
        multiple: true,
      });
      await dropFiles([file2]);
      expect(onDropAccepted).not.toHaveBeenCalled();
      expect(onDropRejected).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ file: file2 })]),
        expect.any(Object),
      );
    });
  });

  describe('проверка ограничений', () => {
    it('`multiple=false` принимает только один файл', async () => {
      const onDropAccepted = jest.fn();
      const onDropRejected = jest.fn();
      renderComponent({
        onDropAccepted,
        onDropRejected,
        multiple: false,
      });
      await dropFiles([file1, file2]);
      expect(onDropAccepted).not.toHaveBeenCalled();
      expect(onDropRejected).toHaveBeenCalled();
    });

    it('`accept` фильтрует файлы по типу', async () => {
      const onDropAccepted = jest.fn();
      const onDropRejected = jest.fn();
      renderComponent({
        onDropAccepted,
        onDropRejected,
        accept: { 'image/png': ['.png'] },
        multiple: true,
      });
      await dropFiles([file1, file2]);
      expect(onDropAccepted).toHaveBeenCalledWith([file1], expect.any(Object));
      expect(onDropRejected).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            file: file2,
          }),
        ]),
        expect.any(Object),
      );
    });
  });
});
