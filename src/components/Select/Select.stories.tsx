import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';

import { Select, MultiSelect, CreatableSelect } from './';

const knobs = () => ({
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
});

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('Базовый', () => {
    const isDisabled = boolean('isDisabled', false);
    const isError = boolean('isError', false);
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

    class Story extends React.PureComponent<{}, { selectedOption?: string }> {
      constructor(props: {}) {
        super(props);

        this.state = {
          selectedOption: undefined,
        };
      }

      handleChange = (selectValue: string) => {
        this.setState({ selectedOption: selectValue });
      };
      render() {
        const { selectedOption } = this.state;

        return (
          <div style={{ width: '470px' }}>
            <Select
              name="storySelect"
              placeholder="Выберите пункт из селекта"
              options={options}
              value={selectedOption}
              onChange={this.handleChange}
              onClearValue={() => {
                this.setState({
                  selectedOption: undefined,
                });
              }}
              isDisabled={isDisabled}
              isError={isError}
              {...knobs()}
            />
          </div>
        );
      }
    }

    return <Story />;
  })
  .add('С новой опцией', () => {
    const isDisabled = boolean('isDisabled', false);
    const isError = boolean('isError', false);
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

    class Story extends React.PureComponent<{}, { selectedOption?: string }> {
      constructor(props: {}) {
        super(props);

        this.state = {
          selectedOption: undefined,
        };
      }

      handleChange = (selectValue: string) => {
        this.setState({ selectedOption: selectValue });
      };
      render() {
        const { selectedOption } = this.state;

        return (
          <div style={{ width: '470px' }}>
            <CreatableSelect
              {...knobs()}
              name="storySelect"
              placeholder="Выберите пункт из селекта"
              options={options}
              value={selectedOption}
              onChange={this.handleChange}
              onClearValue={() => {
                this.setState({
                  selectedOption: undefined,
                });
              }}
              onNewOptionCreate={value => {
                action('onNewOptionCreate')(value);
              }}
              newValueText={newValueText}
              isDisabled={isDisabled}
              isError={isError}
            />
          </div>
        );
      }
    }

    return <Story />;
  })
  .add('Мультселект', () => {
    const isDisabled = boolean('isDisabled', false);
    const isError = boolean('isError', false);
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

    class Story extends React.PureComponent<{}, { selectedOption?: string[] }> {
      constructor(props: {}) {
        super(props);

        this.state = {
          selectedOption: undefined,
        };
      }

      handleChange = (selectValue: string[]) => {
        this.setState({ selectedOption: selectValue });
      };
      render() {
        const { selectedOption } = this.state;

        return (
          <div style={{ width: '470px' }}>
            <MultiSelect
              {...knobs()}
              name="storySelect"
              placeholder="Выберите пункты из селекта"
              options={options}
              value={selectedOption}
              onChange={this.handleChange}
              onClearValue={() => {
                this.setState({
                  selectedOption: undefined,
                });
              }}
              allOption={{ value: 'all', label: 'Все опции сразу' }}
              isDisabled={isDisabled}
              isError={isError}
            />
          </div>
        );
      }
    }

    return <Story />;
  });
