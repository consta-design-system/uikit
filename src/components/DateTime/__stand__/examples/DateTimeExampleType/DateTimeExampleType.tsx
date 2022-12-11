import { Example } from '@consta/stand';
import React from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExampleTypeYear = () => {
  return (
    <Example>
      <DateTime type="year" />
    </Example>
  );
};

export const DateTimeExampleTypeMonth = () => {
  return (
    <Example>
      <DateTime type="month" />
    </Example>
  );
};

export const DateTimeExampleTypeDate = () => {
  return (
    <Example>
      <DateTime type="date" />
    </Example>
  );
};

export const DateTimeExampleTypeDateTime = () => {
  return (
    <Example>
      <DateTime type="date-time" />
    </Example>
  );
};

export const DateTimeExampleTypeTime = () => {
  return (
    <Example>
      <DateTime type="time" />
    </Example>
  );
};
