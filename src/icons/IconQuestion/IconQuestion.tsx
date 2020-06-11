import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconQuestionSizeM from './IconQuestion_size_m';
import IconQuestionSizeS from './IconQuestion_size_s';
import IconQuestionSizeXs from './IconQuestion_size_xs';

export const IconQuestion = BaseIconHoc({
  m: IconQuestionSizeM,
  s: IconQuestionSizeS,
  xs: IconQuestionSizeXs,
  name: 'IconQuestion',
})(Icon);
