import React, { useState } from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Dialog, DialogProps } from '../Dialog';

const contentTestId = 'content';
const openBtnTestId = 'openBtn';
const submitBtnTestId = 'submitBtn';
const cancelBtnTestId = 'cancelBtn';

const Component: React.FC<Partial<DialogProps>> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button data-testid={openBtnTestId} onClick={() => setIsOpen(true)} type="button">
        open
      </button>
      <Dialog
        isOpen={isOpen}
        content={<div data-testid={contentTestId}>Content</div>}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        submitButtonProps={{ 'data-testid': submitBtnTestId }}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        cancelButtonProps={{ 'data-testid': cancelBtnTestId }}
        close={() => setIsOpen(false)}
        {...props}
      />
    </div>
  );
};

describe('Компонент Dialog', () => {
  let dialog: RenderResult;
  let onSubmit: jest.Mock;
  let onCancel: jest.Mock;
  let close: jest.Mock;

  beforeEach(() => {
    dialog = render(<Component />);
    onSubmit = jest.fn();
    onCancel = jest.fn();
    close = jest.fn();
  });

  it('должен рендерить content при открытии', () => {
    expect(dialog.queryByTestId(contentTestId)).not.toBeInTheDocument();
    fireEvent.click(dialog.getByTestId(openBtnTestId));
    expect(dialog.getByTestId(contentTestId)).toBeInTheDocument();
  });

  it('должен вызывать функцию close() при нажатии на кнопку submit', () => {
    dialog.rerender(<Component close={close} onSubmit={onSubmit} />);

    fireEvent.click(dialog.getByTestId(openBtnTestId));
    fireEvent.click(dialog.getByTestId(submitBtnTestId));
    expect(onSubmit).toBeCalledTimes(1);
    expect(close).toBeCalledTimes(1);
  });

  it('должен вызывать рендерить кнопку cancel при наличии свойства onCancel', () => {
    dialog.rerender(<Component close={close} onCancel={onCancel} />);

    fireEvent.click(dialog.getByTestId(openBtnTestId));
    expect(dialog.getByTestId(cancelBtnTestId)).toBeInTheDocument();
  });

  it('должен вызывать функцию close() при нажатии на кнопку cancel', () => {
    dialog.rerender(<Component close={close} onCancel={onCancel} />);

    fireEvent.click(dialog.getByTestId(openBtnTestId));
    fireEvent.click(dialog.getByTestId(cancelBtnTestId));
    expect(onCancel).toBeCalledTimes(1);
    expect(close).toBeCalledTimes(1);
  });

  it('брать в фокус кнопку "submit" по дефолту при открытии', () => {
    fireEvent.click(dialog.getByTestId(openBtnTestId));
    expect(document.activeElement).toBe(dialog.getByTestId(submitBtnTestId));
  });

  it('при открытии брать в фокус кнопку, указанную в свойстве focusBtn', () => {
    dialog.rerender(<Component onSubmit={onSubmit} onCancel={onCancel} focusBtn="submit" />);
    fireEvent.click(dialog.getByTestId(openBtnTestId));
    expect(document.activeElement).toBe(dialog.getByTestId(submitBtnTestId));

    dialog.rerender(<Component onSubmit={onSubmit} onCancel={onCancel} focusBtn="cancel" />);
    fireEvent.click(dialog.getByTestId(openBtnTestId));
    expect(document.activeElement).toBe(dialog.getByTestId(cancelBtnTestId));
  });
});
