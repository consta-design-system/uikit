import React from 'react';
import { startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleView = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="classic" />
    </StoryBookExample>
  );
};

export const DateTimeExampleViewTwo = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="book" />
    </StoryBookExample>
  );
};

export const DateTimeExampleViewSlider = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="slider" />
    </StoryBookExample>
  );
};

export const DateTimeExampleCurrent = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime currentVisibleDate={startOfWeek(new Date(), { locale: ruLocale })} />
    </StoryBookExample>
  );
};
