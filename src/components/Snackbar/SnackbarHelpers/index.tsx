import React, { useState, useContext } from 'react';
import { Id, generateId, getIndex } from '../utils';
import { CommonProps as SnackbarItemProps } from '../SnackbarItem';

export type useSnackbarProps = {
  add: (props: SnackbarItemProps) => Id;
  remove: (id: Id) => void;
};

type Context = {
  items: SnackbarItemProps[];
  setItems?: any;
};

const Context = React.createContext<Context>({ items: [] });

export const SnackbarProvider: React.FC = props => {
  const { children } = props;
  const [items, setItems] = useState([]);

  return <Context.Provider value={{ items, setItems }}>{children}</Context.Provider>;
};

export const useSnackbar = () => {
  const { setItems, items } = useContext(Context);

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
    items,
  };
};
