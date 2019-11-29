import React, { memo } from 'react';

import './styles.css';
import bem from '../../../utils/bem';
import { Checkbox } from '../../';
import { WpSize } from '../../types';

const IconPlus = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={className}
  >
    <path d="M9 2H7v5H2v2h5v5h2V9h5V7H9V2z" />
  </svg>
);

type Props = {
  value: string;
  isSelected: boolean;
  isFocused: boolean;
  isAllOption?: boolean;
  isSubOption?: boolean;
  isMulti?: boolean;
  isIntermediate?: boolean;
  isNewOption?: boolean;
  focusedRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  onSelect: (value: string) => void;
  wpSize: WpSize;
};

const b = bem('select-option');

const OptionComponent: React.FC<Props> = ({
  value,
  isFocused,
  isAllOption,
  isSubOption,
  isMulti,
  isSelected,
  isIntermediate,
  isNewOption,
  focusedRef,
  children,
  onSelect,
  wpSize,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    onSelect(value);
  };

  return (
    <div
      className={b({
        selected: isSelected,
        focused: isFocused,
        new: isNewOption,
        allOption: isAllOption,
        isSubOption,
        size: wpSize,
      })}
      key={value}
      data-value={value}
      ref={focusedRef}
      onClick={handleClick}
    >
      {isMulti && (
        <Checkbox
          className={b('check')}
          wpSize="m"
          value={isSelected}
          onChange={() => {}}
          tabIndex={-1}
          intermediate={isIntermediate}
        />
      )}
      <div className={b('label')}>{children}</div>
    </div>
  );
};

export const EmptyOption: React.FC<{}> = ({ children }) => (
  <div
    className={b({
      empty: true,
    })}
  >
    <div className={b('label')}>{children}</div>
  </div>
);

export const NewOption: React.FC<{ placeholder: string }> = ({ placeholder, children }) => (
  <span className={b('new-label')}>
    <IconPlus className={b('icon')} />
    {placeholder} <b className={b('new-value')}>«{children}» </b>
  </span>
);

export const Option = memo(OptionComponent);
