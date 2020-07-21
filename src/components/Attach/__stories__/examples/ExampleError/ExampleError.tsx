import './ExampleError.css';

import React from 'react';

import { Attach } from '../../../Attach';
import { cn } from '../../cn';

const cnExampleError = cn('ExampleError');

export function ExampleError() {
  return (
    <Attach
      className={cnExampleError()}
      fileName="Документация"
      fileExtension="docx"
      errorText="Ошибка: Файл не возможно загрузить"
    />
  );
}
