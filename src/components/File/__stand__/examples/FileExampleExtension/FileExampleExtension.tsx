import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { File } from '../../../File';

export const FileExampleExtension = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <File extension="doc" />
    <File extension="docx" />
    <File extension="jpg" />
    <File extension="mov" />
    <File extension="BlaBla" />
  </StoryBookExample>
);
