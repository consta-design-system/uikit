import './ExampleLoading.css';

import React from 'react';

import { Attach } from '../../../Attach';
import { cn } from '../../cn';

const cnExampleLoading = cn('ExampleLoading');

export function ExampleLoading() {
  return (
    <Attach
      className={cnExampleLoading()}
      fileName="Документация"
      fileExtension="docx"
      fileDescription="1,5 Mб 21.02.2020, 14:12"
      loadingText="Загрузка"
      loading
      loadingProgress={70}
    />
  );
}
