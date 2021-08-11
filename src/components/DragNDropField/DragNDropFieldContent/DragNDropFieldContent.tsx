import './DragNDropFieldContent.css';

import React from 'react';

import { IconAttach } from '../../../icons/IconAttach/IconAttach';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { DragNDropFieldChildrenRenderProp } from '../DragNDropField';

import { formatFileRequirements } from './formatFileRequirements';

const cnDragNDropFieldContent = cn('DragNDropFieldContent');

export const DragNDropFieldContent: DragNDropFieldChildrenRenderProp = ({
  accept,
  maxSize,
  multiple,
  openFileDialog,
}) => {
  const requirements = formatFileRequirements(accept, maxSize);
  const fileText = multiple ? 'файлы' : 'файл';

  return (
    <>
      <Text view="secondary" size="s" lineHeight="s" align="center">
        Перетащите {fileText} сюда или&nbsp;загрузите по&nbsp;кнопке
        {requirements && (
          <>
            <br />
            {requirements}
          </>
        )}
      </Text>
      <Button
        className={cnDragNDropFieldContent('Button')}
        label={`Выбрать ${fileText}`}
        iconLeft={IconAttach}
        view="ghost"
        size="s"
        onClick={openFileDialog}
      />
    </>
  );
};
