import { IconCrown } from '@consta/icons/IconCrown';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  User,
  userPropSize,
  userPropSizeDefault,
  userPropStatus,
  userPropView,
  userPropViewDefault,
  userPropWidth,
  userPropWidthDefault,
} from '../User';

const Variants = () => {
  const view = useSelect('view', userPropView, userPropViewDefault);
  const width = useSelect('width', userPropWidth, userPropWidthDefault);
  const size = useSelect('size', userPropSize, userPropSizeDefault);
  const status = useSelect('status', userPropStatus);
  const avatarUrl = useText('avatarUrl', ``);
  const name = useText('Name', `Имя Фамилия`);
  const info = useText('Info', `Сегодня на Почтамтской`);
  const withArrow = useBoolean('withArrow', false);
  const onlyAvatar = useBoolean('onlyAvatar', false);
  const withIconRight = useBoolean('withIconRight', false);

  const iconRight = !withArrow ? IconCrown : undefined;

  return (
    <div>
      <User
        view={view}
        width={width}
        size={size}
        status={status}
        avatarUrl={avatarUrl}
        name={name}
        info={info}
        withArrow={withArrow}
        onlyAvatar={onlyAvatar}
        iconRight={(withIconRight ? iconRight : undefined) as never}
      />
    </div>
  );
};

export default Variants;
