import React from 'react';
import { libAtom } from '##/modules/lib';
import { useAtom } from '@reatom/react';
import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { Group, Stand, LibWithStands } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { LibPageCard } from './LibPageCard';
import { Text } from '@consta/uikit/Text';
import { useRouter } from 'react-router5';
import { cn } from '##/utils/bem';
import './LibPage.css';

const getItemGroupId = (item: Stand) => item.group;
const getGroupKey = (group: Group) => group.id;

const cnLibPage = cn('LibPage');

export const LibPage: React.FC = () => {
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
    <div className={cnLibPage(null, ['theme_gap_medium'])}>
      {groups.map((group, groupIndex) => {
        return (
          <div key={`${cnLibPage({ groupIndex, group: group.group?.id })}`}>
            <Text className={cnLibPage('Title')} size="3xl" lineHeight="xs" weight="bold">
              {group.group?.title}
            </Text>
            <div className={cnLibPage('Section')}>
              {group.items.map((stand, standIndex) => {
                return (
                  <LibPageCard
                    key={`${cnLibPage({ standIndex, stand: stand.id })}`}
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
