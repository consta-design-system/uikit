import React from 'react';
import { withKnobs, select, boolean, radios } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ValueKeeper from '../../utils/testHelpers/ValueKeeper';
import './styles.css';

import Button from '../Button/Button';
import Textarea from '../Textarea';
import Input from '../Input';
import ChoiceGroup from '../ChoiceGroup';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Switch from '../Switch';
import { Select, MultiSelect } from '../Select';

const buttonKnobs = () => ({
  width: radios('Button Width', ['full', 'default'], 'default'),
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
  form: select(
    'Input Form',
    [
      'default',
      'brick',
      'round',
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
  form: select('ChoiceGroup Form', ['default', 'round', 'brick'], 'default'),
  disabled: boolean('ChoiceGroup Disabled', false),
});

const radioKnobs = () => ({
  disabled: boolean('Radio Disabled', false),
});

storiesOf('Common controls', module)
  .addDecorator(withKnobs)
  .add('Общий список контролов', () => {
    const choiceGroupItems = [
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

    const selectOptions = [
      { value: 'value-0', label: 'Fantastic!' },
      { value: 'value-1', label: 'Awesome!' },
      { value: 'value-2', label: 'Fine.' },
      { value: 'value-3', label: 'Ok.' },
      { value: 'value-4', label: 'Not bad.' },
      { value: 'value-5', label: "Could've been better" },
      { value: 'value-6', label: 'Not so good' },
      { value: 'value-7', label: 'Bad' },
      { value: 'value-8', label: 'Awful' },
    ];

    return (
      <div className="common">
        <section className="common__buttons">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Buttons</h2>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_primary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_primary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_primary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xs button_view_primary"
            >
              Click me, babe!
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_secondary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_secondary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_secondary"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xs button_view_secondary"
            >
              Click me, babe!
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_ghost"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_ghost"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_ghost"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xs button_view_ghost"
            >
              Click me, babe!
            </Button>
          </div>
          <div>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_l button_view_clear"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_m button_view_clear"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_s button_view_clear"
            >
              Click me, babe!
            </Button>
            <Button
              onClick={action('click')}
              {...buttonKnobs()}
              className="button_size_xs button_view_clear"
            >
              Click me, babe!
            </Button>
          </div>
        </section>

        <section className="common__inputs">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Inputs</h2>
          <div>
            <Textarea placeholder="Type something" {...inputKnobs()} className="input_size_l" />
            <Input placeholder="Type something" {...inputKnobs()} className="input_size_l" />
          </div>
          <div>
            <Textarea placeholder="Type something" {...inputKnobs()} className="input_size_m" />
            <Input placeholder="Type something" {...inputKnobs()} className="input_size_m" />
          </div>
          <div>
            <Textarea placeholder="Type something" {...inputKnobs()} className="input_size_s" />
            <Input placeholder="Type something" {...inputKnobs()} className="input_size_s" />
          </div>
          <div>
            <Textarea placeholder="Type something" {...inputKnobs()} className="input_size_xs" />
            <Input placeholder="Type something" {...inputKnobs()} className="input_size_xs" />
          </div>

          <h3>Input + input</h3>
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_brick-default"
          />

          <h3>Input + input + input</h3>
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_brick-clear"
          />
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_brick-default"
          />

          <h3>Input + button</h3>
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Button
            onClick={action('click')}
            className="button_size_m button_view_primary button_form_brick-default"
          >
            Click me, babe!
          </Button>

          <h3>Input + input + button</h3>
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_default-clear"
          />
          <Input
            placeholder="Type something"
            className="input_view_default input_size_m input_form_brick-clear"
          />
          <Button
            onClick={action('click')}
            className="button_size_m button_view_primary button_form_brick-default"
          >
            Click me, babe!
          </Button>
        </section>

        <section className="common__select">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Select</h2>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <Select
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isDisabled={boolean('isDisabled', false)}
                  wpSize="l"
                />
              )}
            />
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <MultiSelect
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isHierarchical
                  wpSize="l"
                />
              )}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <Select
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isDisabled={boolean('isDisabled', false)}
                  wpSize="m"
                />
              )}
            />
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <MultiSelect
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isHierarchical
                  wpSize="m"
                />
              )}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <Select
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isDisabled={boolean('isDisabled', false)}
                  wpSize="s"
                />
              )}
            />
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <MultiSelect
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isHierarchical
                  wpSize="s"
                />
              )}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <Select
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isDisabled={boolean('isDisabled', false)}
                  wpSize="xs"
                />
              )}
            />
            <ValueKeeper
              onChange={action('onChange')}
              render={({ value, onChange }) => (
                <MultiSelect
                  name="storySelect"
                  placeholder="Howdily doodily?"
                  options={selectOptions}
                  value={value}
                  onChange={onChange}
                  onClearValue={() => {
                    onChange(undefined);
                  }}
                  isHierarchical
                  wpSize="xs"
                />
              )}
            />
          </div>
        </section>

        <section className="common__choicegroup">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">ChoiceGroup</h2>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              onBlur={action('onBlur')}
              render={({ value, onChange, onBlur }) => {
                return (
                  <ChoiceGroup
                    isMultiple={false}
                    value={value}
                    wpSize="l"
                    items={choiceGroupItems}
                    {...choiceGroupKnobs()}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              onBlur={action('onBlur')}
              render={({ value, onChange, onBlur }) => {
                return (
                  <ChoiceGroup
                    isMultiple={false}
                    value={value}
                    wpSize="m"
                    items={choiceGroupItems}
                    {...choiceGroupKnobs()}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              onBlur={action('onBlur')}
              render={({ value, onChange, onBlur }) => {
                return (
                  <ChoiceGroup
                    isMultiple={false}
                    value={value}
                    wpSize="s"
                    items={choiceGroupItems}
                    {...choiceGroupKnobs()}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </div>
          <div>
            <ValueKeeper
              onChange={action('onChange')}
              onBlur={action('onBlur')}
              render={({ value, onChange, onBlur }) => {
                return (
                  <ChoiceGroup
                    isMultiple={false}
                    value={value}
                    wpSize="xs"
                    items={choiceGroupItems}
                    {...choiceGroupKnobs()}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </div>
        </section>

        <section className="common__checkbox">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Checkbox</h2>
          <div>
            <Checkbox className="checkbox_size_m">{'Check me, baby!'}</Checkbox>
            <Checkbox className="checkbox_size_m" value={true}>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_m" intermediate={true}>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_m" disabled>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_m" value={true} disabled>
              {'Check me, baby!'}
            </Checkbox>
          </div>
          <div>
            <Checkbox className="checkbox_size_l">{'Check me, baby!'}</Checkbox>
            <Checkbox className="checkbox_size_l" value={true}>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_l" intermediate={true}>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_l" disabled>
              {'Check me, baby!'}
            </Checkbox>
            <Checkbox className="checkbox_size_l" value={true} disabled>
              {'Check me, baby!'}
            </Checkbox>
          </div>
        </section>

        <section className="common__radio">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Radio</h2>
          <div>
            <Radio {...radioKnobs()} className="radio_size_m">
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_m" value={true}>
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_m" disabled>
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_m" disabled value={true}>
              I am radio
            </Radio>
          </div>
          <div>
            <Radio {...radioKnobs()} className="radio_size_l">
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_l" value={true}>
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_l" disabled>
              I am radio
            </Radio>
            <Radio {...radioKnobs()} className="radio_size_l" disabled value={true}>
              I am radio
            </Radio>
          </div>
        </section>

        <section className="common__switch">
          <h2 className="text text_size_3xl text_view_primary text_weight-bold">Switch</h2>
          <div>
            <Switch wpSize="m">Move me, I beg you!</Switch>
            <Switch wpSize="m" value={true}>
              Move me, I beg you!
            </Switch>
            <Switch wpSize="m" disabled>
              Move me, I beg you!
            </Switch>
            <Switch wpSize="m" value={true} disabled>
              Move me, I beg you!
            </Switch>
          </div>
          <div>
            <Switch wpSize="l">Move me, I beg you!</Switch>
            <Switch wpSize="l" value={true}>
              Move me, I beg you!
            </Switch>
            <Switch wpSize="l" disabled>
              Move me, I beg you!
            </Switch>
            <Switch wpSize="l" value={true} disabled>
              Move me, I beg you!
            </Switch>
          </div>
        </section>
      </div>
    );
  });
