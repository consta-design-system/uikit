import { Example } from '@consta/stand';
import React from 'react';

import { Tag } from '../../../Tag';

export const TagExampleSize = () => (
  <Example>
    <Tag onClick={() => {}} size="xs" label="Размер XS" />
    <Tag onClick={() => {}} size="s" label="Размер S" />
    <Tag onClick={() => {}} size="m" label="Размер M" />
    <Tag onClick={() => {}} size="l" label="Размер L" />
  </Example>
);
