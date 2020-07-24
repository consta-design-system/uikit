import React from 'react';

import { IconProps } from '../../Icon';

export type IconsItemProps = {
  icon: React.FC<IconProps>;
  name: string;
} & IconProps;

export const IconsItem: React.FC<IconsItemProps> = ({ icon, name, size, view }) => {
  const Icon = icon;
  return (
    <div className="tpl-grid__fraction text text_align_center">
      <Icon size={size} view={view} />
      <div className="text_size_s text_view_secondary">{name}</div>
    </div>
  );
};
