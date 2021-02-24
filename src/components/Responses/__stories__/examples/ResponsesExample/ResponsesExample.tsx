import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { Responses403 } from '../../../../Responses403/Responses403';
import { Responses404 } from '../../../../Responses404/Responses404';
import { Responses500 } from '../../../../Responses500/Responses500';
import { Responses503 } from '../../../../Responses503/Responses503';
import { ResponsesConnectionError } from '../../../../ResponsesConnectionError/ResponsesConnectionError';
import { ResponsesDeleted } from '../../../../ResponsesDeleted/ResponsesDeleted';
import { ResponsesEmptyBox } from '../../../../ResponsesEmptyBox/ResponsesEmptyBox';
import { ResponsesEmptyPockets } from '../../../../ResponsesEmptyPockets/ResponsesEmptyPockets';
import { ResponsesNothingFound } from '../../../../ResponsesNothingFound/ResponsesNothingFound';
import { ResponsesSuccess } from '../../../../ResponsesSuccess/ResponsesSuccess';

export const ExampleResponses403 = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Responses403 size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponses404 = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Responses404 size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponses500 = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Responses500 size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponses503 = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Responses503 size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesConnectionError = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesConnectionError size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesEmptyBox = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesEmptyBox size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesEmptyPockets = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesEmptyPockets size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesDeleted = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesDeleted size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesNothingFound = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesNothingFound size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesSuccess = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesSuccess size="m" />
    </StoryBookExample>
  );
};

export const ExampleResponsesText = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesSuccess
        size="m"
        title="Всё готово"
        description="Можно двигаться дальше: сначала два шага направо, потом четыре налево, и всё — только вперёд!"
      />
    </StoryBookExample>
  );
};

export const ExampleResponsesActions = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ResponsesSuccess
        size="m"
        title="Всё готово"
        description="Можно двигаться дальше: сначала два шага направо, потом четыре налево, и всё — только вперёд!"
        actions={<Button size="m" view="ghost" label="Ура, я уже бегу" />}
      />
    </StoryBookExample>
  );
};
