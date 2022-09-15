import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { IconUser } from '../../../icons/IconUser/IconUser';
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
  const width = useSelect('width', buttonPropWidth, buttonPropWidthDefault);
  const size = useSelect('size', buttonPropSize, buttonPropSizeDefault);
  const view = useSelect('view', buttonPropView, buttonPropViewDefault);
  const form = useSelect('form', buttonPropForm, buttonPropFormDefault);
  const disabled = useBoolean('disabled', false);
  const loading = useBoolean('loading', false);
  const label = useText('label', 'Это кнопка');
  const iconLeft = useBoolean('iconLeft', false);
  const iconRight = useBoolean('iconRight', false);
  const onlyIcon = useBoolean('onlyIcon', false);

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
      // onClick={action('click')}
      iconLeft={iconLeft ? IconUser : undefined}
      iconRight={iconRight ? IconSelect : undefined}
    />
  );
};

export default Variants;
