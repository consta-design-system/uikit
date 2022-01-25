import './SliderPoint.css';

import React, { useEffect, useRef } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { generateThemeClassNames, ThemeContext, useTheme } from '../../Theme/Theme';
import { Tooltip } from '../../Tooltip/Tooltip';
import { SliderPointProps, TrackPosition } from '../helper';

const cnSliderPoint = cn('SliderPoint');

const getTooltipPosition = (
  popoverPosition: TrackPosition,
  buttonRef: React.RefObject<HTMLButtonElement>,
) => {
  if (popoverPosition && buttonRef && buttonRef.current) {
    const { y, height } = buttonRef.current.getBoundingClientRect();
    return {
      x: popoverPosition.x,
      y: y - height + 30,
    };
  }
  return { x: 0, y: 0 };
};

export const SliderPoint = (props: SliderPointProps) => {
  const {
    hovered,
    onHover,
    value,
    position,
    disabled,
    withTooltip,
    focused,
    popoverPosition,
    buttonRef,
    handlePress,
    onKeyPress,
    tooltipFormatter,
    buttonLabel,
    onFocus,
    tooltipZIndex,
    ...otherProps
  } = props;

  const [tooltipVisible, { on, off }] = useFlag(false);

  const { theme } = useTheme();

  const tooltipTheme = {
    ...theme,
    color: {
      primary: theme.color.invert,
      accent: theme.color.accent,
      invert: theme.color.primary,
    },
  };

  const tooltipThemeClassNames = generateThemeClassNames(tooltipTheme);

  useEffect(() => {
    focused ? on() : off();
  }, [focused]);

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent) => {
    if (!disabled) {
      onFocus?.(e, buttonLabel);
      on();
    }
  };

  const handleMouseAction = (enter: boolean) => {
    if (!disabled) {
      onHover?.(enter);
      enter && on();
      if (enter) on();
      if (!enter && !focused) off();
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!disabled) {
      onFocus?.(e, null);
      off();
    }
  };

  const pointRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label={`${buttonLabel}-button`}
        className={cnSliderPoint({ hovered, disabled }, [!disabled ? cnMixFocus() : ''])}
        onMouseOver={() => handleMouseAction(true)}
        onMouseOut={() => handleMouseAction(false)}
        onMouseDown={() => handlePress?.(buttonLabel)}
        onTouchStart={() => handlePress?.(buttonLabel)}
        onKeyDown={(e) => onKeyPress?.(e, buttonLabel)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleFocus}
        ref={useForkRef([buttonRef, pointRef])}
        tabIndex={0}
        style={{
          ['--slider-button-left' as string]: `${position}%`,
        }}
        {...otherProps}
      />
      {tooltipVisible && withTooltip && popoverPosition && (
        <ThemeContext.Provider
          value={{ theme: tooltipTheme, themeClassNames: tooltipThemeClassNames }}
        >
          <Tooltip
            position={getTooltipPosition(popoverPosition, buttonRef || pointRef)}
            className={cnSliderPoint('Tooltip')}
            direction="downCenter"
            possibleDirections={['downCenter', 'leftDown', 'rightDown']}
            style={{ zIndex: tooltipZIndex }}
          >
            {tooltipFormatter ? tooltipFormatter(value) : value}
          </Tooltip>
        </ThemeContext.Provider>
      )}
    </>
  );
};
