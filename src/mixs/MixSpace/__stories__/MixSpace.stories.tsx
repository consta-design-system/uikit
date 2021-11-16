import './MixSpaceStories.css';

import React from 'react';
import { select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { cnMixSpace, defaultPropSpace, propSpace } from '../MixSpace';

import mdx from './MixSpace.docs.mdx';

const defaultKnobs = () => ({
  padding: select('padding', propSpace, defaultPropSpace),
  margin: select('margin', propSpace, defaultPropSpace),
  verticalPadding: select('verticalPadding', ['', ...propSpace], ''),
  horizontalPadding: select('horizontalPadding', ['', ...propSpace], ''),
  verticalMargin: select('verticalMargin', ['', ...propSpace], ''),
  horizontalMargin: select('horizontalMargin', ['', ...propSpace], ''),
  pTop: select('pTop', ['', ...propSpace], ''),
  pLeft: select('pLeft', ['', ...propSpace], ''),
  pRight: select('pRight', ['', ...propSpace], ''),
  pBottom: select('pBottom', ['', ...propSpace], ''),
  mTop: select('mTop', ['', ...propSpace], ''),
  mLeft: select('mLeft', ['', ...propSpace], ''),
  mRight: select('mRight', ['', ...propSpace], ''),
  mBottom: select('mBottom', ['', ...propSpace], ''),
});

const cnMixSpaceStories = cn('MixSpaceStories');

export function Playground() {
  const {
    margin,
    padding,
    verticalPadding,
    horizontalPadding,
    verticalMargin,
    horizontalMargin,
    mTop,
    mLeft,
    mRight,
    mBottom,
    pTop,
    pLeft,
    pRight,
    pBottom,
  } = defaultKnobs();

  return (
    <div
      className={cnMixSpaceStories(null, [
        cnMixSpace({
          padding,
          margin,
          verticalPadding: verticalPadding === '' ? undefined : verticalPadding,
          horizontalPadding: horizontalPadding === '' ? undefined : horizontalPadding,
          verticalMargin: verticalMargin === '' ? undefined : verticalMargin,
          horizontalMargin: horizontalMargin === '' ? undefined : horizontalMargin,
          mTop: mTop === '' ? undefined : mTop,
          mLeft: mLeft === '' ? undefined : mLeft,
          mRight: mRight === '' ? undefined : mRight,
          mBottom: mBottom === '' ? undefined : mBottom,
          pTop: pTop === '' ? undefined : pTop,
          pLeft: pLeft === '' ? undefined : pLeft,
          pRight: pRight === '' ? undefined : pRight,
          pBottom: pBottom === '' ? undefined : pBottom,
        }),
      ])}
    />
  );
}

export default createMetadata({
  title: 'Mixins|MixSpace',
  id: 'mixs/MixSpace',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
