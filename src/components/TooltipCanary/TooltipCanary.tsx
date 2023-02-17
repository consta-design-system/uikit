import './Tooltip.css';

import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { Popover } from '##/components/Popover';
import { Text } from '##/components/Text';
import { ThemeContext } from '##/components/Theme';
import { useForkRef } from '##/hooks/useForkRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixPopoverArrow } from '##/mixs/MixPopoverArrow';
import { cnCanary as cn } from '##/utils/bem';

import { useThemeByStatus } from './helpers';
import { TooltipProps, tooltipPropSizesDefault } from './types';

const ARROW_SIZE = 6;
const ARROW_OFFSET = 8;

const cnTooltip = cn('Tooltip');

const renderChildren = (children: React.ReactNode): React.ReactNode => {
  return typeof children === 'string' || typeof children === 'number' ? (
    <Text size="xs">{children}</Text>
  ) : (
    children
  );
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const {
      children,
      size = tooltipPropSizesDefault,
      className,
      status,
      onSetDirection: onSetDirectionProp,
      style,
      isOpen,
      ...rest
    } = props;

    const theme = useThemeByStatus(status);

    const nodeRef = useRef<HTMLDivElement>();
    const forkRef = useForkRef([ref, nodeRef]);

    console.log(isOpen);

    return (
      <ThemeContext.Provider value={theme}>
        <Transition
          nodeRef={nodeRef}
          in={isOpen}
          timeout={animateTimeout}
          unmountOnExit
        >
          {(animate) => (
            <Popover
              {...rest}
              arrowOffset={ARROW_OFFSET + ARROW_SIZE}
              offset={ARROW_SIZE + 4}
              onSetDirection={onSetDirectionProp}
              ref={forkRef}
              className={cnTooltip({ status }, [
                cnMixPopoverAnimate({ animate }),
                className,
              ])}
              style={{
                ['--popover-arrow-size' as string]: `${ARROW_SIZE}px`,
                ['--popover-arrow-offset' as string]: `${ARROW_OFFSET}px`,
                ...style,
              }}
            >
              {(direction) => (
                <>
                  <div className={cnTooltip('Background')} />
                  <div
                    className={cnTooltip('Arrow', [
                      cnMixPopoverArrow({ direction }),
                    ])}
                  />
                  <div className={cnTooltip('Content', { size })}>
                    {renderChildren(children)}
                  </div>
                </>
              )}
            </Popover>
          )}
        </Transition>
      </ThemeContext.Provider>
    );
  },
);
