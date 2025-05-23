import { isDefined } from '##/utils/type-guards';

export type WithDefaultReturn<Object extends {}, Key extends keyof Object> = {
  [Property in Key]-?: Object[Property];
} & Object;

export const objectWithDefault = <Object extends {}, Key extends keyof Object>(
  defaultProps: {
    [Property in Key]-?: Object[Property];
  },
  props: Object,
): WithDefaultReturn<Object, Key> => {
  const propsWithoutUndefined = {} as Object;

  for (const key of Object.keys(props) as Key[]) {
    if (isDefined(props[key])) {
      propsWithoutUndefined[key] = props[key];
    }
  }

  return { ...defaultProps, ...propsWithoutUndefined };
};
