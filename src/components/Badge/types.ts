import { IconComponent } from '@consta/icons/Icon';

export const badgePropSize = ['xs', 's', 'm', 'l'] as const;
export type BadgePropSize = typeof badgePropSize[number];
export const badgePropSizeDefault: BadgePropSize = 'm';

export const badgePropView = ['filled', 'stroked', 'tinted'] as const;
export type BadgePropView = typeof badgePropView[number];
export const badgePropViewDefault: BadgePropView = badgePropView[0];

export const badgePropStatus = [
  'normal',
  'success',
  'warning',
  'alert',
  'system',
  'disabled',
] as const;
export type BadgePropStatus = typeof badgePropStatus[number] | 'error';
export const badgePropStatusDefault: BadgePropStatus = badgePropStatus[0];

export const badgePropForm = ['default', 'round'] as const;
export type BadgePropForm = typeof badgePropForm[number];
export const badgePropFormDefault: BadgePropForm = badgePropForm[0];

export type BadgeProps = {
  size?: BadgePropSize;
  view?: BadgePropView;
  /**
   * "error" deprecated since version 5.13.0 use "alert"
   */
  status?: BadgePropStatus;
  form?: BadgePropForm;
  minified?: boolean;
  /**
   * @deprecated since version 4.17.2 use iconLeft
   */
  icon?: IconComponent;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  label?: string;
  children?: never;
};
