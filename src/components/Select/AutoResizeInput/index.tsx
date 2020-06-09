import './styles.css';

import React, { useLayoutEffect, useRef } from 'react';

import bem from '../../../utils/bem';

const b = bem('autoresize-input');

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onKeyDown?: React.KeyboardEventHandler;
};

const copyStyles = (styles: CSSStyleDeclaration, node: HTMLElement) => {
  // eslint-disable-next-line no-param-reassign
  node.style.fontSize = styles.fontSize;
  // eslint-disable-next-line no-param-reassign
  node.style.fontFamily = styles.fontFamily;
  // eslint-disable-next-line no-param-reassign
  node.style.fontWeight = styles.fontWeight;
  // eslint-disable-next-line no-param-reassign
  node.style.fontStyle = styles.fontStyle;
  // eslint-disable-next-line no-param-reassign
  node.style.letterSpacing = styles.letterSpacing;
  // eslint-disable-next-line no-param-reassign
  node.style.textTransform = styles.textTransform;
};

export const AutoResizeInput: React.FC<Props> = ({ inputRef, ...rest }) => {
  const controlRef = useRef<HTMLInputElement | null>(null);
  const sizerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const inputNode = controlRef.current;
    const sizerNode = sizerRef.current;

    if (inputNode && sizerNode) {
      const inputStyles = window.getComputedStyle(inputNode);

      copyStyles(inputStyles, sizerNode);
    }
  }, []);

  useLayoutEffect(() => {
    const sizerNode = sizerRef.current;
    const inputNode = controlRef.current;

    if (sizerNode && inputNode) {
      const newInputWidth = sizerNode.scrollWidth + 2;

      inputNode.style.width = `${newInputWidth}px`;
    }
  });

  const handleRef = (node: HTMLInputElement) => {
    controlRef.current = node;

    if (inputRef) {
      // eslint-disable-next-line no-param-reassign
      inputRef.current = node;
    }
  };

  return (
    <div className={b()}>
      <input {...rest} ref={handleRef} className={b('input')} />
      <div ref={sizerRef} className={b('sizer')}>
        {rest.value}
      </div>
    </div>
  );
};
