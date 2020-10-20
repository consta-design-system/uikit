import './Dialog.css';

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { cn } from '../../utils/bem';
import { Button } from '../Button/Button';
import { Modal, ModalProps } from '../Modal/Modal';

import { confirm, ConfirmFunc } from './confirm';

export const dialogPropFocusBtn = ['submit', 'cancel'] as const;
type DialogPropFocusBtn = typeof dialogPropFocusBtn[number];
export const defaultDialogPropFocusBtn: DialogPropFocusBtn = dialogPropFocusBtn[0];

export interface DialogProps extends ModalProps {
  content?: React.ReactNode;
  onSubmit?: () => void;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  onCancel?: () => void;
  cancelButtonProps?: React.ComponentProps<typeof Button>;
  close: () => void;
  focusBtn?: DialogPropFocusBtn;
}

const cnDialog = cn('Dialog');

export const Dialog: React.FC<DialogProps> & { confirm: ConfirmFunc } = (props) => {
  const {
    content,
    onSubmit,
    submitButtonProps,
    onCancel,
    cancelButtonProps,
    className,
    close,
    focusBtn = defaultDialogPropFocusBtn,
    ...modalProps
  } = props;
  const submitRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.isOpen) {
      switch (focusBtn) {
        case 'submit':
          submitRef.current?.focus();
          break;
        case 'cancel':
          cancelRef.current?.focus();
          break;
        default:
          console.error(`Dialog has incorrect props: focusBtn = ${focusBtn}`);
          break;
      }
    }
  }, [submitRef.current, cancelRef.current, focusBtn, props.isOpen]);

  const actionHandler = (action?: Function) => () => {
    action?.();
    close();
  };

  return (
    <Modal {...modalProps} className={classNames(cnDialog(), className)}>
      <div className={cnDialog('content')}>{content}</div>
      <div className={cnDialog('controls')}>
        {onCancel && (
          <Button
            label="Отмена"
            view="ghost"
            {...cancelButtonProps}
            onClick={actionHandler(onCancel)}
            ref={cancelRef}
          />
        )}
        <Button
          label="Ок"
          {...submitButtonProps}
          onClick={actionHandler(onSubmit)}
          ref={submitRef}
        />
      </div>
    </Modal>
  );
};

Dialog.confirm = confirm;
