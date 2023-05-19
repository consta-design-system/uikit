# [Дизайн-система Consta](http://consta.gazprom-neft.ru/) | Библиотека интерфейсных компонентов

Consta — дизайн-система для разработки интерфейсов, написана на [React](https://reactjs.org/).

В дизайн-систему входит несколько библиотек. **Здесь — библиотека интерфейсных компонентов:** простые контролы, сложные блоки, темы и хуки. Все библиотеки представлены в виде компонентов и макетов в Figma.

## Что входит в дизайн-систему

### Библиотека компонентов

[Репозиторий](https://github.com/consta-design-system/uikit) | [NPM](https://www.npmjs.com/package/@consta/uikit) | [Документация и стенд](http://uikit.consta.design/) | [Макеты](https://www.figma.com/community/file/853774806786762374)

### Библиотека графиков

[Репозиторий](https://github.com/consta-design-system/charts) | [NPM](https://www.npmjs.com/package/@consta/charts) | [Документация и стенд](http://charts.consta.design) | [Макеты](https://www.figma.com/community/file/982611119114314434)

[>> Посмотреть все библиотеки](https://github.com/consta-design-system)

<hr>

Подробности — на [на сайте дизайн-системы Consta](http://consta.design/)

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

[Что такое темы и как с ними работать](https://portal.consta.design/libs/portal/theme-themeabout)

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперёд, к стенду](http://consta.design/libs/uikit)

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn.

Чтобы установить зависимости, выполните команду:

```sh
$ yarn install
```

### Основные команды

```sh
# Запуск локального сервера для разработки
$ yarn start

# Сборка пакета
$ yarn build

# Сборка стенда
$ yarn stand:build

# Запуск тестов
$ yarn test
```

## Контрибьюторам

Будем рады, если вы захотите принять участие в разработке дизайн-системы =) Но сначала прочитайте [инструкцию для контрибьюторов](https://consta.design/libs/portal/contributers-code).

## Лицензия

Дизайн-систему можно использовать бесплатно, она распространяется на условиях открытой [лицензии MIT](https://consta.design/static/licence_mit.pdf).
