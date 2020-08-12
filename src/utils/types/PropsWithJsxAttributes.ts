export type PropsWithJsxAttributes<Props, As extends keyof JSX.IntrinsicElements = 'div'> = Props &
  Omit<JSX.IntrinsicElements[As], keyof Props>;
