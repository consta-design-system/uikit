import React from 'react';
import { IFileIcon } from '../../FileIcon';

export type IIconsItem = {
  icon: React.FC<IFileIcon>;
  name: string;
} & IFileIcon;

export const IconsItem: React.FC<IIconsItem> = ({ icon, name, size }) => {
  const Icon = icon;
  return (
    <div className={'tpl-grid__fraction text text_align_center'}>
      <Icon size={size} />
      <div className={'text_size_s text_view_secondary'}>{name}</div>
    </div>
  );
};
