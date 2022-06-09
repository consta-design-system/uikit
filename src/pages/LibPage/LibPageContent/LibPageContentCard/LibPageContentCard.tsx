import React from 'react';
import { Stand } from '##/exportTypes';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import { Image } from '##/componets/Image';
import NoImage from './NoImage';
import { Link } from '##/componets/Link';
import { routesNames } from '##/modules/router';
import './LibPageContentCard.css';

type Props = {
    stand: Stand;
    libId: string;
}

const cnLibPageContentCard = cn('LibPageContentCard');

export const LibPageContentCard = (props: Props) => {
    const { stand, libId } = props;
    const { title, description, image  } = stand;
    return (
        <div className={cnLibPageContentCard()}>
            <Image src={image ?? NoImage} className={cnLibPageContentCard('Image')} />
            <Link to={routesNames.LIBS_LIB_STAND} params={{ libId, standId: stand.standId ?? '' }}>
                <Text 
                    className={cnLibPageContentCard('Title')}
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
    )
}