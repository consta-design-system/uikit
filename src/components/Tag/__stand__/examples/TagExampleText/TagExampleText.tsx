import { Example } from '@consta/stand';
import React from 'react';

import { Tag } from '../../../Tag';

export const TagExampleText = () => (
  <Example>
    <Tag onClick={() => {}} label="Рисунок" />
    <Tag onClick={() => {}} label="Портрет" />
    <Tag onClick={() => {}} label="Фото" />
    <Tag onClick={() => {}} label="Полосатый" />
    <Tag onClick={() => {}} label="В клеточку" />
  </Example>
);
