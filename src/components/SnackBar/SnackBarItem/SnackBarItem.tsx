import './SnackBarItem.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { useEffect, useState } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { useTheme } from '##/components/Theme';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { isNumber, isString } from '##/utils/type-guards';

import { SnackBarActionButton } from '../SnackBarActionButton';
import { SnackBarLine } from '../SnackBarLine/SnackBarLine';
import { SnackBarProgress } from '../SnackBarProgress';
import { SnackBarTimer } from '../SnackBarTimer/SnackBarTimer';
import {
  SnackBarItemComponent,
  SnackBarItemProps,
  snackBarItemStatusDefault,
  snackBarPropFormDefault,
  snackBarPropProgressViewDefault,
  SnackBarTimerPropOnMount,
} from '../types';

const defaultInitialTimerTime = 3;

export const cnSnackBarItem = cn('SnackBarItem');

const getAutoCloseTime = (
  autoClose: boolean | number | undefined,
): number | false => {
  if (autoClose) {
    if (typeof autoClose === 'number') {
      return autoClose;
    }
    return defaultInitialTimerTime;
  }
  return false;
};

export const SnackBarItemRender = (
  props: SnackBarItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    onClose,
    autoClose,
    showProgress,
    icon: Icon,
    form = snackBarPropFormDefault,
    message,
    actions,
    status = snackBarItemStatusDefault,
    onAutoClose: onAutoCloseProp,
    className,
    progressView = snackBarPropProgressViewDefault,
    progress,
    style,
    ...otherProps
  } = props;

  const { themeClassNames } = useTheme();

  const [timerFunctions, setTimerFunctions] = useState<{
    start: () => void;
    pause: () => void;
  } | null>(null);
  const [hover, { on: onHover, off: offHover }] = useFlag(false);
  const [timeIsOver, { on: onTimeIsOver }] = useFlag(false);
  const handleMountTimer: SnackBarTimerPropOnMount = (timerFunctions) =>
    setTimerFunctions(timerFunctions);
  const handleMouseEnter = () => onHover();
  const handleMouseLeave = () => offHover();
  const autoCloseTime = getAutoCloseTime(autoClose);
  const hideAutoCloseTimer =
    showProgress === undefined ||
    !(isNumber(autoCloseTime) && autoCloseTime > 0);
  const onAutoClose = () => {
    if (onAutoCloseProp) {
      onAutoCloseProp();
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (!timeIsOver) {
      if (hover) {
        timerFunctions && timerFunctions.pause();
      } else {
        timerFunctions && timerFunctions.start();
      }
    }
  }, [hover, timeIsOver, timerFunctions]);

  const handleTimeIsOver = () => {
    onTimeIsOver();
    onAutoClose();
  };

  const handleClose = onClose ? () => onClose() : undefined;
  const visibleProgress = isNumber(progress) || progress === true;

  return (
    <div
      ref={ref}
      className={cnSnackBarItem({ showProgress, form }, [
        cnMixFlex({ flex: 'flex', gap: 'm' }),
        cnMixSpace({ p: 'm' }),
        themeClassNames.color.accent,
        className,
      ])}
      onMouseEnter={autoCloseTime ? handleMouseEnter : undefined}
      onMouseLeave={autoCloseTime ? handleMouseLeave : undefined}
      style={{
        ...style,
        ['--snack-bar-item-bg' as string]: `var(--color-bg-${status})`,
      }}
      {...otherProps}
    >
      {autoCloseTime && showProgress !== 'line' && (
        <SnackBarTimer
          className={cnSnackBarItem('Timer')}
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
          hidden={hideAutoCloseTimer}
        />
      )}
      {Icon &&
        ((hideAutoCloseTimer && showProgress === 'timer') ||
          showProgress !== 'timer') && (
          <Icon className={cnSnackBarItem('Icon')} size="m" />
        )}
      <div
        className={cnSnackBarItem(
          'Content',
          cnMixFlex({ flex: 'flex', gap: 's', direction: 'column' }),
        )}
      >
        <div className={onClose ? cnMixSpace({ pR: 'm' }) : undefined}>
          {isString(message) || isNumber(message) ? (
            <Text
              view="primary"
              size="m"
              className={cnSnackBarItem('Message')}
              lineHeight="s"
            >
              {message}
            </Text>
          ) : (
            message
          )}
        </div>
        {(visibleProgress || actions) && (
          <div
            className={cnSnackBarItem('Actions', [
              cnMixFlex({
                flex: 'flex',
                align: 'flex-end',
                gap: 's',
                justify: 'flex-end',
              }),
            ])}
          >
            {actions && (
              <SnackBarActionButton
                className={cnSnackBarItem('ActionButtons')}
                actions={actions}
                form={form}
              />
            )}
            {visibleProgress && (
              <SnackBarProgress progress={progress} view={progressView} />
            )}
          </div>
        )}
      </div>

      {onClose && (
        <Button
          className={cnSnackBarItem('CloseButton')}
          view="clear"
          iconLeft={IconClose}
          form="round"
          type="button"
          size="xs"
          onClick={handleClose}
        />
      )}
      {autoCloseTime && showProgress === 'line' && (
        <SnackBarLine
          className={cnSnackBarItem('Line')}
          onMount={handleMountTimer}
          onTimeIsOver={handleTimeIsOver}
          startTime={autoCloseTime}
        />
      )}
    </div>
  );
};

export const SnackBarItem = React.forwardRef(
  SnackBarItemRender,
) as SnackBarItemComponent;
