import { Example } from '@consta/stand';
import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleNameVerb = () => (
  <Example>
    <Switch label="Получать уведомления" checked onChange={emptyFunction} />
    <Switch
      label="Превращаться в паука"
      checked={false}
      onChange={emptyFunction}
    />
  </Example>
);

export const SwitchExampleNameEnable = () => {
  return (
    <Example col={{ 1: 0, 2: 600 }}>
      <div>
        <Switch
          label="Включить уведомления"
          checked={false}
          onChange={emptyFunction}
        />
        <p className={cnDocsExample('Subscription')}>
          Пока переключатель выключен, всё в порядке: понятно, что если на него
          нажать, всё включится.
        </p>
        <Switch
          label="Включить уведомления"
          checked
          onChange={emptyFunction}
          className={cnMixSpace({ mT: 's' })}
        />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
        <p className={cnDocsExample('Subscription')}>
          Когда переключатель включен, непонятно, уведомления включены или
          выключены. А что будет, если нажать на переключатель: они включатся
          или выключатся?
        </p>
      </div>
      <div>
        <Switch
          label="Получать уведомления"
          checked={false}
          onChange={emptyFunction}
        />
        <p className={cnDocsExample('Subscription')}>
          Здесь акцент на результате: если нажать на эту штуку, то вы будете
          получать уведомления.
        </p>
        <Switch
          label="Получать уведомления"
          checked
          onChange={emptyFunction}
          className={cnMixSpace({ mT: 's' })}
        />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnDocsExample('Subscription')}>
          Пока эта штука активна, вы получаете уведомления. А если на неё
          нажать, то вы их больше получать не будете.
        </p>
      </div>
    </Example>
  );
};

export const SwitchExampleNameNoVerb = () => (
  <Example>
    <Switch label="Тестовый режим" checked onChange={emptyFunction} />
    <Switch label="Тёмная тема" checked={false} onChange={emptyFunction} />
    <Switch
      label="Автоматическая трансформация"
      checked={false}
      onChange={emptyFunction}
    />
  </Example>
);
