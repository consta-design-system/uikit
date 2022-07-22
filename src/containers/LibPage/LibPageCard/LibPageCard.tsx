import './LibPageCard.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { Link } from '##/componets/Link';
import { PreparedStand } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import NoImage from './NoImage';

type Props = {
  stand: PreparedStand;
};

const cnLibPageCard = cn('LibPageCard');

export const LibPageCard = (props: Props) => {
  const { stand } = props;
  const { title, description, image } = props.stand.stand;

  return (
    <div className={cnLibPageCard()}>
      <Image src={image ?? NoImage} className={cnLibPageCard('Image')} />
      <Link to={routesNames.LIBS_STAND} params={{ stand: stand.id }}>
        <Text
          className={cnLibPageCard('Title')}
          size="l"
          view="link"
          decoration="underline"
          lineHeight="m"
        >
          {title}
        </Text>
      </Link>
      {description && <Text size="s">{description}</Text>}
    </div>
  );
};
