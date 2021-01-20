import { PropsWithAsAttributes } from '../../../utils/types/PropsWithAsAttributes';
import { cnButton, Props } from '../../Button/Button';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

export type ButtonProps<As extends keyof JSX.IntrinsicElements = 'button'> = PropsWithAsAttributes<
  Props,
  As
>;

export const useButtonEventHandler = (props: ButtonProps, handler: EventInterceptorHandler) => {
  const newProps = { ...props };

  newProps.onClick = (...onClickArgs) => {
    const [e] = onClickArgs;
    const value = {
      component: cnButton() as EventInterceptorPropComponent,
      event: e.type,
      options: {
        text: (e.currentTarget as HTMLButtonElement).innerText,
        pageURL: e.currentTarget.baseURI,
        DOMRef: e.currentTarget,
      },
    };
    handler!(value);

    return props.onClick?.(...onClickArgs);
  };

  return newProps;
};
