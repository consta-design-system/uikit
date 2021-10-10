import React, { useCallback, useState } from 'react';

import { IconSettings } from '../../../../icons/IconSettings/IconSettings';
import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField/TextField';
import { Slider } from '../../Slider';

export const SliderExampleDisabled = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider min={0} max={100} value={50} step={25} getTooltipContent={getValue} disabled />
    </StoryBookExample>
  );
};

export const SliderExampleDivisionDisabled = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider
        min={0}
        max={100}
        value={50}
        step={25}
        getTooltipContent={getValue}
        division
        disabled
      />
    </StoryBookExample>
  );
};

export const SliderExampleRangeDisabled = () => {
  const getValue = useCallback((val) => {
    return val;
  }, []);

  return (
    <StoryBookExample className={cnDocsDecorator('SectionSlider')}>
      <Slider
        min={0}
        max={100}
        value={[20, 70]}
        step={25}
        getTooltipContent={getValue}
        division
        disabled
      />
    </StoryBookExample>
  );
};

export const SliderExampleComponentDisabled = () => {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState<string>();

  const disabled = true;

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
            disabled
            required
          />
        )}
        suffix={<IconSettings className={cnDocsDecorator('Icon', { disabled })} />}
        value={value}
        onChange={handleChange}
        disabled
      />
    </StoryBookExample>
  );
};
