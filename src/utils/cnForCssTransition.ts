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

function cnFunctionHelper(
  cnFunction: ClassNameFormatter,
  animateName: string,
  animate: string,
  element?: string,
) {
  return element
    ? cnFunction(element, { [animateName]: animate })
    : cnFunction({ [animateName]: animate });
}

export function cnForCssTransition(
  cnFunction: ClassNameFormatter,
  element?: string,
  animateName = 'animate',
): CSSTransitionClassNames {
  return {
    appear: cnFunctionHelper(cnFunction, animateName, 'appear', element),
    appearActive: cnFunctionHelper(
      cnFunction,
      animateName,
      'appearActive',
      element,
    ),
    appearDone: cnFunctionHelper(
      cnFunction,
      animateName,
      'appearDone',
      element,
    ),
    enter: cnFunctionHelper(cnFunction, animateName, 'enter', element),
    enterActive: cnFunctionHelper(
      cnFunction,
      animateName,
      'enterActive',
      element,
    ),
    enterDone: cnFunctionHelper(cnFunction, animateName, 'enterDone', element),
    exit: cnFunctionHelper(cnFunction, animateName, 'exit', element),
    exitActive: cnFunctionHelper(
      cnFunction,
      animateName,
      'exitActive',
      element,
    ),
    exitDone: cnFunctionHelper(cnFunction, animateName, 'exitDone', element),
  };
}
