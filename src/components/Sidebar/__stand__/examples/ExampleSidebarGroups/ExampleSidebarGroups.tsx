import './ExampleSidebarGroups.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { ModalHeader, ModalLayout } from '##/components/Modal';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { Sidebar } from '../../..';
import { cnSidebarExampleStaticModal } from '../cnSidebarExampleStaticModal';

const cnExampleSidebarGroups = cn('ExampleSidebarGroups');

const props: { label: string; props: { label: string; value: string }[] }[] = [
  {
    label: 'Основная информация',
    props: [
      {
        label: 'Состав',
        value:
          'Чай ассам; малина; мята; чабрец; лемонграсс; роза; брусника; липа; василек; лимонник',
      },
    ],
  },
  {
    label: 'Дополнительная информация',
    props: [
      {
        label: 'Вкус',
        value: 'чай Ассам; чабрец мелисса; липа',
      },
      {
        label: 'Вид чая',
        value: 'травяной; ассорти с травами; черный индийский листовой Ассам',
      },
      {
        label: 'Форма выпуска напитка',
        value: 'рассыпной; связанный',
      },
      {
        label: 'Срок годности',
        value: '24 месяца',
      },
    ],
  },
  {
    label: 'Габариты',
    props: [
      {
        label: 'Вес товара без упаковки (г)',
        value: '140 г',
      },
      {
        label: 'Вес товара с упаковкой (г)',
        value: '180 г',
      },
      {
        label: 'Длина упаковки',
        value: '10 см',
      },
      {
        label: 'Высота упаковки',
        value: '18 см',
      },
      {
        label: 'Ширина упаковки',
        value: '16 см',
      },
    ],
  },
];

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

const Prop: React.FC<{ label: string; value: string; className?: string }> = ({
  label,
  value,
  className,
}) => (
  <Text
    size="s"
    lineHeight="m"
    className={cnExampleSidebarGroups('Prop', [className])}
  >
    <Text className={cnExampleSidebarGroups('PropLabel')} view="secondary">
      {label} <div className={cnExampleSidebarGroups('PropSeparator')} />
    </Text>
    <Text className={cnExampleSidebarGroups('PropValue')} view="primary">
      {value}
    </Text>
  </Text>
);

export const ExampleSidebarGroups = () => {
  // const [open, setOpen] = useFlag();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} className={cnExampleSidebarGroups()} />
      </Example>
      <Sidebar
        className={cnExampleSidebarGroups('Window')}
        rootClassName={cnExampleSidebarGroups('Root', [
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
            {props.map(({ label, props }) => (
              <div className={cnMixSpace({ mB: 'l' })} key={label}>
                <Title className={cnMixSpace({ mB: 's' })}>{label}</Title>
                {props.map(({ label, value }, index) => (
                  <Prop
                    className={
                      index === props.length - 1
                        ? undefined
                        : cnMixSpace({ mB: 's' })
                    }
                    key={label}
                    label={label}
                    value={value}
                  />
                ))}
              </div>
            ))}
            <Title className={cnMixSpace({ mB: 's' })}>Описание</Title>
            <Text size="s" lineHeight="m">
              Чай листовой черный травяной По-Татарски. Это не просто напиток,
              это культурный ритуал, пронизанный уютом, гостеприимством и
              многовековыми традициями. Он занимает особое место в татарской
              кухне и повседневной жизни, сопровождая как будни, так и
              праздничные застолья. Классический татарский чай — это крепко
              заваренный чёрный чай, который подают с молоком, иногда с
              добавлением сливочного масла или сливок. В некоторых семьях его
              также готовят с пряностями: гвоздикой, кардамоном, чёрным перцем,
              придавая напитку насыщенный и согревающий вкус. Часто к чаю подают
              чак-чак и другие традиционные угощения. Чай в татарской культуре —
              это символ уважения и заботы. Его всегда предлагают гостю, а сам
              процесс чаепития может затянуться на долгие часы задушевных
              разговоров. За чашкой чая укрепляются родственные связи,
              обсуждаются важные дела и просто делятся теплом. Татарский чай —
              это приглашение остановиться и почувствовать вкус жизни.
            </Text>
          </div>
        </ModalLayout>
      </Sidebar>
    </>
  );
};
