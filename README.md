# [Дизайн-система Consta](http://consta.gazprom-neft.ru/) | Библиотека интерфейсных компонентов

Consta — дизайн-система для разработки интерфейсов, написана на [React](https://reactjs.org/), сделана и поддерживается в «Газпром нефти».

В дизайн-систему входит несколько библиотек. **Здесь — библиотека интерфейсных компонентов:** простые контролы, сложные блоки, темы и хуки. Все библиотеки представлены в виде компонентов и макетов в Figma.

## Что входит в дизайн-систему

### Библиотека компонентов

[Репозиторий](https://github.com/consta-design-system/uikit) | [NPM](https://www.npmjs.com/package/@consta/uikit) | [Документация и стенд](http://uikit.gizeasy.ru/?path=/story/common-about--page) | [Макеты](https://www.figma.com/community/file/853774806786762374)

### Библиотека графиков

[Репозиторий](https://github.com/consta-design-system/charts) | [NPM](https://www.npmjs.com/package/@consta/charts) | [Документация и стенд](http://charts.gizeasy.ru) | [Макеты](https://www.figma.com/community/file/982611119114314434)

[>> Посмотреть все библиотеки](http://uikit.gizeasy.ru/?path=/docs/common-about-github--page)

<hr>

Подробности — на [на сайте дизайн-системы Consta](http://consta.gazprom-neft.ru/)

Следите за новостями и релизами в [телеграм-канале дизайн-системы](https://t.me/consta_ui_releases)

# Как использовать

## Установите пакет

```
yarn add @consta/uikit
```

## Начните работу с библиотекой

Чтобы начать работу с библиотекой интерфейсных компонентов, подключите тему:

```tsx
import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';

const App = () => (
  <Theme preset={presetGpnDefault}>
    <Button label="Кнопка" />
  </Theme>
);
```

[Что такое темы и как с ними работать](http://uikit.gizeasy.ru/?path=/docs/thematization-what-are-themes--page)

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперёд, к стенду](http://uikit.gizeasy.ru/)

## Контрибьюторам

Будем рады, если вы захотите принять участие в разработке дизайн-системы =) Но сначала прочитайте [инструкцию для контрибьюторов](http://uikit.gizeasy.ru/?path=/docs/common-develop-contributors--page).

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется ПАО «Газпром нефть» на условиях открытой [лицензии MIT](https://consta.gazprom-neft.ru/static/licence_mit.pdf).
