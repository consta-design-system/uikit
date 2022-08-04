import React from 'react';

export type Item = {
  label: string;
  content: React.ReactNode;
  status: 'normal' | 'success' | 'error' | 'warning' | 'system';
};

export const items: Item[] = [
  {
    label: 'Первый вопрос',
    content: (
      <>
        <b>Первый ответ</b> — очень важный и длинный. Это просто информация,
        которую пользователь видит только после того, как нажал на заголовок.
        Внутри может быть что угодно: текст, картинки, форма с вопросами, видео
        или анимация.
      </>
    ),
    status: 'normal',
  },
  {
    label: 'Второй вопрос',
    content:
      'А это просто ответ на второй вопрос. Он вряд ли получится таким длинным, как первый.',
    status: 'error',
  },
  {
    label: 'Третий вопрос',
    content: 'А это ответ на третий вопрос.',
    status: 'success',
  },
  {
    label: 'Четвёртый вопрос',
    content: 'Ответ на четвертый вопрос.',
    status: 'system',
  },
  {
    label: 'Пятый вопрос',
    content:
      'Ответ на пятый вопрос. Мы подозреваем, что его всё равно никто не будет читать, поэтому здесь можно написать что угодно.',
    status: 'warning',
  },
];

export type OwnItem = {
  title: string;
  text: string;
  status: 'normal' | 'success' | 'error' | 'warning' | 'system';
};

export const ownItems: OwnItem[] = [
  {
    title: 'Во-первых',
    text: 'Здесь ошибка. Кажется, с этим пунктом что-то не так: например, пользователь неправильно заполнил форму или не ответил на какой-то вопрос.',
    status: 'error',
  },
  {
    title: 'Во-вторых',
    text: 'Здесь всё в порядке. Скорее всего, здесь всё сделано и можно больше не открывать.',
    status: 'success',
  },
  {
    title: 'В-третьих',
    text: 'Это не пройдено. Нужно открыть и посмотреть, что здесь нужно прочитать, посмотреть или заполнить.',
    status: 'system',
  },
];

export type SimpleItem = {
  label: string;
  content: React.ReactNode;
};

export const simpleItems: SimpleItem[] = [
  {
    label: 'Пункт раз',
    content: 'Содержимое первого блока.',
  },
  {
    label: 'Пункт два',
    content: 'Содержимое второго блока.',
  },
  {
    label: 'Пункт три',
    content: 'Содержимое третьего блока.',
  },
];

export type SimpleItem2 = {
  label: string;
  content: React.ReactNode;
  rightSide: string;
};

export const simpleItems2: SimpleItem2[] = [
  {
    label: 'Пункт раз',
    content: 'Содержимое блока раз',
    rightSide: 'Я справа',
  },
  {
    label: 'Пункт два',
    content: 'Содержимое блока два',
    rightSide: 'Я тоже справа',
  },
  {
    label: 'Пункт три',
    content: 'Содержимое блока три',
    rightSide: 'И я :)',
  },
];
