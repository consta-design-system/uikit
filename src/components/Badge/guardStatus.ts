import { BadgePropStatus } from './types';

export const guardStatus = (status: BadgePropStatus): BadgePropStatus =>
  status === 'error' ? 'alert' : status;
