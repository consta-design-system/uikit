import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Switch } from '../../../Switch';

const emptyFunction = () => {};

export const SwitchExampleNameVerb = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <Switch label="Получать уведомления" checked onChange={emptyFunction} />
    </div>
    <div>
      <Switch
        label="Превращаться в паука"
        checked={false}
        onChange={emptyFunction}
      />
    </div>
  </StoryBookExample>
);

export const SwitchExampleNameEnable = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
          <Switch
            label="Включить уведомления"
            checked={false}
            onChange={emptyFunction}
          />
          <p className={cnDocsExample('Subscription')}>
            Пока переключатель выключен, всё в порядке: понятно, что если на
            него нажать, всё включится.
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
      </div>
      <div className={cnMixSpace({ m: 'm' })}>
        <div className={cnDocsExample()}>
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
          <p className={cnDocsExample('Status', { view: 'right' })}>
            Правильно
          </p>
          <p className={cnDocsExample('Subscription')}>
            Пока эта штука активна, вы получаете уведомления. А если на неё
            нажать, то вы их больше получать не будете.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SwitchExampleNameNoVerb = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <Switch label="Тестовый режим" checked onChange={emptyFunction} />
    </div>
    <div>
      <Switch label="Тёмная тема" checked={false} onChange={emptyFunction} />
    </div>
    <div>
      <Switch
        label="Автоматическая трансформация"
        checked={false}
        onChange={emptyFunction}
      />
    </div>
  </StoryBookExample>
);
