import { useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  Avatar,
  avatarPropForm,
  avatarPropFormDefault,
  avatarPropSize,
  avatarPropSizeDefault,
} from '../Avatar';

const Variants = () => {
  const url = useText('url', '');
  const name = useText('name', 'Вадим Матвеев');
  const size = useSelect('size', avatarPropSize, avatarPropSizeDefault);
  const form = useSelect('form', avatarPropForm, avatarPropFormDefault);

  return <Avatar url={url} name={name} size={size} form={form} />;
};

export default Variants;
