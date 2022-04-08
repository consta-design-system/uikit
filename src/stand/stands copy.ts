import { Stand } from '../types';
import { prepareStands } from '@consta/stand/src/exportFuctions';

import stand_0 from '../../../../src/components/Attachment/__stand__/Attachment.stand';
import stand_1 from '../../../../src/components/Avatar/__stand__/Avatar.stand';

export const standsGenerated: Stand[] = [stand_0, stand_1];

export const pathsGenerated: string[] = [
  '../../../../src/components/Attachment/__stand__/Attachment.stand',
  '../../../../src/components/Avatar/__stand__/Avatar.stand',
];

export const stands = prepareStands(standsGenerated, pathsGenerated);
