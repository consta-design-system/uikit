import { ClassNameFormatter } from '@bem-react/classname';

export type CSSTransitionClassNames = {
  appear: string;
  appearActive: string;
  appearDone: string;
  enter: string;
  enterActive: string;
  enterDone: string;
  exit: string;
  exitActive: string;
  exitDone: string;
};

export function cnForCssTransition(
  cnFunction: ClassNameFormatter,
  animateName = 'animate',
): CSSTransitionClassNames {
  return {
    appear: cnFunction({ [animateName]: 'appear' }),
    appearActive: cnFunction({ [animateName]: 'appearActive' }),
    appearDone: cnFunction({ [animateName]: 'appearDone' }),
    enter: cnFunction({ [animateName]: 'enter' }),
    enterActive: cnFunction({ [animateName]: 'enterActive' }),
    enterDone: cnFunction({ [animateName]: 'enterDone' }),
    exit: cnFunction({ [animateName]: 'exit' }),
    exitActive: cnFunction({ [animateName]: 'exitActive' }),
    exitDone: cnFunction({ [animateName]: 'exitDone' }),
  };
}
