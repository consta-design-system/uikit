import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

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

export const Variants = () => {
  const component = useSelect(
    'component',
    ['SkeletonBrick', 'SkeletonCircle', 'SkeletonText'],
    'SkeletonBrick',
  );
  const rows = useNumber('rows', 4, Boolean(component === 'SkeletonText'));
  const fontSize = useSelect(
    'fontSize',
    textPropSize,
    textPropSizeDefault,
    Boolean(component === 'SkeletonText'),
  );
  const lineHeight = useSelect(
    'lineHeight',
    textPropLineHeight,
    textPropLineHeightDefault,
    Boolean(component === 'SkeletonText'),
  );
  const showText = useBoolean(
    'Показать текст для сравнения размеров',
    false,
    Boolean(component === 'SkeletonText'),
  );
  const width = useText(
    'width',
    '100%',
    Boolean(component === 'SkeletonBrick'),
  );
  const height = useText(
    'height',
    '100px',
    Boolean(component === 'SkeletonBrick'),
  );

  const size = useNumber('size', 48, Boolean(component === 'SkeletonCircle'));

  if (component === 'SkeletonBrick') {
    return <SkeletonBrick width={width} height={height} />;
  }

  if (component === 'SkeletonCircle') {
    return <SkeletonCircle size={Number(size)} />;
  }

  if (component === 'SkeletonText') {
    const skeletonText = (
      <SkeletonText
        rows={Number(rows)}
        fontSize={fontSize}
        lineHeight={lineHeight}
      />
    );

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
};

export default Variants;
