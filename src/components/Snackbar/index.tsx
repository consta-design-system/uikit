import React, { useRef, useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import bem from '../../utils/bem';
import { Id, generateId, canUseDOM, getIndex } from './utils';

import './styles.css';

import SnackbarItem, { CommonProps as SnackbarItemProps } from './SnackbarItem';

export type useSnackbarProps = {
  add: (props: SnackbarItemProps) => Id;
  remove: (id: Id) => void;
};

type Context = {
  items: SnackbarItemProps[];
  setItems?: any;
};

type Animation = {
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

const b = bem('snackbar');

const Context = React.createContext<Context>({ items: [] });

const SnackbarContainer: React.FC = props => {
  const { children } = props;
  const refItems = useRef<(HTMLDivElement | null)[]>([]);
  const portalTarget = canUseDOM ? document.body : null;
  const [items, setItems] = useState([]);
  const [styles, setStyles] = useState<Animation[]>([]);

  useEffect(() => {
    let arr: Animation[] = [];
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
    <Context.Provider value={{ items, setItems }}>
      {children}
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
    </Context.Provider>
  );
};

export const useSnackbar = () => {
  const { setItems } = useContext(Context);

  return {
    add(props) {
      const id = generateId();
      setItems(prevState => [...prevState, { id, ...props }]);
      return id;
    },
    remove(id: Id) {
      setItems(prevState => {
        const newState = [...prevState];
        const index = getIndex(id, newState);
        if (index === -1) return newState;
        newState.splice(index, 1);
        return newState;
      });
    },
  };
};

export default SnackbarContainer;
