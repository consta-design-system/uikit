import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Responses403 } from '../../../../Responses403/Responses403';
import { Responses404 } from '../../../../Responses404/Responses404';
import { Responses500 } from '../../../../Responses500/Responses500';
import { Responses503 } from '../../../../Responses503/Responses503';
import { ResponsesConnectionError } from '../../../../ResponsesConnectionError/ResponsesConnectionError';
import { ResponsesDeleted } from '../../../../ResponsesDeleted/ResponsesDeleted';
import { ResponsesEmptyBox } from '../../../../ResponsesEmptyBox/ResponsesEmptyBox';
import { ResponsesEmptyPockets } from '../../../../ResponsesEmptyPockets/ResponsesEmptyPockets';
import { ResponsesExit } from '../../../../ResponsesExit/ResponsesExit';
import { ResponsesNothingFound } from '../../../../ResponsesNothingFound/ResponsesNothingFound';
import { ResponsesSuccess } from '../../../../ResponsesSuccess/ResponsesSuccess';

export const ExampleResponses403 = () => {
  return (
    <Example col={1}>
      <Responses403 size="m" />
    </Example>
  );
};

export const ExampleResponses404 = () => {
  return (
    <Example col={1}>
      <Responses404 size="m" />
    </Example>
  );
};

export const ExampleResponses500 = () => {
  return (
    <Example col={1}>
      <Responses500 size="m" />
    </Example>
  );
};

export const ExampleResponses503 = () => {
  return (
    <Example col={1}>
      <Responses503 size="m" />
    </Example>
  );
};

export const ExampleResponsesConnectionError = () => {
  return (
    <Example col={1}>
      <ResponsesConnectionError size="m" />
    </Example>
  );
};

export const ExampleResponsesEmptyBox = () => {
  return (
    <Example col={1}>
      <ResponsesEmptyBox size="m" />
    </Example>
  );
};

export const ExampleResponsesEmptyPockets = () => {
  return (
    <Example col={1}>
      <ResponsesEmptyPockets size="m" />
    </Example>
  );
};

export const ExampleResponsesDeleted = () => {
  return (
    <Example col={1}>
      <ResponsesDeleted size="m" />
    </Example>
  );
};

export const ExampleResponsesNothingFound = () => {
  return (
    <Example col={1}>
      <ResponsesNothingFound size="m" />
    </Example>
  );
};

export const ExampleResponsesSuccess = () => {
  return (
    <Example col={1}>
      <ResponsesSuccess size="m" />
    </Example>
  );
};

export const ExampleResponsesText = () => {
  return (
    <Example col={1}>
      <ResponsesSuccess
        size="m"
        title="Всё готово"
        description="Можно двигаться дальше: сначала два шага направо, потом четыре налево, и всё — только вперёд!"
      />
    </Example>
  );
};

export const ExampleResponsesActions = () => {
  return (
    <Example col={1}>
      <ResponsesSuccess
        size="m"
        title="Всё готово"
        description="Можно двигаться дальше: сначала два шага направо, потом четыре налево, и всё — только вперёд!"
        actions={<Button size="m" view="ghost" label="Ура, я уже бегу" />}
      />
    </Example>
  );
};

export const ExampleResponsesSizeM = () => {
  return (
    <Example col={1}>
      <Responses404 size="m" />
    </Example>
  );
};

export const ExampleResponsesSizeL = () => {
  return (
    <Example col={1}>
      <Responses404 size="l" />
    </Example>
  );
};

export const ExampleResponsesExit = () => {
  return (
    <Example col={1}>
      <ResponsesExit />
    </Example>
  );
};

export const ExampleResponsesAdaptive = () => {
  return (
    <Example col={1}>
      <ResponsesExit />
    </Example>
  );
};
