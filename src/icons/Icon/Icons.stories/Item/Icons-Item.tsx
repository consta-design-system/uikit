import React from 'react';
import { IIcon } from '../../Icon';

export type IIconsItem = {
  icon: React.FC<IIcon>;
  name: string;
} & IIcon;

export const IconsItem: React.FC<IIconsItem> = ({ icon, name, size, view }) => {
  const Icon = icon;
  return (
    <div className={'tpl-grid__fraction text text_align_center'}>
      <Icon size={size} view={view} />
      <div className={'text_size_s text_view_secondary'}>{name}</div>
    </div>
  );
};
