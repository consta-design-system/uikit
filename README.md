# Использование

## Установка пакета

```
yarn add @gpn-design/uikit
```

## Применение

Для использования компонентов на проекте следует подключить тему:

```tsx
import { Theme, presetGpnDefault } from '@gpn-design/uikit/Theme';
import { Button } from '@gpn-design/uikit/Button';

const App = () => (
  <Theme preset={presetGpnDefault}>
    <Button label="Кнопка" />
  </Theme>
);
```
