import './FileExampleAllExtensions.css';

import { Example } from '@consta/stand';
import React from 'react';

import { groupBy } from '##/utils/array';
import { cn } from '##/utils/bem';

import { defaultConfig } from '../../../config';
import { File } from '../../../FileCanary';

export const cnFileExampleAllExtensions = cn('FileExampleAllExtensions');

export const colorToGroupName: Record<string, string> = {
  'var(--file-color-code)': 'Код',
  'var(--file-color-font)': 'Шрифт',
  'var(--file-color-disk)': 'Образ',
  'var(--file-color-executive)': 'Исполняемый',
  'var(--file-color-config)': 'Конфиг',
  'var(--file-color-database)': 'БД',
  'var(--file-color-presentation)': 'Презентация',
  'var(--file-color-table)': 'Таблица',
  'var(--file-color-document)': 'Документ',
  'var(--file-color-pdf)': 'PDF',
  'var(--file-color-audio)': 'Аудио',
  'var(--file-color-image)': 'Изображение',
  'var(--file-color-video)': 'Видео',
  'var(--file-color-mail)': 'Почта',
  'var(--file-color-scheme)': 'Схема',
  'var(--file-color-archive)': 'Архив',
};

export const FileExampleAllExtensions = () => {
  const groupExtensions = groupBy(
    Object.keys(defaultConfig),
    (ext) => colorToGroupName[defaultConfig[ext].color] ?? 'Без группы',
  );

  return (
    <Example>
      <div className={cnFileExampleAllExtensions()}>
        {Object.keys(groupExtensions).map((groupName) => {
          return (
            <div
              key={groupName}
              className={cnFileExampleAllExtensions('Group')}
            >
              <h3 className={cnFileExampleAllExtensions('Title')}>
                {groupName}
              </h3>
              <div className={cnFileExampleAllExtensions('List')}>
                {groupExtensions[groupName as keyof typeof groupExtensions].map(
                  (ext) => (
                    <File size="m" extension={ext} key={ext} />
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Example>
  );
};
