import React, { Fragment } from 'react';

import { cn } from '##/utils/bem';

import { libsAtom } from '##/modules/libs';

import { useAtom } from '@reatom/react';

import { Text } from '@consta/uikit/Text';
import { cnMixSpace } from '@consta/uikit/MixSpace';

import { Image } from '##/componets/Image';
import { Link } from '##/componets/Link';

import { routesNames } from '##/modules/router';

const cnLibsPage = cn('LibsPage');

export const LibsPage: React.FC = () => {
  const [libs] = useAtom(libsAtom);

  return (
    <div className={cnLibsPage()}>
      <Text
        className={cnMixSpace({ mB: '2xl' })}
        as="h1"
        weight="semibold"
        size="4xl"
        lineHeight="m"
      >
        Обзор
      </Text>

      <Text as="h2" size="3xl" weight="semibold" className={cnMixSpace({ mB: 'xl' })}>
        Библиотеки компонентов
      </Text>

      {libs.map((lib) => {
        return (
          <Fragment key={lib.id}>
            <Text as="h3" size="3xl" weight="semibold" className={cnMixSpace({ mB: 'm' })}>
              {lib.title}
            </Text>
            {lib.description && (
              <Text as="p" size="l" className={cnMixSpace({ mB: 'xl' })}>
                {lib.description}
              </Text>
            )}
            {lib.image && (
              <Link to={routesNames.LIBS_STAND} params={{ stand: lib.id }}>
                <Image src={lib.image} className={cnMixSpace({ mB: '3xl' })} />
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
