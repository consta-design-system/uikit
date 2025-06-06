import './ListLoader.css';

import React, { forwardRef } from 'react';

import { Loader } from '##/components/LoaderDeprecated';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { mapHorizontalSpace, mapHorizontalSpaceIncreased } from '../maps';
import {
  defaultListPropInnerOffset,
  defaultListPropSize,
  ListPropInnerOffset,
  ListPropSize,
} from '../types';

export const cnListLoader = cn('ListLoader');

type Props = PropsWithHTMLAttributesAndRef<
  { size?: ListPropSize; innerOffset?: ListPropInnerOffset },
  HTMLDivElement
>;

export const ListLoader = forwardRef<HTMLDivElement, Props>(
  (
    {
      size = defaultListPropSize,
      innerOffset = defaultListPropInnerOffset,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cnListLoader({ size }, [
          cnMixSpace({
            pH:
              innerOffset === 'increased'
                ? mapHorizontalSpaceIncreased[size]
                : mapHorizontalSpace[size],
          }),
          className,
        ])}
      >
        <div className={cnListLoader('Container')}>
          <Loader size="s" className={cnListLoader('Loader')} />
        </div>
      </div>
    );
  },
);
