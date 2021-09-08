import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconCrown } from '../../../icons/IconCrown/IconCrown';
import { createMetadata } from '../../../utils/storybook';
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

import mdx from './User.docs.mdx';

const defaultKnobs = () => ({
  view: select('view', userPropView, userPropViewDefault),
  width: select('width', userPropWidth, userPropWidthDefault),
  size: select('size', userPropSize, userPropSizeDefault),
  status: select('status', ['', ...userPropStatus], ''),
  avatarUrl: text('avatarUrl', ``),
  name: text('Name', `Имя Фамилия`),
  info: text('Info', `Сегодня на Почтамтской`),
  withArrow: boolean('withArrow', false),
  onlyAvatar: boolean('onlyAvatar', false),
  withIconRight: boolean('withIconRight', false),
});

export function Playground() {
  const {
    view,
    width,
    size,
    status,
    avatarUrl,
    name,
    info,
    withArrow,
    onlyAvatar,
    withIconRight,
  } = defaultKnobs();
  const iconRight = !withArrow ? IconCrown : undefined;
  return (
    <div>
      <User
        view={view}
        width={width}
        size={size}
        status={status || undefined}
        avatarUrl={avatarUrl}
        name={name}
        info={info}
        withArrow={withArrow}
        onlyAvatar={onlyAvatar}
        iconRight={(withIconRight ? iconRight : undefined) as never}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Отображение данных/User',
  id: 'components/User',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A39679',
    },
  },
});
