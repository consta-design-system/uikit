import React from 'react';

export function componentIsFunction(Component: React.ElementType): boolean {
  return typeof Component === 'function';
}
