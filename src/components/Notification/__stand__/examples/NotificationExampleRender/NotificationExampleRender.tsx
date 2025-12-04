import './NotificationExampleRender.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { File } from '##/components/File';
import { Tag } from '##/components/Tag';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  defaultDateFormat,
  Notification,
  NotificationCaption,
  NotificationItem,
} from '../../..';
import photo from './photo.jpg';

const cnNotificationExampleRender = cn('NotificationExampleRender');

type Item = {
  label?: string;
  userName?: string;
  content: string;
  date: Date;
  read: boolean;
  buttons?: {
    label: string;
    onClick: () => void;
    icon: IconComponent;
    view: 'primary' | 'ghost';
  }[];
  docs?: { label: string; onClick: () => void; ext: string }[];
  tags?: string[];
  photo?: string;
};

const items: Item[] = [
  {
    label: 'Приглашение в группу ',
    content: 'Вас пригласили в группу “Чаепительный чат”',
    date: new Date(),
    read: false,
    buttons: [
      {
        label: 'Принять приглашение',
        onClick: () => {},
        icon: IconCheck,
        view: 'primary',
      },
      {
        label: 'Отклонить',
        onClick: () => {},
        icon: IconClose,
        view: 'ghost',
      },
    ],
  },
  {
    userName: 'Степанова Ольга Дмитриевна',
    content:
      'Приветушки! Скидываю доки по проекту, глянь пожалуйста сегодня до 16:00',
    date: new Date(),
    read: false,
    docs: [
      {
        label: 'Документ 1',
        onClick: () => {},
        ext: 'pdf',
      },
      {
        label: 'Документ 2',
        onClick: () => {},
        ext: 'docx',
      },
      {
        label: 'Документ 3',
        onClick: () => {},
        ext: 'xlsx',
      },
      {
        label: 'Документ 4',
        onClick: () => {},
        ext: 'pptx',
      },
    ],
  },
  {
    userName: 'Мамулик',
    content:
      'Глянь на него, опять утащил банан! Будешь ехать домой, купи Халку канатик',
    photo,
    tags: ['tag1', 'tag2', 'tag3'],
    date: new Date(),
    read: true,
  },
];

const RenderItem = ({
  label,
  userName,
  content,
  date,
  read,
  buttons,
  docs,
  tags,
  photo,
}: Item) => (
  <NotificationItem
    key={userName || label}
    className={cnMixSpace({ mB: 'm' })}
    title={label || userName}
    userName={userName}
    caption={[
      <NotificationCaption key="date">
        {defaultDateFormat(date)}
      </NotificationCaption>,
      docs?.length ? (
        <NotificationCaption key="docs">
          {docs.length} документов
        </NotificationCaption>
      ) : undefined,
      tags?.length
        ? tags.map((tag) => (
            <Tag key={`tag-${tag}`} size="xs" mode="info" label={tag} />
          ))
        : undefined,
    ]}
    read={read}
    content={
      <div className={cnMixFlex({ direction: 'column', gap: 'xs' })}>
        <div className={cnMixFlex({ direction: 'row', gap: 's' })}>
          <Text size="s">{content}</Text>
          {photo && (
            <img
              className={cnNotificationExampleRender('Photo')}
              src={photo}
              alt={content}
            />
          )}
        </div>
        {docs && (
          <div className={cnMixFlex({ direction: 'row', gap: 's' })}>
            {docs.map(({ label, onClick, ext }) => (
              <File
                size="m"
                key={label}
                onClick={onClick}
                extension={ext}
                title={`${label}.${ext}`}
              />
            ))}
          </div>
        )}
        {buttons && (
          <div className={cnMixFlex({ direction: 'row', gap: 's' })}>
            {buttons.map(({ label, onClick, icon, view }) => (
              <Button
                size="xs"
                key={label}
                onClick={onClick}
                iconLeft={icon}
                label={label}
                view={view}
              />
            ))}
          </div>
        )}
      </div>
    }
  />
);

export const NotificationExampleRender = () => (
  <Example col={1}>
    <Notification
      className={cnNotificationExampleRender()}
      items={items}
      itemRender={RenderItem}
    />
  </Example>
);
