import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { CreatableSelect, MultiSelect, Select } from '.';

type RenderProps<T> = {
  value?: T;
  onChange: (value: T) => void;
  onBlur: () => void;
};
type ValueKeeperProps<T> = {
  render: (props: RenderProps<T>) => React.ReactNode;
  onChange?: (value: T) => void;
  onBlur?: () => void;
};

function ValueKeeper<T>({ render, onChange, onBlur }: ValueKeeperProps<T>) {
  const [value, setValue] = useState<T>();

  const handleChange = (value: T) => {
    setValue(value);
    onChange && onChange(value);
  };

  const handleBlur = () => onBlur && onBlur();

  return <>{render({ value, onChange: handleChange, onBlur: handleBlur })}</>;
}

const BackgroundDecorator = (story: () => React.ReactNode) => (
  <div style={{ width: '470px' }}>{story()}</div>
);
const knobs = () => ({
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
});

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .addDecorator(BackgroundDecorator)
  .add('Базовый', () => {
    const options = [
      { value: 'value-0', label: 'Дорожно-транспортное происшествие' },
      { value: 'value-1', label: 'Поражение электрическим током' },
      { value: 'value-2', label: 'Работы на высоте' },
      { value: 'value-3', label: 'Пожар' },
      { value: 'value-4', label: 'Разлив нефтепродуктов' },
      { value: 'value-5', label: 'Газо-нефте-водо-проявление' },
      { value: 'value-6', label: 'Авария на платформе' },
      { value: 'value-7', label: 'Воздействие сероводорода' },
      { value: 'value-8', label: 'Дочернее общество 1' },
      { value: 'value-9', label: 'Дочернее общество 2' },
      { value: 'value-10', label: 'Дочернее общество 3' },
      { value: 'value-11', label: 'Дочернее общество 4' },
      { value: 'value-12', label: 'Дочернее общество 5' },
      { value: 'value-13', label: 'Дочернее общество 6' },
      { value: 'value-14', label: 'Дочернее общество 7' },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        render={({ value, onChange }) => (
          <Select
            name="storySelect"
            placeholder="Выберите пункт из селекта"
            options={options}
            value={value}
            onChange={onChange}
            onClearValue={() => {
              onChange(undefined);
            }}
            isDisabled={boolean('isDisabled', false)}
            {...knobs()}
          />
        )}
      />
    );
  })
  .add('С новой опцией', () => {
    const newValueText = text('newValueText', 'Добавить новое значение');
    const options = [
      { value: 'value-0', label: 'Дорожно-транспортное происшествие' },
      { value: 'value-1', label: 'Поражениие электрическим током' },
      { value: 'value-2', label: 'Работы на высоте' },
      { value: 'value-3', label: 'Пожар' },
      { value: 'value-4', label: 'Разлив нефтепродуктов' },
      { value: 'value-5', label: 'Газо-нефте-водо-проявление' },
      { value: 'value-6', label: 'Авария на платформе' },
      { value: 'value-7', label: 'Воздействие сероводорода' },
      { value: 'value-8', label: 'Дочернее общество 1' },
      { value: 'value-9', label: 'Дочернее общество 2' },
      { value: 'value-10', label: 'Дочернее общество 3' },
      { value: 'value-11', label: 'Дочернее общество 4' },
      { value: 'value-12', label: 'Дочернее общество 5' },
      { value: 'value-13', label: 'Дочернее общество 6' },
      { value: 'value-14', label: 'Дочернее общество 7' },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        render={({ value, onChange }) => (
          <CreatableSelect
            name="storySelect"
            placeholder="Выберите пункт из селекта"
            options={options}
            value={value}
            onChange={onChange}
            onClearValue={() => {
              onChange(undefined);
            }}
            onNewOptionCreate={(value) => {
              action('onNewOptionCreate')(value);
            }}
            newValueText={newValueText}
            isDisabled={boolean('isDisabled', false)}
            {...knobs()}
          />
        )}
      />
    );
  })
  .add('Мультиселект', () => {
    const options = [
      { value: 'value-0', label: 'Дорожно-транспортное происшествие' },
      { value: 'value-1', label: 'Поражениие электрическим током' },
      { value: 'value-2', label: 'Работы на высоте' },
      { value: 'value-3', label: 'Пожар' },
      { value: 'value-4', label: 'Разлив нефтепродуктов' },
      { value: 'value-5', label: 'Газо-нефте-водо-проявление' },
      { value: 'value-6', label: 'Авария на платформе' },
      { value: 'value-7', label: 'Воздействие сероводорода' },
      { value: 'value-8', label: 'Дочернее общество 1' },
      { value: 'value-9', label: 'Дочернее общество 2' },
      { value: 'value-10', label: 'Дочернее общество 3' },
      { value: 'value-11', label: 'Дочернее общество 4' },
      { value: 'value-12', label: 'Дочернее общество 5' },
      { value: 'value-13', label: 'Дочернее общество 6' },
      { value: 'value-14', label: 'Дочернее общество 7' },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        render={({ value, onChange }) => (
          <MultiSelect
            name="storySelect"
            placeholder="Выберите пункты из селекта"
            options={options}
            value={value}
            onChange={onChange}
            onClearValue={() => {
              onChange(undefined);
            }}
            isHierarchical
            {...knobs()}
          />
        )}
      />
    );
  })
  .add('Синглселект c иерархией', () => {
    const options = [
      {
        value: 'root-1',
        label: 'Корень 1',
        subOptions: [
          {
            value: 'value-0',
            label: 'Дорожно-транспортное происшествие',
            subOptions: [
              { value: 'value-1', label: 'Поражениие электрическим током' },
              { value: 'value-2', label: 'Работы на высоте' },
              { value: 'value-3', label: 'Пожар' },
            ],
          },
          {
            value: 'value-4',
            label: 'Разлив нефтепродуктов',
            subOptions: [
              { value: 'value-5', label: 'Газо-нефте-водо-проявление' },
              { value: 'value-6', label: 'Авария на платформе' },
              { value: 'value-7', label: 'Воздействие сероводорода' },
            ],
          },
        ],
      },
      {
        value: 'root-2',
        label: 'Корень 2',
        subOptions: [
          { value: 'value-8', label: 'Дочернее общество 1' },
          { value: 'value-9', label: 'Дочернее общество 2' },
          { value: 'value-10', label: 'Дочернее общество 3' },
          { value: 'value-11', label: 'Дочернее общество 4' },
          { value: 'value-12', label: 'Дочернее общество 5' },
          { value: 'value-13', label: 'Дочернее общество 6' },
          { value: 'value-14', label: 'Дочернее общество 7' },
        ],
      },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        render={({ value, onChange }) => (
          <Select
            name="storySelect"
            placeholder="Выберите пункты из селекта"
            options={options}
            value={value}
            onChange={onChange}
            onClearValue={() => {
              onChange(undefined);
            }}
            isHierarchical
            isDisabled={boolean('isDisabled', false)}
            {...knobs()}
          />
        )}
      />
    );
  })
  .add('Мультиселект c иерархией', () => {
    const options = [
      {
        value: 'root-1',
        label: 'Корень 1',
        subOptions: [
          {
            value: 'value-0',
            label: 'Дорожно-транспортное происшествие',
            subOptions: [
              { value: 'value-1', label: 'Поражениие электрическим током' },
              { value: 'value-2', label: 'Работы на высоте' },
              { value: 'value-3', label: 'Пожар' },
            ],
          },
          {
            value: 'value-4',
            label: 'Разлив нефтепродуктов',
            subOptions: [
              { value: 'value-5', label: 'Газо-нефте-водо-проявление' },
              { value: 'value-6', label: 'Авария на платформе' },
              { value: 'value-7', label: 'Воздействие сероводорода' },
            ],
          },
        ],
      },
      {
        value: 'root-2',
        label: 'Корень 2',
        subOptions: [
          { value: 'value-8', label: 'Дочернее общество 1' },
          { value: 'value-9', label: 'Дочернее общество 2' },
          { value: 'value-10', label: 'Дочернее общество 3' },
          { value: 'value-11', label: 'Дочернее общество 4' },
          { value: 'value-12', label: 'Дочернее общество 5' },
          { value: 'value-13', label: 'Дочернее общество 6' },
          { value: 'value-14', label: 'Дочернее общество 7' },
        ],
      },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        render={({ value, onChange }) => (
          <MultiSelect
            name="storySelect"
            placeholder="Выберите пункты из селекта"
            options={options}
            value={value}
            onChange={onChange}
            onClearValue={() => {
              onChange(undefined);
            }}
            isHierarchical
            {...knobs()}
          />
        )}
      />
    );
  });
