import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Attach from '../Attach';

const defaultKnobs = () => ({
  fileName: text('fileName', 'Название_файла.js'),
});

const loadedKnobs = () => ({
  status: 'loaded',
  fileSize: number('fileSize', 1.5 * 1024 * 1024),
  timestamp: date('timestamp', new Date('03-03-2020')),
  onDelete: () => {
    action('onDelete');
  },
});

const loadingKnobs = () => ({
  status: 'loading',
  progress: 33,
  onCancel: () => {
    action('onCancel');
  },
});

const errorKnobs = () => ({
  status: 'error',
  message: text('message', 'Ошибка загрузки'),
  onCancel: () => {
    action('onCancel');
  },
});

const contentKnobs = () => ({
  status: 'content',
  fileSize: number('fileSize', 1.5 * 1024 * 1024),
  timestamp: date('timestamp', new Date('03-03-2020')),
  href: text('href', 'http://example.com/file.js'),
});

storiesOf('Attach', module)
  .addDecorator(withKnobs)
  .add('Загружен', () => <Attach {...{ ...defaultKnobs(), ...loadedKnobs() }} />)
  .add('Загрузка', () => <Attach {...{ ...defaultKnobs(), ...loadingKnobs() }} />)
  .add('Ошибка', () => <Attach {...{ ...defaultKnobs(), ...errorKnobs() }} />)
  .add('Контент', () => <Attach {...{ ...defaultKnobs(), ...contentKnobs() }} />);
