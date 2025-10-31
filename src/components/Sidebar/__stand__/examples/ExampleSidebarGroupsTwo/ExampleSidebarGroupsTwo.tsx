import './ExampleSidebarGroupsTwo.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { ModalHeader, ModalLayout } from '##/components/Modal';
import { RadioGroup } from '##/components/RadioGroup';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { Sidebar } from '../../..';
import { cnSidebarExampleStaticModal } from '../cnSidebarExampleStaticModal';

const cnExampleSidebarGroupsTwo = cn('ExampleSidebarGroupsTwo');

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <Text
    size="s"
    view="primary"
    weight="semibold"
    lineHeight="m"
    className={className}
  >
    {children}
  </Text>
);

const props: { label: string; value: string; list: string[] }[] = [
  {
    label: 'Размер интерфейса',
    value: 'По умолчанию',
    list: ['По умолчанию', 'Обычный', 'Компактный'],
  },
  {
    label: 'Тема',
    value: 'Системная',
    list: ['Системная', 'Светлая', 'Темная'],
  },
  {
    label: 'Сортировка входящих писем',
    value: 'По умолчанию',
    list: [
      'По умолчанию',
      'Сначала важные',
      'Сначала важные',
      'Сначала помеченные',
      'Приоритетные',
      'Дополнительные папки',
    ],
  },
  {
    label: 'Область просмотра',
    value: 'Не разделять',
    list: ['Не разделять', 'Сплава', 'Снизу'],
  },
];

export const ExampleSidebarGroupsTwo = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} className={cnExampleSidebarGroupsTwo()} />
      </Example>
      <Sidebar
        className={cnExampleSidebarGroupsTwo('Window')}
        rootClassName={cnExampleSidebarGroupsTwo('Root', [
          cnSidebarExampleStaticModal(),
        ])}
        container={ref}
        style={{ zIndex: 2000 }}
        border
        size="l"
        hasOverlay={false}
        isOpen
      >
        <ModalLayout
          border={[true, false]}
          space={{ p: 's' }}
          fixed={[true, false]}
        >
          <ModalHeader onClose={() => {}}>
            Характеристика и описание
          </ModalHeader>
          <div>
            {props.map(({ label, value, list }, index) => (
              <div
                className={cnExampleSidebarGroupsTwo('Group', [
                  index === props.length - 1
                    ? undefined
                    : cnMixSpace({ mB: 'l' }),
                ])}
                key={label}
              >
                <Title className={cnMixSpace({ mB: 's' })}>{label}</Title>
                <RadioGroup
                  className={
                    index === props.length - 1
                      ? undefined
                      : cnMixSpace({ mB: 'l' })
                  }
                  value={value}
                  items={list}
                  id={label}
                  getItemLabel={(item) => item}
                  getItemKey={(item) => item}
                />
              </div>
            ))}
          </div>
        </ModalLayout>
      </Sidebar>
    </>
  );
};
