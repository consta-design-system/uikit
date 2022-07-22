import './Code.css';

import { cnIcon } from '@consta/uikit/Icon';
import { IconAllDone } from '@consta/uikit/IconAllDone';
import { IconCopy } from '@consta/uikit/IconCopy';
import { cnMixFocus } from '@consta/uikit/MixFocus';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef } from 'react';
import Highlight from 'react-highlight';
import { CSSTransition } from 'react-transition-group';

import { cn } from '##/utils/bem';
import { cnForCssTransition } from '##/utils/cnForCssTransition';

const cnCode = cn('Code');
const cnCodeIcon = cn('Code-Icon');
const cssTransitionClassNames = cnForCssTransition(cnCodeIcon);
const animateTimeout = 300;

const CopyButton = (props: {
  copied?: boolean;
  onClick: React.MouseEventHandler;
}) => {
  const { copied, onClick } = props;
  const iconRef = useRef<HTMLSpanElement>(null);
  const copiedRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={cnCode('Copy')}>
      <button
        type="button"
        onClick={onClick}
        className={cnCode('CopyButton', [cnIcon({ size: 'xs' }), cnMixFocus()])}
      >
        <CSSTransition
          in={!copied}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={iconRef}
        >
          <IconCopy
            className={cnCode('Icon', { withCloseIcon: true })}
            size="xs"
            ref={iconRef}
          />
        </CSSTransition>
        <CSSTransition
          in={copied}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={copiedRef}
        >
          <IconAllDone
            className={cnCode('Icon', { withCloseIcon: true })}
            size="xs"
            ref={copiedRef}
          />
        </CSSTransition>
      </button>
    </div>
  );
};

export const Code = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const { children, className, ...otherProps } = props;
  const [copied, setCopied] = useFlag();

  const handleClick = () => {
    if (children) {
      navigator.clipboard.writeText(children?.toString());
    }
    setCopied.on();
    setTimeout(setCopied.off, 2000);
  };

  if (className) {
    return (
      <div className={cnCode(null, [className])}>
        <Highlight {...otherProps} className={className}>
          {children}
        </Highlight>
        <CopyButton copied={copied} onClick={handleClick} />
      </div>
    );
  }
  return <code className={cnCode('Param')}>{children}</code>;
};
