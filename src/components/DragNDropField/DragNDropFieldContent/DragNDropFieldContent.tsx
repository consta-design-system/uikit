import './DragNDropFieldContent.css';

import { IconAttach } from '@consta/icons/IconAttach';
import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { DragNDropFieldChildrenRenderProp } from '../DragNDropField';
import { getText } from '../locale';
import { formatFileRequirements } from './formatFileRequirements';

const cnDragNDropFieldContent = cn('DragNDropFieldContent');

export const DragNDropFieldContent: DragNDropFieldChildrenRenderProp = ({
  accept,
  maxSize,
  minSize,
  multiple,
  openFileDialog,
  locale,
  disabled,
}) => {
  const requirements = formatFileRequirements(accept, maxSize, minSize, locale);
  const fileText = multiple ? locale.files : locale.file;

  return (
    <>
      <Text
        className={cnDragNDropFieldContent('Text', { disabled })}
        view="secondary"
        size="s"
        lineHeight="s"
        align="center"
      >
        {getText(locale['call-to-action'], { fileText })}
        {requirements && (
          <>
            <br />
            {requirements}
          </>
        )}
      </Text>
      <Button
        className={cnDragNDropFieldContent('Button')}
        label={getText(locale['action-button'], { fileText })}
        iconLeft={IconAttach}
        view="ghost"
        size="s"
        onClick={openFileDialog}
        disabled={disabled}
      />
    </>
  );
};
