import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type LoaderPropSize = 'xs' | 's' | 'm';
export type LoaderPropType = 'dots' | 'circle';
export type LoaderPropView = 'primary' | 'clear';

type Props = {
  size?: 'xs' | 's' | 'm';
  children?: never;
  type?: LoaderPropType;
  view?: LoaderPropView;
};

export type LoaderProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;
