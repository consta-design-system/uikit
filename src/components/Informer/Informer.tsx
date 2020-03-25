import React, { Fragment } from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import { IIconProps } from '../Icon';
import { Text } from '../Text';

import './Informer.css';
import '../../themes/theme_color_gpn-default.css';
import '../../themes/theme_color_gpn-dark.css';

import * as wp from '../../utils/whitepaper/whitepaper';

const cnInformer = cn('informer');

type CommonProps = {
  view: 'filled' | 'bordered';
  status: 'system' | 'alert' | 'warning' | 'success';
  icon?: React.FC<IIconProps>;
  label?: string;
  title?: string;
  className?: string;
};

export const Informer: React.FC<CommonProps> = (props) => {
  const { className, view, status, icon, label, title } = props;
  const Icon = icon;
  const withIcon = !!icon;
  const _className =
    status != 'system' && view == 'filled'
      ? classnames(className, wp.theme({ color: 'gpn-dark' }))
      : classnames(className, wp.theme({ color: 'gpn-default' }));

  return (
    <div
      className={cnInformer(
        {
          view,
          status,
          withIcon,
        },
        [_className, withIcon ? wp.ptIconPlus() : '']
      )}
    >
      {Icon && (
        <Icon
          size="s"
          className={cnInformer('icon', [wp.ptIconPlus('icon', { 'indent-r': 's' })])}
        />
      )}
      {Icon ? (
        <div className={wp.ptIconPlus('block')}>
          {title && <Text weight="bold">{title}</Text>}
          {label && <Text>{label}</Text>}
        </div>
      ) : (
        <Fragment>
          {title && <Text weight="bold">{title}</Text>}
          {label && <Text>{label}</Text>}
        </Fragment>
      )}
    </div>
  );
};
