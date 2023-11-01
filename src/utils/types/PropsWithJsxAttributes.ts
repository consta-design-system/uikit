import { AsTagAttribute, AsTags } from './AsTags';

export type PropsWithJsxAttributes<Props, As extends AsTags = 'div'> = Omit<
  Props & Omit<AsTagAttribute<As>, keyof Props>,
  'css'
>;
