import React from 'react';

import { IconDiamond } from '../../../../../icons/IconDiamond/IconDiamond';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleTextPlaceholder = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField placeholder="Здесь только цифры" />
  </StoryBookExample>
);

export const TextFieldExampleTextValue = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField value="стопиццот" />
  </StoryBookExample>
);

export const TextFieldExampleTextLeft = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField leftSide="куда" />
    <TextField leftSide="кому" />
  </StoryBookExample>
);

export const TextFieldExampleTextRight = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField leftSide={IconDiamond} rightSide="карат" />
  </StoryBookExample>
);
