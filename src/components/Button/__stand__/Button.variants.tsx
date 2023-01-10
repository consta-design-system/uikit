import { IconSelect } from '@consta/icons/IconSelect';
import { IconUser } from '@consta/icons/IconUser';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  Button,
  buttonPropForm,
  buttonPropFormDefault,
  buttonPropSize,
  buttonPropSizeDefault,
  buttonPropView,
  buttonPropViewDefault,
  buttonPropWidth,
  buttonPropWidthDefault,
} from '../Button';

const Variants = () => {
  const size = useSelect('size', buttonPropSize, buttonPropSizeDefault);
  const view = useSelect('view', buttonPropView, buttonPropViewDefault);
  const form = useSelect('form', buttonPropForm, buttonPropFormDefault);
  const disabled = useBoolean('disabled', false);
  const loading = useBoolean('loading', false);
  const label = useText('label', 'Это кнопка');
  const iconLeft = useBoolean('iconLeft', false);
  const iconRight = useBoolean('iconRight', false);
  const onlyIcon = useBoolean(
    'onlyIcon',
    false,
    Boolean(iconLeft) || Boolean(iconRight),
  );
  const width = useSelect(
    'width',
    buttonPropWidth,
    buttonPropWidthDefault,
    !onlyIcon,
  );

  return (
    <Button
      width={width}
      size={size}
      view={view}
      form={form}
      disabled={disabled}
      loading={loading}
      label={label}
      onlyIcon={onlyIcon}
      onClick={() => console.log('click')}
      iconLeft={iconLeft ? IconUser : undefined}
      iconRight={iconRight ? IconSelect : undefined}
    />
  );
};

export default Variants;
