import { IconRevert } from '@consta/icons/IconRevert';
import { Example } from '@consta/stand';
import React, { memo } from 'react';
import { ReactMaskOpts, useIMask } from 'react-imask';

import { Button } from '##/components/Button';
import { FieldGroup } from '##/components/FieldGroup';
import { FieldLabel } from '##/components/FieldLabel';
import { Text } from '##/components/Text';
import { TextField } from '##/components/TextField';
import { cnMixSpace } from '##/mixs/MixSpace';

const TextFieldMemo = memo(TextField);

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
      <TextFieldMemo
        defaultValue="1000000"
        label="Сумма"
        placeholder="0"
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

export const TextFieldExampleMaskPhone = () => {
  const { ref, value, unmaskedValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >({
    mask: '+{7}(000)000-00-00',
  });

  return (
    <Example col={{ 1: 0, 3: 700 }}>
      <TextFieldMemo
        label="Телефон"
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
      <TextFieldMemo
        label="паспорт"
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
      <TextFieldMemo
        label="Номер карты"
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
    <Example>
      <>
        <FieldLabel className={cnMixSpace({ mB: 'xs' })}>Телефон</FieldLabel>
        <FieldGroup>
          <TextFieldMemo
            placeholder="+7(999)999-99-99"
            inputRef={ref}
            defaultValue={defaultValue}
          />
          <Button
            iconLeft={IconRevert}
            onClick={() => setValue(defaultValue)}
            title="Сбросить"
          />
        </FieldGroup>
      </>
    </Example>
  );
};
