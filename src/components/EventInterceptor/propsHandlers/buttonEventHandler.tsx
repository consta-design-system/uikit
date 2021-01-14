import { PropsWithAsAttributes } from '../../../utils/types/PropsWithAsAttributes';
import { Props } from '../../Button/Button';
import { EventInterceptorHandler, EventInterceptorPropComponent } from '../EventInterceptor';

type ButtonProps<As extends keyof JSX.IntrinsicElements = 'button'> = PropsWithAsAttributes<
  Props,
  As
>;

export const buttonEventHandler = (props: ButtonProps, handler: EventInterceptorHandler) => {
  const newProps = { ...props };
  if (handler) {
    newProps.onClick = (...onClickArgs) => {
      const [e] = onClickArgs;
      const value = {
        component: 'Button' as EventInterceptorPropComponent,
        event: e.type,
        options: {
          text: (e.currentTarget as HTMLButtonElement).innerText,
          pageURL: e.currentTarget.baseURI,
          DOMRef: e.currentTarget,
        },
      };
      handler(value);

      return props.onClick?.(...onClickArgs);
    };
  }

  return newProps;
};
