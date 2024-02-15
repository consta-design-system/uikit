import './PaginationSizeCalculateHelper.css';

import React from 'react';

import { cnButton } from '##/components/Button';
import { cn } from '##/utils/bem';

import { cnPaginationItem } from '../PaginationItem';
import { PaginationPropSize } from '../types';

const cnPaginationSizeCalculateHelper = cn('PaginationSizeCalculateHelper');

export const PaginationSizeCalculateHelper: React.FC<{
  refs: React.RefObject<HTMLDivElement>[];
  size: PaginationPropSize;
}> = ({ refs, size }) => (
  <div className={cnPaginationSizeCalculateHelper()}>
    <span
      className={cnPaginationSizeCalculateHelper('FakeButtonContainer')}
      ref={refs[7]}
    >
      <span ref={refs[5]} className={cnButton({ size, onlyIcon: true })} />
      <span ref={refs[6]} className={cnButton({ size, onlyIcon: true })} />
    </span>
    <span className={cnButton({ size })}>
      <span ref={refs[8]}>1</span>
      <span ref={refs[9]}>2</span>
      <span ref={refs[10]}>3</span>
      <span ref={refs[11]}>4</span>
      <span ref={refs[12]}>5</span>
      <span ref={refs[13]}>6</span>
      <span ref={refs[14]}>7</span>
      <span ref={refs[15]}>8</span>
      <span ref={refs[16]}>9</span>
      <span ref={refs[17]}>0</span>
    </span>
    <span
      ref={refs[18]}
      className={cnPaginationItem({ size }, [cnButton({ size })])}
    >
      <span ref={refs[19]}>99999</span>
    </span>
  </div>
);
