import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext<{
  refs: React.RefObject<HTMLElement>[];
  addRefs?: (ref: React.RefObject<HTMLElement>[]) => void;
  zIndex?: number;
}>({
  refs: [],
  zIndex: undefined,
});

export function usePortalContext() {
  return useContext(Context);
}
/**
 * PortalWithThemeProvider
 * нужен для того чтобы получать рефы дочерних порталов и прокидывать их в родительские порталы
 * Это нужно чтобы в компонетах использовать usePortalContext()
 * и получать рефы всех вложенных порталов в компонент, чтобы без ошибочно реализовать onOutsideClick.
 * Проблема заклбчалась в том что при нажатии на любой вложенный портал,
 * компонент думал ччто клик произашел вне компонента и срабатывал onOutsideClick.
 * Сечас когда мы знаем рефы всех вложенных порталов мы можем игнорировать события кликов на вложенных порталах
 */
export const PortalWithThemeProvider: React.FC<{
  zIndex?: number;
  children?: React.ReactNode;
}> = (props) => {
  const [refs, setRefs] = useState<React.RefObject<HTMLElement>[]>([]);
  const { addRefs: contextAddRefs } = usePortalContext();

  /**
   * фукция для добавления рефов дочерних порталов
   * @param {React.RefObject<HTMLElement>[]} addRef массив ссылок
   */
  const addRefs = (addRef: React.RefObject<HTMLElement>[]) => {
    if (addRef.length > 0) {
      const newRefs = [
        ...refs.filter((item) => item.current),
        ...addRef.filter((addItem) => {
          if (!addItem.current) {
            return false;
          }
          return !refs.find((item) => item.current === addItem.current);
        }),
      ];
      setRefs(newRefs);
    }
  };

  /**
   * при изменении дочерних рефов необходимо добавить их в родительские порталы
   */
  useEffect(() => {
    contextAddRefs && contextAddRefs(refs);
  }, [refs]);

  useEffect(() => () => setRefs([]), []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ refs, addRefs, zIndex: props.zIndex }}>
      {props.children}
    </Context.Provider>
  );
};
