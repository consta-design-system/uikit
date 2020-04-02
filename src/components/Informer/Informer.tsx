import './Informer.css';
import '../../themes/theme_color_gpn-default.css';
import '../../themes/theme_color_gpn-dark.css';

import React, { Fragment } from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import { IIcon } from '../Icon';
import { Text } from '../Text/Text';
import * as wp from '../../utils/whitepaper/whitepaper';

export type InformerPropView = 'filled' | 'bordered';
export type InformerPropStatus = 'system' | 'alert' | 'warning' | 'success';

export type IInformer = {
  view: InformerPropView;
  status: InformerPropStatus;
  icon?: React.FC<IIcon>;
  label?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  className?: string;
};

const cnInformer = cn('informer');

export const Informer: React.FC<IInformer> = (props) => {
  const { className, view, status, icon, label, title, children } = props;
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
          {label || children}
        </div>
      ) : (
        <Fragment>
          {title && <Text weight="bold">{title}</Text>}
          {label || children}
        </Fragment>
      )}
    </div>
  );
};
