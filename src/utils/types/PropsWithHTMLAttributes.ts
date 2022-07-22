export type PropsWithHTMLAttributes<Props, HTMLElement> = Props &
  Omit<React.HTMLAttributes<HTMLElement>, keyof Props | 'css'>;

export type PropsWithHTMLAttributesAndRef<Props, HTMLElement> =
  PropsWithHTMLAttributes<React.PropsWithoutRef<Props>, HTMLElement> &
    React.RefAttributes<HTMLElement>;
