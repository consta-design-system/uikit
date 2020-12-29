import React from 'react';

const eventInterceptorPropComponent = [
  'Button',
  'TextField',
  'Checkbox',
  'SnackBar',
  'BasicSelect',
] as const;
export type EventInterceptorPropComponent = typeof eventInterceptorPropComponent[number];

export type EventInterceptorProps = {
  component: EventInterceptorPropComponent;
  event?: string;
  options: {
    [key: string]: any;
  };
};

// eslint-disable-next-line no-empty-pattern,@typescript-eslint/no-empty-function
const EventInterceptorContext = React.createContext(({}: EventInterceptorProps) => {});

const EventInterceptorProvider = ({ children }: { children: React.ReactNode }, { ...rest }) => {
  const eventInterceptor = ({ component, event, ...otherProps }: EventInterceptorProps) => {
    console.log('EventInterceptor Info: ', { component, event, ...otherProps });
  };

  return (
    <EventInterceptorContext.Provider value={eventInterceptor} {...rest}>
      {children}
    </EventInterceptorContext.Provider>
  );
};

export { EventInterceptorContext, EventInterceptorProvider };
