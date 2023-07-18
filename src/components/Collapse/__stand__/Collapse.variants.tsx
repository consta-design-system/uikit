import './Collapse.variants.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import { IconSun } from '@consta/icons/IconSun';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { getByMap } from '../../../utils/getByMap';
import { Badge } from '../../Badge/Badge';
import {
  Collapse,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIcon,
  collapsePropDirectionIconDefault,
  collapsePropForm,
  collapsePropFormDefault,
  collapsePropHorizontalSpace,
  collapsePropIconView,
  collapsePropIconViewDefault,
  collapsePropSize,
  collapsePropSizeDefault,
  collapsePropView,
  collapsePropViewDefault,
  sizeIconMap,
} from '../Collapse';

const cnCollapseVariants = cn('CollapseVariants');

const Variants = () => {
  const size = useSelect('size', collapsePropSize, collapsePropSizeDefault);
  const form = useSelect('form', collapsePropForm, collapsePropFormDefault);
  const label = useText('label', 'Заголовок');
  const children = useText(
    'children',
    'Здесь может быть что угодно. Например, этот текст. Но не обязательно: вы можете добавить иконки, кнопки, картинки или даже мини-игру (ну вдруг). Удивительная штука: никогда не угадаешь, что прячется под этим заголовком.',
  );
  const iconPosition = useSelect('iconPosition', ['left', 'right'], 'left');

  const maxHeight = useNumber('maxHeight');
  const hoverEffect = useBoolean('hoverEffect', false);
  const view = useSelect('view', collapsePropView, collapsePropViewDefault);
  const horizontalSpace = useSelect(
    'horizontalSpace',
    collapsePropHorizontalSpace,
  );
  const iconView = useSelect(
    'iconView',
    collapsePropIconView,
    collapsePropIconViewDefault,
  );
  const divider = useBoolean('divider', false);
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
    <div className={cnCollapseVariants()}>
      <Collapse
        size={size}
        label={label || ''}
        form={form}
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        hoverEffect={hoverEffect}
        view={view}
        divider={divider}
        maxContentHeight={maxHeight}
        horizontalSpace={horizontalSpace}
        style={{ maxWidth: 300 }}
        iconView={iconView}
        iconPosition={iconPosition}
        rightSide={rightSide ? defaultRightSide : undefined}
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
    </div>
  );
};

export default Variants;
