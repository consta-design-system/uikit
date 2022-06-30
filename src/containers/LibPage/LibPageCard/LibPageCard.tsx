import React from 'react';
import { Stand } from '##/exportTypes';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import { Image } from '##/componets/Image';
import NoImage from '@consta/stand/src/containers/LibPage/LibPageCard/NoImage';
import { Link } from '##/componets/Link';
import { routesNames } from '##/modules/router';
import './LibPageCard.css';

type Props = {
  stand: Stand;
  libId: string;
};

const cnLibPageCard = cn('LibPageCard');

export const LibPageCard = (props: Props) => {
  const { stand, libId } = props;
  const { title, description, image } = stand;
  return (
    <div className={cnLibPageCard()}>
      <Image src={image ?? NoImage} className={cnLibPageCard('Image')} />
      <Link to={routesNames.LIBS_LIB_STAND} params={{ libId, standId: stand.standId ?? '' }}>
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
