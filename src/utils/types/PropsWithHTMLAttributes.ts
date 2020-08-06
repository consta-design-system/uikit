export type PropsWithHTMLAttributes<Props, HTMLElement> = Props &
  Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;

declare module 'react' {
  interface DOMAttributes<T> {
    css?: never;
  }
}
