import React, { useState } from 'react';

type RenderProps<T> = {
  value?: T;
  onChange: (value: T) => void;
  onBlur: () => void;
};
type ValueKeeperProps<T> = {
  render: (props: RenderProps<T>) => React.ReactNode;
  onChange?: (value: T) => void;
  onBlur?: () => void;
};

function ValueKeeper<T>({ render, onChange, onBlur }: ValueKeeperProps<T>) {
  const [value, setValue] = useState<T>();

  const handleChange = (value: T) => {
    setValue(value);
    onChange && onChange(value);
  };

  const handleBlur = () => onBlur && onBlur();

  return (
    <React.Fragment>{render({ value, onChange: handleChange, onBlur: handleBlur })}</React.Fragment>
  );
}

export default ValueKeeper;
