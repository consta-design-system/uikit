import React, { useState } from 'react';

import { IconDiamond } from '../../../../../icons/IconDiamond/IconDiamond';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleTextPlaceholder = () => {
  const [value, setValue] = useState(null);
  const handleChange = ({ value }) => setValue(value);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField value={value} onChange={handleChange} placeholder="Здесь только цифры" />
    </StoryBookExample>
  );
};

export const TextFieldExampleTextValue = () => {
  const [value, setValue] = useState('стопиццот');
  const handleChange = ({ value }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField value={value} onChange={handleChange} />
    </StoryBookExample>
  );
};

export const TextFieldExampleTextLeft = () => {
  const [value, setValue] = useState(null);
  const handleChange = ({ value }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField leftSide="куда" value={value} onChange={handleChange} />
      <TextField leftSide="кому" value={value} onChange={handleChange} />
    </StoryBookExample>
  );
};
export const TextFieldExampleTextRight = () => {
  const [value, setValue] = useState(null);
  const handleChange = ({ value }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField leftSide={IconDiamond} rightSide="карат" value={value} onChange={handleChange} />
    </StoryBookExample>
  );
};
