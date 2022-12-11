import './MixList.css';

import { cn } from '##/utils/bem';

type MixListPropSize = 'xs' | 's' | 'm' | 'l';

type MixListPropForm = 'round' | 'default' | 'brick';

type Props = {
  shadow?: boolean;
  size?: MixListPropSize;
  form?: MixListPropForm;
};

type CnList = (props: Props, classNames?: Array<string | undefined>) => string;

const cnList = cn('MixList');

export const cnMixList: CnList = (props, classNames = []) => {
  const { shadow = true, form = 'default', size = 's' } = props;
  return cnList({ shadow, form, size }, classNames);
};
