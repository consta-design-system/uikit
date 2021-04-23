Consta — библиотека компонентов и правила их взаимодействия на GitHub для разработчиков, в Figma для дизайнеров. Подробнее читайте [на сайте дизайн-системы](http://consta.gazprom-neft.ru/).

[Телеграм-канал с обновлениями и новостями](https://t.me/consta_ui_releases)

# Использование

## Установка пакета

```
yarn add @consta/uikit
```

## Применение

Для использования компонентов на проекте следует подключить тему:

```tsx
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Buton';

const App = () => (
  <Theme preset={presetGpnDefault}>
    <Button label="Кнопка" />
  </Theme>
);
```

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперед, к стенду](https://consta-uikit.vercel.app/)
