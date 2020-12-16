import './TableFilterTooltip.css';

import React from 'react';

import { IconFunnel } from '../../../icons/IconFunnel/IconFunnel';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';

const cnTableFilterTooltip = cn('TableFilterTooltip');

type Values = string[];

type Props = {
  options: Array<{
    value: Values[number];
    label: string;
  }>;
  values: Values;
  field: string;
  isOpened: boolean;
  onChange: (field: string, values: Values) => void;
  onToggle: () => void;
  className?: string;
  testId?: string;
};

export const TableFilterTooltip: React.FC<Props> = ({
  field,
  isOpened,
  options,
  values,
  className,
  onChange,
  onToggle,
  testId,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={onToggle}
        className={cnTableFilterTooltip('Button', { isOpened }, [className])}
        iconLeft={IconFunnel}
        data-testid={testId && `${testId}:button:filter.show`}
      />
      {isOpened && buttonRef.current && (
        <Popover
          anchorRef={buttonRef}
          possibleDirections={['downRight', 'downLeft']}
          direction="downRight"
          offset={4}
          arrowOffset={12}
          onClickOutside={onToggle}
        >
          <div
            className={cnTableFilterTooltip('Content')}
            data-testid={testId && `${testId}:popover:filter`}
          >
            <Text as="div" size="xs" view="primary" className={cnTableFilterTooltip('Title')}>
              Фильтровать по условию
            </Text>
            <select
              className={cnTableFilterTooltip('Select')}
              value={[...values]}
              multiple
              onChange={(e): void => {
                onChange(
                  field,
                  Array.from(e.target.selectedOptions).map((option) => option.value),
                );
              }}
              data-testid={testId && `${testId}:field:filter`}
            >
              {options.map((option, index) => (
                <option
                  key={option.value}
                  className={cnTableFilterTooltip('Option')}
                  value={option.value}
                  title={option.label}
                  data-testid={testId && `${testId}:field:filter.option[${index}]`}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Popover>
      )}
    </>
  );
};
