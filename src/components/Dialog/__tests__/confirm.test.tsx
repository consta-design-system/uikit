import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { MODAL_TIMEOUT } from '../../Modal/Modal';
import { ConfirmFunc } from '../confirm';
import { Dialog } from '../Dialog';

const contentTestId = 'contentTestId';
const contentBefore = 'Content before';
const contentAfter = 'Content after';
const submitBtnTestId = 'submitBtn';
const cancelBtnTestId = 'cancelBtn';

jest.useFakeTimers();

describe('функция Dialog.confirm', () => {
  let confirm: RenderResult;
  let dialog: ReturnType<ConfirmFunc>;
  let onSubmit: jest.Mock;
  let onCancel: jest.Mock;

  beforeEach(() => {
    onSubmit = jest.fn();
    onCancel = jest.fn();
    confirm = render(<h1>Some content</h1>);
    dialog = Dialog.confirm({
      content: <div data-testid={contentTestId}>{contentBefore}</div>,
      onSubmit,
      onCancel,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      submitButtonProps: { 'data-testid': submitBtnTestId },
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      cancelButtonProps: { 'data-testid': cancelBtnTestId },
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('должен рендерить Dialog в body', () => {
    expect(confirm.getByTestId(contentTestId)).toBeInTheDocument();
  });

  it('Должен обновляться при вызове update()', () => {
    expect(confirm.getByTestId(contentTestId).textContent).toBe(contentBefore);
    dialog.update({
      content: <div data-testid={contentTestId}>{contentAfter}</div>,
    });
    expect(confirm.getByTestId(contentTestId).textContent).toBe(contentAfter);
  });

  it('Должен размонтироваться при вызове destroy()', async () => {
    expect(confirm.getByTestId(contentTestId)).toBeInTheDocument();
    dialog.destroy();
    jest.advanceTimersByTime(MODAL_TIMEOUT);
    expect(confirm.queryByTestId(contentTestId)).not.toBeInTheDocument();
  });

  it('Работате onSubmit', () => {
    fireEvent.click(confirm.getByTestId(submitBtnTestId));
    expect(onSubmit).toBeCalledTimes(1);
    jest.advanceTimersByTime(MODAL_TIMEOUT);
    expect(confirm.queryByTestId(contentTestId)).not.toBeInTheDocument();
  });

  it('Работате onCancel', () => {
    fireEvent.click(confirm.getByTestId(cancelBtnTestId));
    expect(onCancel).toBeCalledTimes(1);
    jest.advanceTimersByTime(MODAL_TIMEOUT);
    expect(confirm.queryByTestId(contentTestId)).not.toBeInTheDocument();
  });
});
