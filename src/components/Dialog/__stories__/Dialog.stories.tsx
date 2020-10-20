import '../../Modal/__stories__/Modal.stories.css';
import './Dialog.stories.css';

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { defaultDialogPropFocusBtn, Dialog, dialogPropFocusBtn } from '../Dialog';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Dialog.mdx';

const cnDialogStories = cn('DialogStories');

const defaultKnobs = () => ({
  hasOverlay: boolean('hasOverlay', true),
  width: select('width', ['auto'], 'auto'),
  position: select('position', ['center', 'top'], 'center'),
  focusBtn: select('focusBtn', dialogPropFocusBtn, defaultDialogPropFocusBtn),
});

export function Playground() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const close = () => setIsModalOpen(false);
  const content = (
    <Text type="h1" size="xl" as="h1" className={cnDialogStories('content')}>
      Нажми на кнопку
    </Text>
  );
  const onSubmit = () => alert('ты нажал кнопку "Ок"');
  const onCancel = () => alert('ты нажал кнопку "Отмена"');
  const fromFunc = () =>
    Dialog.confirm({
      content,
      submitButtonProps: { label: 'ОК' },
      cancelButtonProps: { label: 'Отмена' },
      onSubmit,
      onCancel,
      ...defaultKnobs(),
    });

  const promisify = () => {
    new Promise((res, rej) =>
      Dialog.confirm({
        content,
        submitButtonProps: { label: 'ОК' },
        cancelButtonProps: { label: 'Отмена' },
        onSubmit: res,
        onCancel: rej,
        ...defaultKnobs(),
      }),
    )
      .then(onSubmit)
      .catch(onCancel);
  };

  return (
    <div className={cnDialogStories()}>
      <Button
        size="m"
        view="primary"
        label="компонент Dialog"
        width="default"
        onClick={() => setIsModalOpen(true)}
      />
      <Button size="m" view="primary" label="из функции" width="default" onClick={fromFunc} />
      <Button size="m" view="primary" label="из промиса" width="default" onClick={promisify} />
      <Dialog
        isOpen={isModalOpen}
        content={content}
        submitButtonProps={{ label: 'ОК' }}
        cancelButtonProps={{ label: 'Отмена' }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        close={close}
        {...defaultKnobs()}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Dialog',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
