# Использование

## Установка пакета

```
yarn add @consta/uikit
```

## Применение

Для использования компонентов на проекте следует подключить тему:

```tsx
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';

const App = () => (
  <Theme preset={presetGpnDefault}>
    <Button label="Кнопка" />
  </Theme>
);
```

## Документация и стенд

На стенде можно менять параметры и смотреть, как меняются компоненты. Документация — во вкладке у каждого компонента.

[Вперед, к стенду](https://uikit.consta.vercel.app/)
