import './Sidebar.stories.css';

import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';

import { cn } from '../../../utils/bem';
import { callbackWithSelector, createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Sidebar, sidebarPropSize } from '../Sidebar';
import mdx from './Sidebar.docs.mdx';

const cnSidebarStories = cn('SidebarStories');

const defaultKnobs = () => ({
  hasOverlay: boolean('hasOverlay', true),
  size: select('size', sidebarPropSize, sidebarPropSize[1]),
  position: select('position', ['right', 'bottom', 'left', 'top'], 'right'),
});

export const Playground = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const { hasOverlay, size, position } = defaultKnobs();

  const handleClickOutside = callbackWithSelector(
    { name: 'onClickOutside' },
    () => {
      setIsSidebarOpen(false);
    },
  );

  const handleEscPress = callbackWithSelector({ name: 'onEsc' }, () => {
    setIsSidebarOpen(false);
  });

  return (
    <div className={cnSidebarStories()}>
      <Button
        size="m"
        view="primary"
        label="Открыть сайдбар"
        width="default"
        onClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        className={cnSidebarStories('Sidebar')}
        isOpen={isSidebarOpen}
        onClose={action('onClose')}
        onOpen={action('onOpen')}
        hasOverlay={hasOverlay}
        onOverlayClick={handleClickOutside}
        onEsc={handleEscPress}
        size={size}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Содержимое сайдбара. Сайдбар — это всплывающее окно, «прилипающее» к
            краю экрана. Показывается поверх контента, содержимое страницы можно
            закрыть полупрозрачной подложкой. Внутри может быть что угодно:
            текст, кнопки, изображения или другие элементы.
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Сайдбар входит в дизайн-систему Consta. В ней несколько библиотек с
            интерфейсными компонентами и правилами их взаимодействия. Компоненты
            — кнопки, иконки, списки, таблицы и другие элементы, из которых
            собирается интерфейс, реализованы в двух форматах: для дизайнеров,
            чтобы собирать макеты в Figma, и для разработчиков — в виде кода на
            React.
          </Text>
          <Text
            as="p"
            size="m"
            view="primary"
            weight="semibold"
            className={cnSidebarStories('Title')}
          >
            Особенности дизайн-системы
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Гибкая тематизация. Тема определяет внешний вид всего интерфейса —
            цвета, шрифты, отступы. В тему вкладываются все компоненты, а ещё
            темы вкладываются друг в друга. В дизайн-системе может быть сколько
            угодно вариантов темы.
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Семантические переменные. Все параметры темы описаны с помощью
            переменных (CSS Custom Properties) — значения цветов, отступов и
            размеров типографики берутся из темы, а значит, легко меняются
            вместе с ней.
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Кастомные блоки и компоненты. В дизайн-системе есть готовые блоки,
            но из её компонентов можно собирать кастомные блоки и элементы
            интерфейса. Если чего-то не хватает, можно создавать своё по
            принципам дизайн-системы.
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarStories('Body')}
          >
            Одинаковые сущности в макетах и в коде. Все сущности есть в двух
            видах: в виде макетов в Figma и в коде.
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
};

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
