import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { IconCrown } from '../../../icons/IconCrown/IconCrown';
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

type WithUndefindValue = <T extends unknown>(
  value: T,
) => Exclude<T, 'undefined'> | undefined;

const valueWithUndefined: WithUndefindValue = (value) => {
  return value !== 'undefined'
    ? (value as Exclude<typeof value, 'undefined'>)
    : undefined;
};

type OptionsWithUndefined = <T extends unknown>(
  value: readonly T[] | T[],
) => Array<T | 'undefined'>;

const optionsWithUndefined: OptionsWithUndefined = (options) => {
  return ['undefined', ...options];
};

const Variants = () => {
  const view = useSelect('view', userPropView, userPropViewDefault);
  const width = useSelect('width', userPropWidth, userPropWidthDefault);
  const size = useSelect('size', userPropSize, userPropSizeDefault);
  const status = useSelect(
    'status',
    optionsWithUndefined(userPropStatus),
    'undefined',
  );
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
        status={valueWithUndefined(status)}
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
