import React from 'react';

export type Item = {
  label: string;
  content: React.ReactNode;
  status: 'normal' | 'success' | 'error' | 'warning' | 'system';
};

export const items: Item[] = [
  {
    label: 'один',
    content: (
      <>
        <b>Lorem ipsum dolor sit amet</b> , consectetur adipisicing elit. Alias asperiores delectus
        eius fuga hic optio qui unde velit vitae voluptatibus! Ab autem dignissimos dolorum eaque,
        est et fugit ipsum molestias necessitatibus nesciunt ratione, vel veniam. Aspernatur aut
        consequatur ducimus est explicabo harum nemo, nisi officia placeat quisquam, tempore vitae,
        voluptates.
      </>
    ),
    status: 'normal',
  },
  {
    label: 'два',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
    status: 'error',
  },
  {
    label: 'три',
    content: 'Lorem ipsum dolor sit amet.',
    status: 'success',
  },
  {
    label: 'четыре',
    content: 'Lorem ipsum dolor sit.',
    status: 'system',
  },
  {
    label: 'пять',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ipsum optio repellat voluptatem.',
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
    title: 'Один',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
    status: 'error',
  },
  {
    title: 'Два',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
    status: 'success',
  },
  {
    title: 'Три',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
    status: 'system',
  },
];
