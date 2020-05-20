# Theme

## Примеры

### Использование в корневом компоненте:

```ts
// src/App.ts
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_font/theme_font_gpnDefault.css';
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css';

import React from 'react';
import { cnTheme } from '@gpn-design/uikit/Theme';

const App = () => {
  return (
    <div
      className={cnTheme({
        color: 'gpnDefault',
        space: 'gpnDefault',
        size: 'gpnDefault',
        font: 'gpnDefault',
        control: 'gpnDefault',
      })}
    >
      // your code
    </div>
  );
};
```

### Переопределение темы конкретного DOM-узла:

```ts
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css';

import React from 'react';
import { cnTheme } from '@gpn-design/uikit/Theme';
import { Component } from '@gpn-design/uikit/Component';

const App = () => {
  return <div className={cnTheme({ color: 'gpnDefault' })}>your code</div>;
};
```

### Переопределение темы компонента

```ts
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css';

import React from 'react';
import { cnTheme } from '@gpn-design/uikit/Theme';
import { Component } from '@gpn-design/uikit/Component';

const App = () => {
  return <Component className={cnTheme({ color: 'gpnDefault' })} />;
};
```
