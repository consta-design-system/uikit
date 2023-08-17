import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { TextField } from '##/components/TextField';
import { withDefaultProps } from '##/hocs/withDefaultProps/withDefaultProps';

const CustomButton = withDefaultProps(Button, {
  size: 'm',
  view: 'secondary',
  iconLeft: IconDinosaur,
});

const CustomText = withDefaultProps(Text, {
  size: 'xl',
  view: 'alert',
  weight: 'semibold',
});

const CustomTextField = withDefaultProps(TextField, {
  size: 'xs',
  form: 'brick',
  status: 'alert',
  label: 'Поле ввода',
});

export const WithDefaultPropsExample = () => (
  <Example>
    <CustomButton label="Это кнопка" />
    <CustomText>Пример</CustomText>
    <CustomTextField />
  </Example>
);
