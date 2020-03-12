import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import bem from '../../utils/bem';
import { Id, generateId, canUseDOM, getIndex } from './utils';

import './styles.css';

import SnackbarItemWrapper from './SnackbarItemWrapper';
import SnackbarItem, { CommonProps as SnackbarItemProps } from './SnackbarItem';

export type useSnackbarProps = {
  add: (props: SnackbarItemProps) => Id;
  remove: (id: Id) => void;
};

type Context = {
  items: SnackbarItemProps[];
  setItems?: any;
};

const b = bem('snackbar');

const Context = React.createContext<Context>({ items: [] });

const SnackbarContainer: React.FC = props => {
  const { children } = props;
  const portalTarget = canUseDOM ? document.body : null;
  const [items, setItems] = useState([]);

  return (
    <Context.Provider value={{ items, setItems }}>
      {children}
      {portalTarget
        ? createPortal(
            <div className={b()}>
              <TransitionGroup component={null}>
                {items.map((props: SnackbarItemProps) => (
                  <Transition appear mountOnEnter unmountOnExit timeout={300} key={props.id}>
                    {transitionState => (
                      <SnackbarItemWrapper transitionState={transitionState}>
                        <SnackbarItem {...props} />
                      </SnackbarItemWrapper>
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
  const { items, setItems } = useContext(Context);

  return {
    add(props) {
      const id = generateId();
      setItems([...items, { id, ...props }]);
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
