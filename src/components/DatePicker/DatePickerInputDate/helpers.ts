import { format, isValid } from 'date-fns';

export const getInputValue = (value?: Date) => {
  return value && isValid(value) ? format(value, 'yyyy-MM-dd') : '';
};

export const getDateMidnightFromString = (dateString: string) => {
  return new Date(`${dateString}T00:00:00`);
};

export const isParsedFromInputDateExists = (dateString: string) => {
  return isValid(new Date(dateString));
};

export const isDateFromInputIsFullyEntered = (date: Date) => {
  return Boolean(String(date.getFullYear()).length === 4);
};
