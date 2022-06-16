import React from 'react';
import { Stand } from '##/exportTypes';
import { cn } from '##/utils/bem';
import { Text } from '@consta/uikit/Text';
import { Badge } from '@consta/uikit/Badge';
import { IconYoutube } from '@consta/uikit/IconYoutube'
import './StandPageHeader.css';

type Props = {
    stand: Stand;
    className?: string;
}

const cnStandPageHeader = cn('StandPageHeader');

const getLabel = (status: Stand['status']): string | undefined => {
    if (status === 'deprecated'){
        return 'deprecated';
    } else if (status === 'canary'){
        return 'canary';
    } else if (status === 'stable'){
        return 'Стабильный';
    }
    return;
}

const getStatus = (status: Stand['status']) => {
    if (status === 'deprecated'){
        return 'error';
    } else if (status === 'canary'){
        return 'success';
    } else if (status === 'stable'){
        return 'normal';
    }
    return;
}

const getView = (status: Stand['status']) => {
    if (status === 'deprecated' || status === 'stable') {
        return 'stroked';
    }
    if (status === 'canary' || status === 'inWork') {
        return 'filled';
    }
 }

export const StandPageHeader = (props: Props) => {
    const { stand, className } = props;
    const { title, status, version, description } = stand;

    return (
        <div className={cnStandPageHeader(null, [className])}>
            <div className={cnStandPageHeader('Top')}>
                <Text weight="semibold" size="4xl" lineHeight="m">{title}</Text>
                <div className={cnStandPageHeader('Badges')}>
                    {getStatus(status) && (
                        <Badge
                            size="l"
                            label={getLabel(status)}
                            status={getStatus(status)}
                            view={getView(status)}
                        />
                    )}
                    {version && (
                        <Badge
                            size="l"
                            label={`Доступен с ${version}`}
                            icon={IconYoutube}
                            status="system"
                            view="stroked"
                        />
                    )}
                </div>
            </div>
            {description && <Text className={cnStandPageHeader('Description')} size="m" lineHeight="m">{description}</Text>}
        </div>
    )
}