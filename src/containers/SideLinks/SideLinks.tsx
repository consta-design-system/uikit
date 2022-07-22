import './SideLinks.css';

import { Button } from '@consta/uikit/Button';
import { IconComponent } from '@consta/uikit/Icon';
import { IconForward } from '@consta/uikit/IconForward';
import { RenderItemProps, Tabs } from '@consta/uikit/TabsCanary';
import { useAtom } from '@reatom/react';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';
import { MenuItem, useMenu } from '##/hooks/useMenu';
import { activeItemAtom } from '##/modules/menuMdx';
import { cn } from '##/utils/bem';

const cnSideLinks = cn('SideLinks');

type LinkItemProps = {
  href: string;
  className?: string;
  label?: string;
  target?: string;
  iconRight?: IconComponent;
};

const LinkItem = (props: LinkItemProps) => {
  const { href: hrefProp, label, className, target, iconRight } = props;

  const [href, onClick] = useMdxLink(hrefProp);

  return (
    <Button
      as="a"
      href={href}
      view="clear"
      size="s"
      target={target}
      iconRight={iconRight}
      onClick={onClick}
      className={className}
      label={label}
    />
  );
};

export const SideLinks = () => {
  const { menu, links } = useMenu();
  const [activeItem] = useAtom(activeItemAtom);

  const renderItem = (props: RenderItemProps<MenuItem>) => {
    const {
      item: { href, label },
      checked,
    } = props;
    return (
      <LinkItem
        className={cnSideLinks('ListItem', { checked })}
        label={label}
        href={href}
      />
    );
  };

  return (
    <div className={cnSideLinks()}>
      {menu.length > 0 && (
        <Tabs
          linePosition="left"
          className={cnSideLinks('List')}
          items={menu}
          size="s"
          value={activeItem}
          renderItem={renderItem}
          onChange={() => {}}
        />
      )}
      {links && (
        <div className={cnSideLinks('Links')}>
          {links?.map(({ label, href }) => (
            <LinkItem
              iconRight={IconForward}
              key={cnSideLinks({ label })}
              target="_blank"
              label={label}
              href={href}
            />
          ))}
        </div>
      )}
    </div>
  );
};
