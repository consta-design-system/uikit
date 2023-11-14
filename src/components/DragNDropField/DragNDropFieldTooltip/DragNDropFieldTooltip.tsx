import './DragNDropFieldTooltip.css';

import React, { useEffect } from 'react';

import { Text } from '##/components/Text/Text';
import { Tooltip } from '##/components/TooltipCanary';
import { useFlag } from '##/hooks/useFlag';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

type DragNDropFieldTooltipProps = {
  anchorRef: React.RefObject<HTMLElement>;
  errors: string[];
};

const cnDragNDropFieldTooltip = cn('DragNDropFieldTooltip');

export const DragNDropFieldTooltip: React.FC<DragNDropFieldTooltipProps> = ({
  anchorRef,
  errors,
}) => {
  const [isHidden, setIsOpen] = useFlag();

  useEffect(() => {
    setIsOpen[errors.length > 0 ? 'on' : 'off']();
  }, [errors]);

  return (
    <Tooltip
      isOpen={isHidden}
      anchorRef={anchorRef}
      status="alert"
      size="l"
      isInteractive={false}
      onClickOutside={setIsOpen.off}
    >
      <Text
        size="s"
        view="primary"
        lineHeight="m"
        className={cnDragNDropFieldTooltip('Text')}
      >
        {errors.length === 1 ? (
          errors[0]
        ) : (
          <ul
            className={cnDragNDropFieldTooltip('List', [
              cnMixSpace({ pL: 'xl' }),
            ])}
          >
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </Text>
    </Tooltip>
  );
};
