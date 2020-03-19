import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import IconLeaf from '../Icon/icons/Leaf';
import Button from '../Button';

import { useSnackbar, SnackbarProvider } from './SnackbarHelpers';
import SnackbarContainer from '.';

const views = ['system', 'success', 'warning', 'alert'];

const App = () => {
  const { add, items, remove } = useSnackbar();
  const defaultProps = {
    withIcon: boolean('С иконкой', true),
    withButton: boolean('С кнопкой', true),
    withTimer: boolean('С таймером', false),
    text: text('Text', 'Нейтральное сообщение о событии, которое не несет статусного смысла'),
  };

  const onClose = id => {
    remove(id);
  };

  return (
    <>
      <div className={'tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full'}>
        {views.map(view => (
          <div key={view} className={'tpl-grid__fraction text text_align_center'}>
            <Button
              wpSize="s"
              form="default"
              view="primary"
              onClick={() => {
                add({
                  icon: defaultProps.withIcon ? <IconLeaf size="m" view="primary" /> : undefined,
                  timer: defaultProps.withTimer ? 10 : undefined,
                  text: defaultProps.text,
                  view: view,
                  button: defaultProps.withButton
                    ? {
                        text: 'Кнопка',
                        onClick: onClose,
                      }
                    : undefined,
                  onClose,
                });
              }}
            >
              Add {view}
            </Button>
          </div>
        ))}
      </div>
      <SnackbarContainer items={items} />
    </>
  );
};

storiesOf('Snackbar', module)
  .addDecorator(withKnobs)
  .add('Использование с контекстом', () => (
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  ));
