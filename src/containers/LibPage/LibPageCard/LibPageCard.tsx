import React from 'react';
import { PreparedStand } from '##/exportTypes';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import { Image } from '##/componets/Image';
import NoImage from './NoImage';
import { Link } from '##/componets/Link';
import { routesNames } from '##/modules/router';
import './LibPageCard.css';

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
