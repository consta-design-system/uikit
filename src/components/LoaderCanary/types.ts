import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const loaderPropSize = ['m', 's'] as const;
export type LoaderPropSize = typeof loaderPropSize[number];
export const loaderPropSizeDefault: LoaderPropSize = loaderPropSize[0];

type Props = {
  size?: LoaderPropSize;
  children?: never;
};

export type LoaderProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;
