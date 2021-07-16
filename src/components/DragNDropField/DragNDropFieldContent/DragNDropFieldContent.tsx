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
        Загрузите {fileText} простым переносом или&nbsp;по&nbsp;кнопке&nbsp;ниже
        {requirements && (
          <>
            <br />
            {requirements}
          </>
        )}
      </Text>
      <Button
        className={cnDragNDropFieldContent('Button')}
        label={`Загрузить ${fileText}`}
        iconLeft={IconAttach}
        view="ghost"
        size="s"
        onClick={openFileDialog}
      />
    </>
  );
};
