# Использование

## Установка пакета

```
yarn add @gpn-design/uikit
```

## Установка зависимостей пакета

```
yarn add @bem-react/classname @bem-react/classnames react-textarea-autosize react-transition-group bem-cn lodash react-collapse
```

## Применение

Для использования компонентов на проекте следует подключить стили компонентов, базовые стили дизайн-системы и сам компонент:

```tsx
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_font/theme_font_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css';

import { cnTheme } from '@gpn-design/uikit/Theme';
import { Button } from '@gpn-design/uikit/Button';
```

Затем следует повесить на блок-контейнер классы тем:

```tsx
<body
  className={cnTheme({
    color: 'gpnDefault',
    space: 'gpnDefault',
    size: 'gpnDefault',
    font: 'gpnDefault',
    control: 'gpnDefault',
  })}
>
  <Button label="Кнопка" />
</body>
```
