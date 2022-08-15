import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type FieldGroupPropForm =
  | 'default'
  | 'brick'
  | 'round'
  | 'brickRound'
  | 'roundBrick'
  | 'brickDefault'
  | 'defaultBrick'
  | 'defaultClear'
  | 'brickClear'
  | 'roundClear'
  | 'clearRound'
  | 'clearDefault'
  | 'clearBrick'
  | 'clearClear';

export type FieldGroupPropSize = 'm' | 'xs' | 's' | 'l';

export type FieldGroupPropChildren = React.ReactElement<{
  form?: FieldGroupPropForm;
  size?: FieldGroupPropSize;
  className?: string;
}>[];

export type FieldGroupProps = PropsWithHTMLAttributes<
  {
    children: FieldGroupPropChildren;
    form?: FieldGroupPropForm;
    size?: FieldGroupPropSize;
  },
  HTMLDivElement
>;
