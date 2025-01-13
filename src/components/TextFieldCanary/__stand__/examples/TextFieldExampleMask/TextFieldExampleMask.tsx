import { IconRevert } from '@consta/icons/IconRevert';
import { Example } from '@consta/stand';
import React, { useCallback, useState } from 'react';
import { ReactMaskOpts, useIMask } from 'react-imask';

import { Button } from '##/components/Button';
import { FieldWrapper } from '##/components/FieldComponents';
import { FieldGroup } from '##/components/FieldGroup';
import { FieldLabel } from '##/components/FieldLabel';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleMaskAmount = () => {
  const { ref, value, unmaskedValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({
    mask: Number,
    min: 0,
    scale: 2,
    thousandsSeparator: ' ',
    radix: ',',
    padFractionalZeros: true,
    autofix: true,
    lazy: true,
    normalizeZeros: true,
    mapToRadix: ['.'],
  });

  return (
    <Example col={{ 1: 0, 3: 700 }}>
      <TextField defaultValue="1000000" placeholder="0" inputRef={ref} />
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Value</FieldLabel>
        <Text>{value}</Text>
      </>
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>
          UnmaskedValue
        </FieldLabel>
        <Text>{unmaskedValue}</Text>
      </>
    </Example>
  );
};

export const TextFieldExampleMaskPhone = () => {
  const { ref, value, unmaskedValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({
    mask: '+{7}(000)000-00-00',
  });

  return (
    <Example col={{ 1: 0, 3: 700 }}>
      <TextField
        placeholder="+7(999)999-99-99"
        inputRef={ref}
        defaultValue="9876543210"
      />
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Value</FieldLabel>
        <Text>{value}</Text>
      </>
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>
          UnmaskedValue
        </FieldLabel>
        <Text>{unmaskedValue}</Text>
      </>
    </Example>
  );
};

export const TextFieldExampleMaskPassport = () => {
  const { ref, value, unmaskedValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({
    mask: '00 00 000000',
  });

  return (
    <Example col={{ 1: 0, 3: 700 }}>
      <TextField
        placeholder="00 00 000000"
        defaultValue="1234567890"
        inputRef={ref}
      />
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Value</FieldLabel>
        <Text>{value}</Text>
      </>
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>
          UnmaskedValue
        </FieldLabel>
        <Text>{unmaskedValue}</Text>
      </>
    </Example>
  );
};

export const TextFieldExampleMaskBankAccount = () => {
  const { ref, value, unmaskedValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({
    mask: '0000 0000 0000 0000',
  });

  return (
    <Example col={{ 1: 0, 3: 700 }}>
      <TextField
        placeholder="1111 1111 1111 1111"
        defaultValue="1111222233334444"
        inputRef={ref}
      />
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Value</FieldLabel>
        <Text>{value}</Text>
      </>
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>
          UnmaskedValue
        </FieldLabel>
        <Text>{unmaskedValue}</Text>
      </>
    </Example>
  );
};

const defaultValue = '9876543210';

export const TextFieldExampleMaskSetValue = () => {
  const { ref, setValue } = useIMask<HTMLInputElement, ReactMaskOpts>({
    mask: '+{7}(000)000-00-00',
  });

  return (
    <Example col={1}>
      <FieldWrapper label="Телефон">
        <FieldGroup>
          <TextField
            placeholder="+7(999)999-99-99"
            inputRef={ref}
            defaultValue={defaultValue}
            clearButton
            onClear={() => setValue('')}
          />
          <Button
            iconLeft={IconRevert}
            onClick={() => setValue(defaultValue)}
            title="Сбросить"
          />
        </FieldGroup>
      </FieldWrapper>
    </Example>
  );
};

export const TextFieldExampleMaskArraySn = () => {
  const mask = 'SN-000000';
  const [value, setValue] = useState<string[] | null>(null);
  const [error, setError] = useState<string>('');
  const { ref, setValue: setInputValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({ mask });

  const onChange = useCallback((value: string[] | null) => {
    if (
      (value?.length && value[value.length - 1].length === mask.length) ||
      value?.length === 0
    ) {
      setValue(value);
      setError('');
      setInputValue('');
    } else {
      setError(`Пожалуйста введите серийный номер в формате "${mask}"`);
    }
  }, []);

  const onInputChange = useCallback(() => setError(''), []);

  const onClear = useCallback(() => {
    setValue(null);
    setInputValue('');
  }, []);

  const status = error ? 'alert' : undefined;

  return (
    <Example col={1}>
      <FieldWrapper label="Серийные номера" caption={error} status={status}>
        <TextField
          type="textarray"
          inputRef={ref}
          value={value}
          onChange={onChange}
          onInputChange={onInputChange}
          status={status}
          placeholder={mask}
          clearButton
          onClear={onClear}
        />
      </FieldWrapper>
    </Example>
  );
};
