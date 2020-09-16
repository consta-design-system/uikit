import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './User.mdx';

const defaultKnobs = () => ({
  view: select('view', userPropView, userPropViewDefault),
  width: select('width', userPropWidth, userPropWidthDefault),
  size: select('size', userPropSize, userPropSizeDefault),
  status: select('status', ['', ...userPropStatus], ''),
  avatarUrl: text(
    'avatarUrl',
    `https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png`,
  ),
  name: text('Name', `Имя Фамилия`),
  info: text('Info', `Сегодня на Почтамской`),
  withArrow: boolean('withArrow', false),
  onlyAvatar: boolean('onlyAvatar', false),
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
  } = defaultKnobs();
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
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/User',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
