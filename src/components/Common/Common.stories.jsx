import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ValueKeeper from '../../utils/testHelpers/ValueKeeper';
import './styles.css';

import Button from '../Button';
import Textarea from '../Textarea';
import Input from '../Input';
import ChoiceGroup from '../ChoiceGroup';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

const buttonKnobs = () => ({
  width: select('Button Width', ['full', 'default'], 'default'),
  // wpSize: select('Button Size', ['s', 'm', 'l', 'xl'], 'm'),
  // view: select('Button View', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'Button Form',
    ['default', 'brick', 'round', 'brick-round', 'round-brick', 'brick-default', 'default-brick'],
    'default',
  ),
  disabled: boolean('Button Disabled', false),
});

const inputKnobs = () => ({
  view: select('Input View', ['default'], 'default'),
  width: select('Input Width', ['full', 'default'], 'default'),
  // wpSize: select('Input Size', ['s', 'm', 'l', 'xl'], 'm'),
  form: select(
    'Input Form',
    [
      'default',
      'brick',
      'round',
      'clear',
      'clear-round',
      'round-clear',
      'clear-default',
      'default-clear',
      'default-brick',
      'brick-default',
      'brick-clear',
      'clear-brick',
      'clear-clear',
    ],
    'default',
  ),
  state: select('Input State', ['', 'alert', 'success', 'warning'], ''),
  disabled: boolean('Input Disabled', false),
});

const choiceGroupKnobs = () => ({
  wpSize: select('ChoiceGroup Size', ['s', 'm', 'l', 'xl'], 'l'),
  form: select('ChoiceGroup Form', ['default', 'round', 'brick'], 'default'),
  disabled: boolean('ChoiceGroup Disabled', false),
});

const checkboxKnobs = () => ({
  disabled: boolean('Checkbox Disabled', false),
  intermediate: boolean('Checkbox Intermediate', false),
  // wpSize: select('Checkbox Size', ['m', 'l'], 'm'),
});

const radioKnobs = () => ({
  disabled: boolean('Radio Disabled', false),
  // wpSize: select('Radio Size', ['m', 'l'], 'm'),
});

storiesOf('Common', module)
  .addDecorator(withKnobs)
  .add('Общий список', () => {
    const items = [
      {
        value: 1,
        label: '1 choice',
      },
      {
        value: 2,
        label: '2 choice',
      },
      {
        value: 3,
        label: 'The third choice',
      },
    ];

    return (
      <div className="common">
        <section className="common__buttons">
          <h2>Buttons</h2>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xl button_view_primary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_primary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_primary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_primary"
            >
              {text('Button Content', 'I am button')}
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xl button_view_secondary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_secondary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_secondary"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_secondary"
            >
              {text('Button Content', 'I am button')}
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xl button_view_ghost"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_ghost"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_ghost"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_ghost"
            >
              {text('Button Content', 'I am button')}
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xl button_view_clear"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_clear"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_clear"
            >
              {text('Button Content', 'I am button')}
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_clear"
            >
              {text('Button Content', 'I am button')}
            </Button>
          </div>
        </section>

        <section className="common__inputs">
          <h2>Inputs</h2>
          <div>
            <Textarea
              placeholder={text('Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_xl"
            />
            <Input
              placeholder={text('Input Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_xl"
            />
          </div>
          <div>
            <Textarea
              placeholder={text('Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_l"
            />
            <Input
              placeholder={text('Input Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_l"
            />
          </div>
          <div>
            <Textarea
              placeholder={text('Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_m"
            />
            <Input
              placeholder={text('Input Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_m"
            />
          </div>
          <div>
            <Textarea
              placeholder={text('Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_s"
            />
            <Input
              placeholder={text('Input Placeholder', 'My placeholder')}
              {...inputKnobs()}
              className="input_size_s"
            />
          </div>

          <h3>Input + input</h3>
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_brick-default"
          />

          <h3>Input + input + input</h3>
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_brick-clear"
          />
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_brick-default"
          />

          <h3>Input + button</h3>
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Button
            onClick={action('click')}
            className="button_size_m button_view_primary button_form_brick-default"
          >
            {text('Button Content', 'I am button')}
          </Button>

          <h3>Input + input + button</h3>
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder={text('Input Placeholder', 'My placeholder')}
            className="input_view_default input_size_m input_form_brick-clear"
          />
          <Button
            onClick={action('click')}
            className="button_size_m button_view_primary button_form_brick-default"
          >
            {text('Button Content', 'I am button')}
          </Button>
        </section>

        <section>
          <h2>ChoiceGroup</h2>
          <ValueKeeper
            onChange={action('onChange')}
            onBlur={action('onBlur')}
            render={({ value, onChange, onBlur }) => {
              return (
                <ChoiceGroup
                  isMultiple={false}
                  value={value}
                  items={items}
                  {...choiceGroupKnobs()}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              );
            }}
          />
        </section>

        <section className="common__checkbox">
          <h2>Checkbox</h2>
          <div>
            <Checkbox {...checkboxKnobs()} className="checkbox_size_m">
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox {...checkboxKnobs()} className="checkbox_size_m">
              {'Check me, baby!'}
            </Checkbox>
          </div>
          <div>
            <Checkbox {...checkboxKnobs()} className="checkbox_size_l">
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox {...checkboxKnobs()} className="checkbox_size_l">
              {'Check me, baby!'}
            </Checkbox>
          </div>
        </section>

        <section className="common__radio">
          <h2>Radio</h2>
          <div>
            <Radio {...radioKnobs()} className="radio_size_m">
              {text('Content', 'I am radio')}
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_m">
              {text('Content', 'I am radio')}
            </Radio>
          </div>
          <div>
            <Radio {...radioKnobs()} className="radio_size_l">
              {text('Content', 'I am radio')}
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_l">
              {text('Content', 'I am radio')}
            </Radio>
          </div>
        </section>
      </div>
    );
  });
