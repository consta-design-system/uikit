import './SidebarExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { Sidebar } from '../../../Sidebar';

const cnSidebarExample = cn('SidebarExample');

export const SidebarExample = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Открыть сайдбар"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
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
            className={cnSidebarExample('Body')}
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
            className={cnSidebarExample('Title')}
          >
            Особенности дизайн-системы
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
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
            className={cnSidebarExample('Body')}
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
            className={cnSidebarExample('Body')}
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
            className={cnSidebarExample('Body')}
          >
            Одинаковые сущности в макетах и в коде. Все сущности есть в двух
            видах: в виде макетов в Figma и в коде.
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
    </>
  );
};

export const SidebarExampleLeft = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="position=left"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        position="left"
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
          >
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
    </>
  );
};

export const SidebarExampleRight = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="position=right"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        position="right"
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
          >
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
    </>
  );
};

export const SidebarExampleTop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="position=top"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        position="top"
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
          >
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
    </>
  );
};

export const SidebarExampleBottom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="position=bottom"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        position="bottom"
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
          >
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
    </>
  );
};

export const SidebarExampleNoOverlay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      <Example>
        <Button
          size="m"
          view="primary"
          label="Без подложки"
          width="default"
          onClick={() => setIsSidebarOpen(true)}
        />
      </Example>
      <Sidebar
        className={cnSidebarExample('Sidebar')}
        isOpen={isSidebarOpen}
        onClickOutside={() => setIsSidebarOpen(false)}
        onEsc={() => setIsSidebarOpen(false)}
        position="right"
        hasOverlay={false}
        style={{ zIndex: 2000 }}
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
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarExample('Body')}
          >
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
    </>
  );
};
