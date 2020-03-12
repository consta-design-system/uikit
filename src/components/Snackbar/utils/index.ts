import { CommonProps as SnackbarItemProps } from '../SnackbarItem';

export type Id = string;

export function generateId(): Id {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  return `${('000' + first.toString(36)).slice(-3)}${('000' + second.toString(36)).slice(-3)}`;
}

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getIndex = (id: Id, arr: SnackbarItemProps[]) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) return i;
  }

  return -1;
};
