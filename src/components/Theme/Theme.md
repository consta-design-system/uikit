# Theme

## Примеры

### Использование в корневом компоненте:

```ts
// src/App.ts
import React from 'react';
import { createTheme, presetGpnDefault } from '@gpn-design/uikit/Theme';

const Theme = createTheme(presetGpnDefault);

const App = () => {
  return <Theme>your code</Theme>;
};
```

### Переопределение темы

```ts
import React from 'react';
import { createTheme, presetGpnDefault, presetGpnDark } from '@gpn-design/uikit/Theme';

const Theme = createTheme(presetGpnDefault);
const ThemeDark = createTheme(presetGpnDark);

const App = () => {
  return (
    <Theme>
      your code
      <ThemeDark>your code</ThemeDark>
    </Theme>
  );
};
```

### использование useTheme

`useTheme` вернет `{ theme, setTheme }`

`theme` - текущее состояние темы

`setTheme` - функция с помощью которой можно измениеть состояние ближайщего по дереву вверх компонента темы.

```ts
import { useTheme } from '@gpn-design/uikit/Theme';

const App = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => setTheme({ ...theme, size: 'mySize' });

  <button onClick={handleClick}>set my size</button>;
};
```
