import './SliderPoint.css';

import React, { useEffect } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { generateThemeClassNames, ThemeContext, useTheme } from '../../Theme/Theme';
import { Tooltip } from '../../Tooltip/Tooltip';
import { SliderPointProps } from '../helper';

const cnSliderPoint = cn('SliderPoint');

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
    onKeyPress,
    buttonLabel,
    onFocus,
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

  useEffect(() => {
    focused ? on() : off();
  }, [focused]);

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onFocus?.(e, buttonLabel);
      on();
    }
  };

  const tooltipThemeClassNames = generateThemeClassNames(tooltipTheme);

  const handleMouseAction = (enter: boolean) => {
    if (!disabled) {
      onHover?.(enter);
      enter && on();
      if (enter) on();
      if (!enter && !focused) off();
    }
  };

  const getTooltipPosition = () => {
    if (popoverPosition && buttonRef && buttonRef.current) {
      const { y, height } = buttonRef.current.getBoundingClientRect();
      return {
        x: popoverPosition.x,
        y: y - height + 30,
      };
    }
    return { x: 0, y: 0 };
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onFocus?.(e, null);
      off();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${buttonLabel}-button`}
        className={cnSliderPoint({ hovered, disabled }, [cnMixFocus()])}
        onMouseOver={() => handleMouseAction(true)}
        onMouseOut={() => handleMouseAction(false)}
        onKeyDown={(e) => onKeyPress?.(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={buttonRef}
        tabIndex={0}
        style={{
          ['--slider-button-left' as string]: `${position}%`,
        }}
      />
      {tooltipVisible && withTooltip && popoverPosition && (
        <ThemeContext.Provider
          value={{ theme: tooltipTheme, themeClassNames: tooltipThemeClassNames }}
        >
          <Tooltip
            position={getTooltipPosition()}
            className={cnSliderPoint('Tooltip')}
            direction="downCenter"
            possibleDirections={['downCenter', 'leftDown', 'rightDown']}
          >
            {value}
          </Tooltip>
        </ThemeContext.Provider>
      )}
    </>
  );
};
