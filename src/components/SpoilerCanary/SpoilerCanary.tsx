import './Spoiler.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { getElementSize } from '##/hooks/useComponentSize';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cnCanary } from '##/utils/bem';

import { SpoilerButton } from './SpoilerButton';
import {
  defaultSpoilerPropButtonAlign,
  defaultSpoilerPropSize,
  SpoilerMode,
  SpoilerProps,
  SpoilerPropSize,
} from './types';

export const cnSpoiler = cnCanary('Spoiler');

const spoilerOffsetMap: Record<SpoilerPropSize, Space> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

const getContent = (
  { children, content, preview, lineClamp }: SpoilerProps,
  isOpen: boolean,
): [SpoilerMode, React.ReactNode, React.ReactNode] => {
  if (lineClamp) {
    return ['lineClamp', children, children];
  }
  if (children) {
    return ['blur', children, children];
  }
  return ['toggle', preview, content];
};

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
  (props, ref) => {
    const {
      preview,
      maxHeight,
      content,
      size = defaultSpoilerPropSize,
      lessIcon,
      lessLabel,
      children,
      moreIcon,
      moreLabel,
      className,
      lineClamp,
      buttonIndent,
      buttonAlign = defaultSpoilerPropButtonAlign,
      style,
      ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useFlag();
    const [mode, previewContent, fullContent] = getContent(props, isOpen);
    const refs = useRefs<HTMLDivElement>(3);
    const sizes = useResizeObserved(refs, getElementSize);
    const visibleMoreButton = sizes[1].height > sizes[0].height;

    return (
      <div
        {...otherProps}
        className={cnSpoiler({ size }, [className])}
        ref={useForkRef([ref, refs[2]])}
        style={{
          ...style,
          ...(typeof maxHeight === 'number' && {
            ['--spoiler-content-max-height' as string]: `${maxHeight}px`,
          }),
          ...(typeof lineClamp === 'number' && {
            ['--spoiler-content-line-clamp' as string]: lineClamp,
          }),
          ...(typeof sizes[2].width === 'number' && {
            ['--spoiler-content-width' as string]: `${sizes[2].width}px`,
          }),
        }}
      >
        <Text
          ref={refs[0]}
          className={cnSpoiler('Content', {
            mode,
            hidden: isOpen || !visibleMoreButton,
          })}
          size={size}
        >
          {previewContent}
        </Text>
        <Text
          ref={refs[1]}
          className={cnSpoiler('Content', {
            hidden: !isOpen && visibleMoreButton,
          })}
          size={size}
        >
          {fullContent}
        </Text>
        {visibleMoreButton && (
          <div
            className={cnSpoiler('ButtonWrapper', { align: buttonAlign }, [
              cnMixSpace({
                mT:
                  typeof buttonIndent === 'undefined'
                    ? spoilerOffsetMap[size]
                    : buttonIndent,
              }),
            ])}
          >
            <SpoilerButton
              className={cnSpoiler('Button')}
              lessIcon={lessIcon}
              lessLabel={lessLabel}
              moreIcon={moreIcon}
              moreLabel={moreLabel}
              onClick={setIsOpen.toggle}
              open={isOpen}
              size={size}
            />
          </div>
        )}
      </div>
    );
  },
);
