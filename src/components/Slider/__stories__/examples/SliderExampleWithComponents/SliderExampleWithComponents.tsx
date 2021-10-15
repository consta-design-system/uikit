import './SliderExampleWithComponents.css';

import React, { useCallback, useState } from 'react';

import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../../TextField/TextField';
import { Slider } from '../../../Slider';

export const SliderExampleWithInputLeft = () => {
  const [value, setValue] = useState([50]);
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = () => {
    setValue((prev) => (prev.length > 1 ? [Number(inputValue), prev[1]] : [Number(inputValue)]));
    setInputValue(undefined);
  };

  const changeInput = useCallback(
    (e) => {
      setInputValue(`${e.value}`);
    },
    [inputValue],
  );

  const getValue = useCallback(
    (val) => {
      return Math.round(val).toString();
    },
    [value],
  );

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider
        getTooltipContent={getValue}
        min={0}
        max={100}
        step={10}
        prefix={({ value }) => (
          <TextField
            type="number"
            min={0}
            max={100}
            step={25}
            value={inputValue || (Array.isArray(value) ? value[0] : Math.round(value)).toString()}
            className={cnDocsDecorator('Textfield')}
            onChange={changeInput}
            onBlur={handleChange}
            required
          />
        )}
        suffix={<IconSettings className={cnDocsDecorator('Icon')} />}
        value={Math.round(Number(inputValue))}
        onChange={handleChange}
      />
    </StoryBookExample>
  );
};

export const SliderExampleWithInputRight = () => {
  const [value, setValue] = useState([50]);
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = () => {
    setValue((prev) => (prev.length > 1 ? [Number(inputValue), prev[1]] : [Number(inputValue)]));
    setInputValue(undefined);
  };

  const changeInput = useCallback(
    (e) => {
      setInputValue(`${e.value}`);
    },
    [inputValue],
  );

  const getValue = useCallback(
    (val) => {
      return Math.round(val).toString();
    },
    [value],
  );

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider
        getTooltipContent={getValue}
        min={0}
        max={100}
        step={10}
        prefix={<IconSettings className={cnDocsDecorator('Icon')} />}
        suffix={({ value }) => (
          <TextField
            type="number"
            min={0}
            max={100}
            step={25}
            value={inputValue || (Array.isArray(value) ? value[0] : Math.round(value)).toString()}
            className={cnDocsDecorator('Textfield')}
            onChange={changeInput}
            onBlur={handleChange}
            required
          />
        )}
        value={Math.round(Number(inputValue))}
        onChange={handleChange}
      />
    </StoryBookExample>
  );
};
