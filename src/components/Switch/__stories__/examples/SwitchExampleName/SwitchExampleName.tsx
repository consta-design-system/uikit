import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Switch } from '../../../Switch';

const emptyFunction = action('emptyFunction');

export const SwitchExampleNameVerb = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <Switch label="Получать уведомления" checked onChange={emptyFunction} />
    </div>
    <div>
      <Switch label="Превращаться в паука" checked={false} onChange={emptyFunction} />
    </div>
  </StoryBookExample>
);

export function SwitchExampleNameEnable() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <Switch label="Включить уведомления" checked={false} onChange={emptyFunction} />
        <p className={cnDocsExample('Caption')}>
          Пока переключатель выключен, всё в порядке: понятно, что если на него нажать, всё
          включится.
        </p>
        <Switch label="Включить уведомления" checked onChange={emptyFunction} />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>Неправильно</p>
        <p className={cnDocsExample('Caption')}>
          Когда переключатель включен, непонятно, уведомления включены или выключены. А что будет,
          если нажать на переключатель: они включатся или выключатся?
        </p>
      </div>
      <div className={cnDocsExample()}>
        <Switch label="Получать уведомления" checked={false} onChange={emptyFunction} />
        <p className={cnDocsExample('Caption')}>
          Здесь акцент на результате: если нажать на эту штуку, то вы будете получать уведомления.
        </p>
        <Switch label="Получать уведомления" checked onChange={emptyFunction} />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnDocsExample('Caption')}>
          Пока эта штука активна, вы получаете уведомления. А если на неё нажать, то вы их больше
          получать не будете.
        </p>
      </div>
    </div>
  );
}

export const SwitchExampleNameNoVerb = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <Switch label="Тестовый режим" checked onChange={emptyFunction} />
    </div>
    <div>
      <Switch label="Тёмная тема" checked={false} onChange={emptyFunction} />
    </div>
    <div>
      <Switch label="Автоматическая трансформация" checked={false} onChange={emptyFunction} />
    </div>
  </StoryBookExample>
);
