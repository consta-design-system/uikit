import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'react-router5';

import { Image } from '##/componets/Image';
import { Link } from '##/componets/Link';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

const cnLibsPage = cn('LibsPage');

export const LibsPage: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const router = useRouter();

  // если библиотека одна то редереким на сраницу библиотеки
  useEffect(() => {
    if (libs.length <= 1) {
      router.navigate(
        routesNames.LIBS_STAND,
        { stand: libs[0].id },
        { replace: true },
      );
    }
  }, []);

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

      <Text
        as="h2"
        size="3xl"
        weight="semibold"
        className={cnMixSpace({ mB: 'xl' })}
      >
        Библиотеки компонентов
      </Text>

      {libs.map((lib) => (
        <Fragment key={lib.id}>
          <Text
            as="h3"
            size="3xl"
            weight="semibold"
            className={cnMixSpace({ mB: 'm' })}
          >
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
      ))}
    </div>
  );
};
