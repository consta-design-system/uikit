import './SelectItem.css';

import React from 'react';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Avatar } from '../../Avatar/Avatar';
import { Checkbox, CheckboxPropSize } from '../../Checkbox/Checkbox';
import { PropSize } from '../types';

type SelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    subLabel?: string;
    url?: string;
    active: boolean;
    hovered: boolean;
    multi: boolean;
    isUserSelect?: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnSelectItem = cn('SelectItem');

// в дальнейшем уберем обязательность onChange у Checkbox
// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const sizeCheckboxMap: Record<PropSize, CheckboxPropSize> = {
  xs: 'm',
  s: 'm',
  m: 'l',
  l: 'l',
};

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const {
    className,
    label,
    subLabel,
    url,
    active,
    hovered,
    multi,
    isUserSelect = false,
    size,
    indent,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cnSelectItem({ active, hovered, multi, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      {multi && !isUserSelect && (
        <Checkbox
          className={cnSelectItem('Checkbox')}
          checked={active}
          onChange={emptyFunction}
          size={getSizeByMap(sizeCheckboxMap, size)}
        />
      )}
      {isUserSelect && (
        <div className={cnSelectItem('AvatarBlock')}>
          <Avatar url={url} name={label} />
          {active && (
            <div className={cnSelectItem('AvatarCheckIcon')}>
              <IconCheck className={cnSelectItem('CheckIcon')} />
            </div>
          )}
        </div>
      )}
      {!isUserSelect || !subLabel ? (
        label
      ) : (
        <div className={cnSelectItem('SubUserInfo')}>
          <div>{label}</div>
          <div className={cnSelectItem('SubUserLabel')}>{subLabel}</div>
        </div>
      )}
    </div>
  );
};
