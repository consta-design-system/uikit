import React from 'react';
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
