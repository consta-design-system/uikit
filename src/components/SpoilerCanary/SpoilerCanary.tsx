import './Spoiler.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cnCanary } from '##/utils/bem';

import { SpoilerButton } from './SpoilerButton';
import { defaultSpoilerPropSize, SpoilerProps, SpoilerPropSize } from './types';

export const cnSpoiler = cnCanary('Spoiler');

const spoilerOffsetMap: Record<SpoilerPropSize, Space> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

const getContent = (props: SpoilerProps, isOpen: boolean) => {
  if (props.children) {
    return {
      mode: 'blur',
      content: props.children,
    };
  }
  return {
    mode: 'dots',
    content: isOpen ? props.fullText : props.preview,
  };
};

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
  (props, ref) => {
    const {
      preview,
      maxHeight = 96,
      fullText,
      size = defaultSpoilerPropSize,
      lessIcon,
      lessLabel,
      children,
      moreIcon,
      moreLabel,
      className,
      ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useFlag();

    const { mode, content } = getContent(props, isOpen);

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
