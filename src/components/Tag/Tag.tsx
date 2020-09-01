import './Tag.css';

import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { TagBase } from '../TagBase/TagBase';

type TagBaseProps = React.ComponentProps<typeof TagBase>;

type TagPropMode = 'check' | 'button' | 'cancel' | 'link';

type CommonProps = {
  size?: TagBaseProps['size'];
  label: TagBaseProps['label'];
  group?: TagBaseProps['group'];
  icon?: React.FC<IconProps>;
  iconSize?: IconProps['size'];
  children?: never;
};

type PropsWithModeButton = CommonProps & {
  mode?: 'button';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  checked?: never;
  onChange?: never;
  onCancel?: never;
};

type PropsWithModeLink = CommonProps & {
  mode: 'link';
  checked?: never;
  onChange?: never;
  onCancel?: never;
};

type PropsWithModeCheck = CommonProps & {
  mode: 'check';
  onChange: ({ e, checked }: { e?: React.MouseEvent; checked: boolean }) => void;
  checked: boolean;
  onClick?: never;
  onCancel?: never;
};

type PropsWithModeCancel = CommonProps & {
  mode: 'cancel';
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: never;
  onChange?: never;
  checked?: never;
};

type Props<ROLE extends TagPropMode = 'button'> = ROLE extends 'button'
  ? PropsWithModeButton & Omit<JSX.IntrinsicElements['button'], keyof PropsWithModeButton>
  : {} & ROLE extends 'check'
  ? PropsWithModeCheck & Omit<JSX.IntrinsicElements['button'], keyof PropsWithModeCheck>
  : {} & ROLE extends 'cancel'
  ? PropsWithModeCancel & Omit<JSX.IntrinsicElements['div'], keyof PropsWithModeCancel>
  : {} & ROLE extends 'link'
  ? PropsWithModeLink & Omit<JSX.IntrinsicElements['a'], keyof PropsWithModeLink>
  : {};

type ForwardRefRender<ROLE extends TagPropMode> = (
  props: Props<ROLE>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

function forwardRef<ROLE extends TagPropMode>(render: ForwardRefRender<ROLE>) {
  return React.forwardRef<HTMLElement, Props<ROLE>>(render);
}

type Component = <ROLE extends TagPropMode>(
  props: Props<ROLE> & React.RefAttributes<HTMLElement>,
) => React.ReactElement | null;

export const cnTag = cn('Tag');

export function getParams(
  mode: TagPropMode,
  checked?: PropsWithModeCheck['checked'],
  onClick?: React.MouseEventHandler,
  onChange?: PropsWithModeCheck['onChange'],
  onCancel?: PropsWithModeCancel['onCancel'],
): {
  view?: TagBaseProps['view'];
  onClick?: TagBaseProps['onClick'];
  onCancel?: TagBaseProps['onCancel'];
  as: keyof JSX.IntrinsicElements;
} {
  switch (mode) {
    case 'button':
      return {
        view: 'filled',
        onClick,
        as: 'button',
      };
    case 'link':
      return {
        view: 'filled',
        onClick,
        as: 'a',
      };
    case 'check':
      return {
        view: checked ? 'filled' : 'stroked',
        onClick:
          typeof onChange === 'function'
            ? (e: React.MouseEvent) => onChange({ e, checked: !checked })
            : undefined,
        as: 'button',
      };
    case 'cancel':
      return {
        view: 'filled',
        onCancel,
        as: 'div',
      };
  }
}

export const Tag: Component = forwardRef((props, ref) => {
  const { mode = 'button', className, onChange, checked, onCancel, onClick, ...otherProps } = props;

  const params = getParams(mode, checked, onClick, onChange, onCancel);

  return <TagBase {...otherProps} {...params} ref={ref} className={cnTag({ mode }, [className])} />;
});
