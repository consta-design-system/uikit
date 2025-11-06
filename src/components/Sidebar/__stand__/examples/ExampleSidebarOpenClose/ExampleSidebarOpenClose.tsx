import './ExampleSidebarOpenClose.css';

import { IconPanelLeft } from '@consta/icons/IconPanelLeft';
import { IconPicture } from '@consta/icons/IconPicture';
import { IconTree } from '@consta/icons/IconTree';
import { IconType } from '@consta/icons/IconType';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { ListItem } from '##/components/ListCanary';
import { ModalLayout } from '##/components/Modal';
import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { Sidebar } from '../../..';
import { cnSidebarExampleStaticModal } from '../cnSidebarExampleStaticModal';

const cnExampleSidebarOpenClose = cn('ExampleSidebarOpenClose');

export const ExampleSidebarOpenClose = () => {
  const [open, setOpen] = useFlag();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} className={cnExampleSidebarOpenClose()}>
          <div
            className={cnExampleSidebarOpenClose('LayersBar', {
              visible: !open,
            })}
          >
            <div
              className={cnExampleSidebarOpenClose('LayersBarWrapper', [
                cnMixFlex({
                  gap: 'xs',
                  justify: 'space-between',
                  align: 'center',
                }),
              ])}
            >
              <Text size="m" view="primary" weight="semibold">
                Слои
              </Text>
              <Button
                size="s"
                view="ghost"
                label="Показать боковые вкладки"
                width="default"
                onClick={setOpen.on}
                onlyIcon
                iconLeft={IconPanelLeft}
              />
            </div>
          </div>
        </div>
      </Example>
      <Sidebar
        className={cnExampleSidebarOpenClose('Window')}
        rootClassName={cnExampleSidebarOpenClose('Root', [
          cnSidebarExampleStaticModal(),
        ])}
        container={ref}
        isOpen={open}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        style={{ zIndex: 2000 }}
        border
        size="none"
        position="left"
        hasOverlay={false}
      >
        <ModalLayout border={[true, false]}>
          <div
            className={cnExampleSidebarOpenClose('Header', [
              cnMixFlex({
                gap: 'xs',
                justify: 'space-between',
                align: 'center',
              }),
            ])}
          >
            <Text size="m" view="primary" weight="semibold">
              Слои
            </Text>
            <Button
              size="s"
              view="ghost"
              label="Закрыть боковые вкладки"
              width="default"
              onClick={setOpen.off}
              onlyIcon
              iconLeft={IconPanelLeft}
            />
          </div>
          <div className={cnExampleSidebarOpenClose('Body')}>
            <ListItem
              leftIcon={IconType}
              label="Content"
              space={{ pV: 'xs' }}
            />
            <ListItem
              leftIcon={IconPicture}
              label="Photo"
              space={{ pV: 'xs' }}
            />
            <ListItem leftIcon={IconTree} label="Block" space={{ pV: 'xs' }} />
          </div>
        </ModalLayout>
      </Sidebar>
    </>
  );
};
