import './Sidebar.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Sidebar, sidebarPropSize } from '../Sidebar';

const cnSidebarVariants = cn('SidebarVariants');

const Variants = () => {
  const hasOverlay = useBoolean('hasOverlay', true);
  const size = useSelect('size', sidebarPropSize, sidebarPropSize[1]);
  const position = useSelect(
    'position',
    ['right', 'bottom', 'left', 'top'],
    'right',
  );

  const [open, setOpen] = useFlag();

  return (
    <div className={cnSidebarVariants()}>
      <Button
        size="m"
        view="primary"
        label="Открыть сайдбар"
        width="default"
        onClick={setOpen.on}
      />
      <Sidebar
        className={cnSidebarVariants('Sidebar')}
        isOpen={open}
        hasOverlay={hasOverlay}
        onClickOutside={setOpen.off}
        onEsc={setOpen.off}
        size={size}
        position={position}
      >
        <Sidebar.Content className={cnSidebarVariants('Content')}>
          <Text
            as="p"
            size="l"
            view="primary"
            weight="semibold"
            className={cnSidebarVariants('Title')}
          >
            Заголовок сайдбара
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarVariants('Body')}
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
            className={cnSidebarVariants('Body')}
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
            className={cnSidebarVariants('Title')}
          >
            Особенности дизайн-системы
          </Text>
          <Text
            as="p"
            size="m"
            view="secondary"
            className={cnSidebarVariants('Body')}
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
            className={cnSidebarVariants('Body')}
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
            className={cnSidebarVariants('Body')}
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
            className={cnSidebarVariants('Body')}
          >
            Одинаковые сущности в макетах и в коде. Все сущности есть в двух
            видах: в виде макетов в Figma и в коде.
          </Text>
        </Sidebar.Content>
        <Sidebar.Actions className={cnSidebarVariants('Actions')}>
          <Button
            size="m"
            view="clear"
            label="Ок"
            width="default"
            onClick={setOpen.off}
          />
          <Button
            size="m"
            view="ghost"
            label="Закрыть"
            width="default"
            onClick={setOpen.off}
          />
        </Sidebar.Actions>
      </Sidebar>
    </div>
  );
};

export default Variants;
