export type WithDefaultReturn<Object extends {}, Key extends keyof Object> = {
  [Property in Key]-?: Object[Property];
} & Object;

export const objectWithDefault = <Object extends {}, Key extends keyof Object>(
  defaultProps: {
    [Property in Key]-?: Object[Property];
  },
  props: Object,
): WithDefaultReturn<Object, Key> => ({ ...defaultProps, ...props });
