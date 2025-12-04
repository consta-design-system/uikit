import { startOfDay } from 'date-fns';

export const groupsByDay = (date: Date) => startOfDay(date).getTime();
