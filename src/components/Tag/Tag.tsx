import { IconComponent, IconProps } from '@consta/icons/Icon';
import React, { forwardRef, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { TagBase } from '../TagBase/TagBase';

type TagBaseProps = React.ComponentProps<typeof TagBase>;

export const tagPropMode = [
  'button',
  'check',
  'cancel',
  'link',
  'info',
] as const;
export const tagPropModeDefault = tagPropMode[0];
type TagPropMode = typeof tagPropMode[number];

type CommonProps = {
  size?: TagBaseProps['size'];
  label: TagBaseProps['label'];
  group?: TagBaseProps['group'];
  icon?: IconComponent;
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
  onChange: ({
    e,
    checked,
  }: {
    e?: React.MouseEvent;
    checked: boolean;
  }) => void;
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

type PropsWithModeInfo = CommonProps & {
  mode: 'info';
  onCancel?: never;
  onClick?: never;
  onChange?: never;
  checked?: never;
};

type Props<ROLE extends TagPropMode = 'button'> = ROLE extends 'button'
  ? PropsWithModeButton &
      Omit<JSX.IntrinsicElements['button'], keyof PropsWithModeButton>
  : {} & ROLE extends 'check'
  ? PropsWithModeCheck &
      Omit<JSX.IntrinsicElements['button'], keyof PropsWithModeCheck>
  : {} & ROLE extends 'cancel'
  ? PropsWithModeCancel &
      Omit<JSX.IntrinsicElements['span'], keyof PropsWithModeCancel>
  : {} & ROLE extends 'link'
  ? PropsWithModeLink &
      Omit<JSX.IntrinsicElements['a'], keyof PropsWithModeLink>
  : {} & ROLE extends 'info'
  ? PropsWithModeInfo &
      Omit<JSX.IntrinsicElements['span'], keyof PropsWithModeInfo>
  : {};

type TagRender = <ROLE extends TagPropMode>(
  props: Props<ROLE>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

type TagComponent = <ROLE extends TagPropMode>(
  props: Props<ROLE> & React.RefAttributes<HTMLElement>,
) => React.ReactElement | null;

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
  withAction?: TagBaseProps['withAction'];
  as: keyof JSX.IntrinsicElements;
} {
  switch (mode) {
    case 'button':
      return {
        view: 'filled',
        onClick,
        as: 'button',
        withAction: true,
      };
    case 'link':
      return {
        view: 'filled',
        onClick,
        as: 'a',
        withAction: true,
      };
    case 'check':
      return {
        view: checked ? 'filled' : 'stroked',
        onClick:
          typeof onChange === 'function'
            ? (e: React.MouseEvent) => onChange({ e, checked: !checked })
            : undefined,
        as: 'button',
        withAction: true,
      };
    case 'cancel':
      return {
        view: 'filled',
        onCancel,
        as: 'span',
      };
    case 'info':
      return {
        view: 'filled',
        as: 'span',
      };
  }
}

export const COMPONENT_NAME = 'Tag' as const;

const TagRenter: TagRender = (props, ref) => {
  const tagRef = useRef<HTMLDivElement>(null);
  const {
    mode = tagPropModeDefault,
    onChange,
    checked,
    onCancel,
    onClick,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, tagRef);
  const params = getParams(mode, checked, onClick, onChange, onCancel);

  return (
    <TagBase {...otherProps} {...params} ref={useForkRef([ref, tagRef])} />
  );
};

export const Tag = forwardRef(TagRenter) as TagComponent;
