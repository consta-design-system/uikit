import React from 'react';
import { libAtom } from '##/modules/lib';
import { useAtom } from '@reatom/react';
import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { Group, Stand, LibWithStands } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { LibPageContentCard } from './LibPageContentCard';
import { Text } from '@consta/uikit/Text';
import { useRouter } from 'react-router5';
import { cn } from '##/utils/bem';
import './LibPageContent.css';

const getItemGroupId = (item: Stand) => item.group;
const getGroupKey = (group: Group) => group.id;

const cnLibPageContent = cn('LibPageContent');

export const LibPageContent: React.FC = () => {
  const [lib] = useAtom(libAtom);
  const router = useRouter();

  const { stands, groups: groupsProp, id: libId } = lib ?? ({} as LibWithStands);

  const groups = getGroups<Stand, Group>(
    stands,
    getItemGroupId,
    [...groupsProp],
    getGroupKey,
    undefined,
  );

  const handleClick = (item: Stand) => {
    router.navigate(routesNames.LIBS_LIB_STAND, { libId, standId: item.standId });
  };

  return (
    <div className={cnLibPageContent(null, ['theme_gap_medium'])}>
      {groups.map((group, groupIndex) => {
        return (
          <div key={`${cnLibPageContent({ groupIndex, group: group.group?.id })}`}>
            <Text className={cnLibPageContent('Title')} size="3xl" lineHeight="xs" weight="bold">
              {group.group?.title}
            </Text>
            <div className={cnLibPageContent('Section')}>
              {group.items.map((stand, standIndex) => {
                return (
                  <LibPageContentCard
                    key={`${cnLibPageContent({ standIndex, stand: stand.id })}`}
                    stand={stand}
                    libId={libId}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
