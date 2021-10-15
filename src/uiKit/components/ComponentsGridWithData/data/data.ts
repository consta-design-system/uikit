import React from 'react';

import AttachmentImage from './images/AttachmentImage';
import { DataItem } from './types';

export const data: DataItem[] = [
  {
    name: 'Attachment',
    url: '/?path=/docs/components-attachment--playground',
    description: 'Показывает загрузку файла или уже загруженные файл',
  },
];

export const imageMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Attachment: AttachmentImage,
};
