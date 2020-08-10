export type PropsWithHTMLAttributes<Props, HTMLElement> = Props &
  Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;

export type PropsWithHTMLAttributesAndRef<Props, HTMLElement> = PropsWithHTMLAttributes<
  Props,
  HTMLElement
> &
  React.RefAttributes<HTMLElement>;

declare module 'react' {
  interface DOMAttributes<T> {
    css?: never;
  }
}
