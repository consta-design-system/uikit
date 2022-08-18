import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleTypeYear = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="year" />
    </StoryBookExample>
  );
};

export const DateTimeExampleTypeMonth = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="month" />
    </StoryBookExample>
  );
};

export const DateTimeExampleTypeDate = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="date" />
    </StoryBookExample>
  );
};

export const DateTimeExampleTypeDateTime = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="date-time" />
    </StoryBookExample>
  );
};

export const DateTimeExampleTypeTime = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="time" />
    </StoryBookExample>
  );
};
