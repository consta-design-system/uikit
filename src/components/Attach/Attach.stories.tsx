import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Attach from '../Attach';

const defaultKnobs = () => ({
  fileName: text('fileName', 'Название_файла.pdf'),
});

const loadedKnobs = () => ({
  status: 'loaded',
  fileSize: number('fileSize', 1.5 * 1024 * 1024),
  timestamp: number('timestamp', 1583182800000),
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
  timestamp: number('timestamp', 1583182800000),
  href: text('href', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
});

const getIconComponentName = (findedName, fileName) => {
  const ext = fileName.split('.').pop();
  return ext === 'someextension' ? 'Jpg' : findedName;
};

storiesOf('Attach', module)
  .addDecorator(withKnobs)
  .add('Загружен', () => <Attach {...{ ...defaultKnobs(), ...loadedKnobs() }} />)
  .add('Загрузка', () => <Attach {...{ ...defaultKnobs(), ...loadingKnobs() }} />)
  .add('Ошибка', () => <Attach {...{ ...defaultKnobs(), ...errorKnobs() }} />)
  .add('Контент', () => <Attach {...{ ...defaultKnobs(), ...contentKnobs() }} />)
  .add('Кастомная функция иконки', () => (
    <Attach
      {...{ fileName: 'Название_файла.someextension', ...contentKnobs(), getIconComponentName }}
    />
  ));
