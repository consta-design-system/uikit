import './SliderExampleWithComponents.css';

import React, { useCallback, useState } from 'react';

import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../../TextField/TextField';
import { Slider } from '../../../Slider';

export const SliderExampleWithInputLeft = () => {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState<string>();

  const getValue = useCallback((val) => {
    return val;
  }, []);

  const handleChange = () => {
    setValue(Number(inputValue));
    setInputValue(undefined);
  };

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
            value={value.toString()}
            className={cnDocsDecorator('Textfield')}
            onChange={(e) => setInputValue(e.value?.toString())}
            onBlur={handleChange}
            required
          />
        )}
        suffix={<IconSettings className={cnDocsDecorator('Icon')} />}
        value={value}
        onChange={handleChange}
      />
    </StoryBookExample>
  );
};

export const SliderExampleWithInputRight = () => {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState<string>();

  const getValue = useCallback((val) => {
    return val;
  }, []);

  const handleChange = () => {
    setValue(Number(inputValue));
    setInputValue(undefined);
  };
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
            value={value.toString()}
            className={cnDocsDecorator('Textfield')}
            onChange={(e) => setInputValue(e.value?.toString())}
            onBlur={handleChange}
            required
          />
        )}
        value={value}
        onChange={handleChange}
      />
    </StoryBookExample>
  );
};
