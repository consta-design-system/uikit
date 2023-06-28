import './Spoiler.css';

import React, { forwardRef, useMemo } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cnCanary } from '##/utils/bem';

import { Text } from '../Text';
import { SpoilerButton } from './SpoilerButton';
import { defaultSpoilerPropSize, SpoilerProps, SpoilerPropSize } from './types';

export const cnSpoiler = cnCanary('Spoiler');

const spoilerOffsetMap: Record<SpoilerPropSize, Space> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
  (props, ref) => {
    const {
      mode = 'blur',
      preview,
      maxHeight = 96,
      fullText,
      size = defaultSpoilerPropSize,
      lessIcon,
      lessLabel,
      moreIcon,
      moreLabel,
      className,
      ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useFlag();

    const content = useMemo(() => {
      if (mode === 'blur' || isOpen) {
        return fullText;
      }
      return (
        <>
          {preview}
          ...
        </>
      );
    }, [mode, isOpen, preview, fullText]);

    return (
      <div
        ref={ref}
        className={cnSpoiler({ size }, [className])}
        {...otherProps}
      >
        <Text
          className={cnSpoiler('Wrapper', { mode, open: isOpen })}
          size={size}
          style={{
            ['--spoiler-content-height' as string]: `${maxHeight}px`,
          }}
        >
          {content}
        </Text>
        <SpoilerButton
          className={cnSpoiler('Button', [
            cnMixSpace({ mT: spoilerOffsetMap[size] }),
          ])}
          lessIcon={lessIcon}
          lessLabel={lessLabel}
          moreIcon={moreIcon}
          moreLabel={moreLabel}
          onClick={setIsOpen.toggle}
          open={isOpen}
          size={size}
        />
      </div>
    );
  },
);
