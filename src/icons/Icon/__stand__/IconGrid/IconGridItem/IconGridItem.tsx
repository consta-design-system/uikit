import React from 'react';

import { IconComponent, IconProps } from '##/icons/Icon';

export type IconsItemProps = {
  icon: IconComponent;
  name: string;
} & IconProps;

export const IconGridItem: React.FC<IconsItemProps> = ({
  icon,
  name,
  size,
  view,
}) => {
  const Icon = icon;
  return (
    <div className="tpl-grid__fraction text text_align_center">
      <Icon size={size} view={view} />
      <div className="text_size_s text_view_secondary">{name}</div>
    </div>
  );
};
