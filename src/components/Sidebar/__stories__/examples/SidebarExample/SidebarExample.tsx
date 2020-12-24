import './SidebarExample.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { Sidebar } from '../../../Sidebar';

const cnSidebarExample = cn('SidebarExample');

export const SidebarExample = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="Открыть Sidebar"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок сайдбара
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
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
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Понятно"
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
};

export const SidebarExampleLeft = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="position=left"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
        position="left"
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
            Ой! Меня прижало к левому краю страницы. Помогите!
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Нет уж"
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
};

export const SidebarExampleRight = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="position=right"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
        position="right"
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
            Ой! Меня прижало к правому краю страницы. Помогите!
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Нет уж"
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
};

export const SidebarExampleTop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="position=top"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
        position="top"
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
            Ой! Меня прижало к верху страницы. Помогите!
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Нет уж"
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
};

export const SidebarExampleBottom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="position=bottom"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
        position="bottom"
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
            Ой! Меня прижало к низу страницы. Помогите!
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Нет уж"
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
};

export const SidebarExampleNoOverlay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className={cnDocsDecorator('Section')}>
      <Button
        size="m"
        view="primary"
        label="Без подложки"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onOverlayClick={() => setIsSidebarOpen(false)}
        position="right"
        hasOverlay={false}
      >
        <Sidebar.Content className={cnSidebarExample('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarExample('Title')}
          >
            Заголовок
          </Text>
          <Text as="p" size="m" view="secondary" className={cnSidebarExample('Body')}>
            Ой! У меня чего-то не хватает. Нажмите на кнопочку, пожалуйста :)
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarExample('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Ладно"
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
};
