import './Sidebar.stories.css';

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Sidebar } from '../Sidebar';

import mdx from './Sidebar.docs.mdx';

const cnSidebarStories = cn('SidebarStories');

const defaultKnobs = () => ({
  hasOverlay: boolean('hasOverlay', true),
  width: select('width', ['auto'], 'auto'),
  height: select('height', ['auto'], 'auto'),
  position: select('position', ['right', 'bottom', 'left', 'top'], 'right'),
});

export function Playground() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const { hasOverlay, width, height, position } = defaultKnobs();

  return (
    <div className={cnSidebarStories()}>
      <Button
        size="m"
        view="primary"
        label="Открыть Sidebar"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarStories('Sidebar')}
        isOpen={isSidebarOpen}
        onClose={() => console.log('Коллбэк на закрытие')}
        onOpen={() => console.log('Коллбэк на открытие')}
        hasOverlay={hasOverlay}
        onOverlayClick={() => setIsSidebarOpen(false)}
        width={width}
        height={height}
        position={position}
      >
        <Sidebar.Content className={cnSidebarStories('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarStories('Title')}
          >
            Заголовок сайдбара
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarStories('Body')}>
            Sed porta sollicitudin purus sagittis elementum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque tincidunt, augue et
            placerat cursus, neque sem imperdiet mi, ut fringilla nunc nibh non enim. Vivamus id
            metus convallis, commodo magna vel, scelerisque nisi. Morbi vehicula lectus id risus
            malesuada, at finibus urna egestas. Ut diam arcu, tempus nec metus sed, egestas maximus
            mi. Aenean hendrerit lorem mauris. Nam ut elit elementum, rhoncus lectus a, tincidunt
            diam. Pellentesque consequat ante in vestibulum viverra. Aliquam vitae facilisis purus.
            Sed metus ante, ultricies quis mi vel, blandit fringilla sem. Mauris vitae mauris massa.
            Nunc pulvinar purus nec est dictum venenatis. Pellentesque vulputate metus imperdiet
            ipsum mollis, nec finibus ante mollis. Cras ligula dui, feugiat non orci vitae, commodo
            suscipit mi. Ut commodo nunc eget massa feugiat, et vulputate nisl euismod. Phasellus
            orci massa, eleifend eget consequat aliquet, imperdiet ut neque. Ut et tortor vitae
            augue semper euismod a ut lacus. Duis vulputate orci risus, eget dapibus nulla hendrerit
            eget. Vivamus finibus blandit nunc, ut fringilla eros pharetra a. Integer vitae commodo
            sapien. Cras posuere eleifend nulla in mollis. Fusce in lacus dignissim, egestas lacus
            et, laoreet quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Sed placerat, quam vel sodales consectetur, enim nulla lacinia
            risus, a laoreet ipsum diam sed quam. Nullam ornare, est at mollis venenatis, eros purus
            tincidunt augue, et elementum sapien leo ut nunc. Suspendisse vel nunc felis. Praesent a
            tortor venenatis, semper quam sed, pretium eros. Phasellus non nunc id augue malesuada
            aliquam. Pellentesque molestie mi non neque mattis, ut congue purus vulputate.
            Suspendisse placerat dapibus metus mollis rutrum. Donec et nulla sapien. Donec
            sollicitudin ultrices mi vel blandit. Sed imperdiet libero eu tellus laoreet cursus.
            Maecenas non sem non est venenatis porta.
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarStories('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Ок"
            width="default"
            onClick={() => setIsSidebarOpen(false)}
          />
          <Button
            size="m"
            view="ghost"
            label="Закрыть"
            width="default"
            onClick={() => setIsSidebarOpen(false)}
          />
        </Sidebar.Actions>
      </Sidebar>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Наложение/Sidebar',
  id: 'components/Sidebar',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5694%3A0',
    },
  },
});
