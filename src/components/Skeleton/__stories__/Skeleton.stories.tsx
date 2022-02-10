import React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { Grid } from '../../Grid/Grid';
import {
  Text,
  textPropLineHeight,
  textPropLineHeightDefault,
  textPropSize,
  textPropSizeDefault,
} from '../../Text/Text';
import { SkeletonBrick } from '../Skeleton';
import { SkeletonCircle } from '../SkeletonCircle/SkeletonCircle';
import { SkeletonText } from '../SkeletonText/SkeletonText';

import mdx from './Skeleton.docs.mdx';

export function Playground() {
  const component = select(
    'component',
    ['SkeletonBrick', 'SkeletonCircle', 'SkeletonText'],
    'SkeletonBrick',
  );

  if (component === 'SkeletonBrick') {
    return <SkeletonBrick width={text('width', '100%')} height={text('height', '100px')} />;
  }

  if (component === 'SkeletonCircle') {
    return <SkeletonCircle size={number('size', 48)} />;
  }

  if (component === 'SkeletonText') {
    const rows = number('rows', 4);
    const fontSize = select('fontSize', textPropSize, textPropSizeDefault);
    const lineHeight = select('lineHeight', textPropLineHeight, textPropLineHeightDefault);
    const showText = boolean('Показать текст для сравнения размеров', false);

    const skeletonText = <SkeletonText rows={rows} fontSize={fontSize} lineHeight={lineHeight} />;

    return showText ? (
      <Grid cols={2} gap="6xl">
        {skeletonText}
        <div>
          {new Array(rows).fill(null).map(() => (
            <Text size={fontSize} lineHeight={lineHeight}>
              Lorem ipsum
            </Text>
          ))}
        </div>
      </Grid>
    ) : (
      skeletonText
    );
  }

  return null;
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Skeleton',
  id: 'components/Skeleton',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=30293%3A104807',
    },
  },
});
