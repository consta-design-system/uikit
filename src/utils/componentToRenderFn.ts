import React from 'react';

export function componentToRenderFn<T>(comp: React.FC<T>) {
  return (props: T): React.ReactNode => React.createElement(comp, props);
}
