import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import image from '../__mocks__/image.jpeg';
import {
  Avatar,
  avatarPropForm,
  avatarPropFormDefault,
  avatarPropSize,
  avatarPropSizeDefault,
} from '../Avatar';

const Variants = () => {
  const name = useText('name', 'Вадим Матвеев');
  const size = useSelect('size', avatarPropSize, avatarPropSizeDefault);
  const form = useSelect('form', avatarPropForm, avatarPropFormDefault);
  const withImage = useBoolean('withImage');
  const monochrome = useBoolean('monochrome');

  return (
    <Avatar
      url={withImage ? image : undefined}
      name={name}
      size={size}
      form={form}
      monochrome={monochrome}
    />
  );
};

export default Variants;
