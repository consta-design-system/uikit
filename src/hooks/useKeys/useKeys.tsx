export type KeyHandler = (
  prop: Record<string, unknown>,
  e: React.KeyboardEvent,
) => void;

export type KeyProps = {
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type UserKeysProps = {
  [key: string]: (
    prop: { keyCode: number; key: string; shift: boolean; meta: boolean },
    e: React.KeyboardEvent<Element>,
  ) => void;
};

export const useKeys = (userKeys: UserKeysProps) => {
  return (rest?: KeyProps): KeyProps => {
    return {
      ...rest,
      onKeyDown: (e: React.KeyboardEvent): void => {
        const { keyCode, key, shiftKey: shift, metaKey: meta } = e;
        const handler = userKeys[key] || userKeys[keyCode];
        if (typeof handler === 'function') {
          handler(
            {
              keyCode,
              key,
              shift,
              meta,
            },
            e,
          );
        }
        if (typeof rest?.onKeyDown === 'function') {
          rest.onKeyDown(e);
        }
      },
    };
  };
};
