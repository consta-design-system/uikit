import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import { IconSun } from '@consta/icons/IconSun';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { getByMap } from '../../../utils/getByMap';
import { Badge } from '../../Badge/Badge';
import {
  Collapse,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIcon,
  collapsePropDirectionIconDefault,
  collapsePropHorizontalSpace,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
  sizeIconMap,
} from '../Collapse';

const Variants = () => {
  const size = useSelect('size', collapsePropSize, collapsePropSizeDefault);
  const label = useText('label', 'Заголовок');
  const children = useText(
    'children',
    'Здесь может быть что угодно. Например, этот текст. Но не обязательно: вы можете добавить иконки, кнопки, картинки или даже мини-игру (ну вдруг). Удивительная штука: никогда не угадаешь, что прячется под этим заголовком.',
  );
  const iconPosition = useSelect('iconPosition', ['left', 'right'], 'left');
  const hoverEffect = useBoolean('hoverEffect', false);
  const view = useSelect('view', collapsePropView, collapsePropViewDefault);
  const divider = useBoolean('divider', false);
  const horizontalSpace = useSelect(
    'horizontalSpace',
    collapsePropHorizontalSpace,
    collapsePropHorizontalSpace[0],
  );
  const rightSide = useBoolean('rightSide', false);
  const directionIcon = useSelect(
    'directionIcon',
    collapsePropDirectionIcon,
    collapsePropDirectionIconDefault,
  );
  const closeDirectionIcon = useSelect(
    'closeDirectionIcon',
    collapsePropDirectionIcon,
    collapsePropCloseDirectionIconDefault,
  );
  const withCustomIcon = useBoolean('withCustomIcon', false);

  const [isOpen, setOpen] = useState<boolean>(false);

  const defaultRightSide: React.ReactNode = [
    <Badge label="Статус" size="s" />,
    <IconSun size={getByMap(sizeIconMap, size || collapsePropSizeDefault)} />,
  ];

  return (
    <Collapse
      size={size}
      label={label || ''}
      isOpen={isOpen}
      onClick={() => setOpen(!isOpen)}
      hoverEffect={hoverEffect}
      view={view}
      divider={divider}
      horizontalSpace={horizontalSpace}
      style={{ maxWidth: 300 }}
      {...(iconPosition === 'left'
        ? {
            iconPosition,
            rightSide: rightSide ? defaultRightSide : undefined,
          }
        : { iconPosition })}
      {...(withCustomIcon
        ? {
            icon: IconAdd,
            closeIcon: IconRemove,
          }
        : {
            directionIcon,
            closeDirectionIcon,
          })}
    >
      {children}
    </Collapse>
  );
};

export default Variants;
