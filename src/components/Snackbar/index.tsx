import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import bem from '../../utils/bem';
import { canUseDOM } from './utils';

import './styles.css';

import SnackbarItem, { CommonProps as SnackbarItemProps } from './SnackbarItem';

type AnimationProps = {
  entered: {
    opacity: number;
    transform: string;
    transition: string;
  };
  exiting: {
    opacity: number;
    transform: string;
    transition: string;
  };
};

type CommonProps = {
  items: SnackbarItemProps[];
};

const b = bem('snackbar');

const SnackbarContainer: React.FC<CommonProps> = props => {
  const { items } = props;
  const refItems = useRef<(HTMLDivElement | null)[]>([]);
  const portalTarget = canUseDOM ? document.body : null;
  const [styles, setStyles] = useState<AnimationProps[]>([]);

  useEffect(() => {
    let arr: AnimationProps[] = [];
    let sum = 0;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      if (refItems.current[i] !== null) {
        arr.push({
          entered: {
            opacity: 1,
            transform: `translateY(${-sum}px)`,
            transition: 'transform 300ms ease, opacity 300ms ease',
          },
          exiting: {
            opacity: 0,
            transform: `translateY(${-sum}px) scale(0.8)`,
            transition: 'transform 150ms ease, opacity 150ms ease',
          },
        });
        sum += (refItems.current[i] as HTMLDivElement).clientHeight;
      }
    }
    setStyles(arr.reverse());
  }, [items]);

  return (
    <>
      {portalTarget
        ? createPortal(
            <div className={b()}>
              <TransitionGroup component={null}>
                {items.map((props: SnackbarItemProps, index: number) => (
                  <Transition appear mountOnEnter unmountOnExit timeout={300} key={props.id}>
                    {transitionState => (
                      <div
                        ref={el => (refItems.current[index] = el)}
                        style={
                          styles[index] && styles[index][transitionState]
                            ? styles[index][transitionState]
                            : {
                                transform: 'translateY(100%)',
                                opacity: 0,
                                transition: 'transform 300ms ease, opacity 300ms ease',
                              }
                        }
                        className={b('item')}
                      >
                        <SnackbarItem {...props} />
                      </div>
                    )}
                  </Transition>
                ))}
              </TransitionGroup>
            </div>,
            portalTarget,
          )
        : null}
    </>
  );
};

export default SnackbarContainer;
