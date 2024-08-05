import './Tooltip.css';

import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useForkRef } from '##/hooks/useForkRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixPopoverArrow } from '##/mixs/MixPopoverArrow/MixPopoverArrow';
import { cn } from '##/utils/bem';

import { Direction, Popover } from '../Popover';
import { Text } from '../Text';
import {
  generateDeps,
  generateThemeClassNames,
  ThemeContext,
  useTheme,
} from '../Theme';
import { TooltipProps, tooltipPropSizesDefault } from './types';

const cnTooltip = cn('Tooltip');

const ARROW_SIZE = 6;
const ARROW_OFFSET = 8;

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const {
      isOpen,
      size = tooltipPropSizesDefault,
      status,
      onSetDirection: onSetDirectionProp,
      offset = 0,
      style,
      className,
      children,
      viewportRef,
      ...otherProps
    } = props;

    const contentRef = useRef(null);
    const contentForkedRef = useForkRef([contentRef, ref]);

    const { theme } = useTheme();

    const [direction, setDirection] = useState<Direction | undefined>();

    const onSetDirection = (direction: Direction) => {
      onSetDirectionProp?.(direction);
      setDirection(direction);
    };

    const value = useMemo(() => {
      const tooltipTheme = {
        ...theme,
        color: {
          primary: status ? theme.color.accent : theme.color.invert,
          accent: theme.color.accent,
          invert: theme.color.primary,
        },
      };
      return {
        theme: tooltipTheme,
        themeClassNames: generateThemeClassNames(tooltipTheme),
      };
    }, [generateDeps(theme), status]);

    return (
      <Transition
        in={isOpen}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={contentRef}
      >
        {(animate) => (
          <ThemeContext.Provider value={value}>
            <Popover
              {...otherProps}
              arrowOffset={ARROW_OFFSET + ARROW_SIZE}
              offset={ARROW_SIZE + ARROW_OFFSET / 2 + offset}
              onSetDirection={onSetDirection}
              ref={contentForkedRef}
              viewportRef={viewportRef}
              className={cnTooltip({ status }, [
                className,
                cnMixPopoverAnimate({ animate }),
              ])}
              style={{
                ['--popover-arrow-size' as string]: `${ARROW_SIZE}px`,
                ['--popover-arrow-offset' as string]: `${ARROW_OFFSET}px`,
                ...style,
              }}
            >
              <div className={cnTooltip('Background')} />
              <div
                className={cnTooltip('Arrow', [
                  cnMixPopoverArrow({ direction }),
                ])}
              />
              <div className={cnTooltip('Content', { size })}>
                {typeof children === 'string' ||
                typeof children === 'number' ? (
                  <Text view="primary" size="m" lineHeight="m">
                    {children}
                  </Text>
                ) : (
                  children
                )}
              </div>
            </Popover>
          </ThemeContext.Provider>
        )}
      </Transition>
    );
  },
);
