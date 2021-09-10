import React from 'react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { DecoratorFn } from '@storybook/react';

// После переезда на Storybook@6 можно будет импортить типы оттуда
type CSFStory = {
  (): JSX.Element;
  story?: {
    name?: string;
    decorators?: readonly DecoratorFn[];
    parameters?: { [name: string]: unknown };
  };
};

type StoryMetadata = {
  title: string;
  id: string;
  decorators?: readonly DecoratorFn[];
  includeStories?: string[];
  excludeStories?: string[];
  parameters?: {
    docs?: {
      page: (props: any) => JSX.Element;
    };
    design?: {
      type: string;
      url: string;
    };
  };
};

export const createStory = (Component: CSFStory, params: CSFStory['story'] = {}): CSFStory => {
  const wrapper = () => <Component />;
  wrapper.story = { ...params };
  return wrapper;
};

export const createMetadata = (params: StoryMetadata) => params;

export const getStoryIds = (obj: Record<string, unknown>) => Object.keys(obj);

type CallbackSelectorParams = {
  name: string;
  isActive?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callbackWithSelector = <T extends (...args: any[]) => any>(
  { name, isActive = true }: CallbackSelectorParams,
  fn: T,
) => {
  const defaultOptions = ['undefined', '() => void'];
  const options = isActive ? defaultOptions.reverse() : defaultOptions;

  const fnIsActive = select(name, options, options[0]) !== 'undefined';

  return (...args: Parameters<T>): ReturnType<T> | void => {
    if (fnIsActive) {
      action(name)(...args);
      return fn(...args);
    }
  };
};
