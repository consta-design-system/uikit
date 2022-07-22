import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { Stand } from '##/exportTypes';
import { menuMdxAtom, activeItemAtom } from '##/modules/menuMdx';
import { standAtom } from '##/modules/stand';
import { useAtom, useAction } from '@reatom/react';
import { useRouter, useRoute } from 'react-router5';
import { routesNames } from '##/modules/router';

export type MenuItem = {
  label: string;
  href: string;
};

export type UseMenu = () => {
  menu: MenuItem[];
  links?: MenuItem[];
};

type NodeItem = {
  item: MenuItem;
  element: HTMLElement;
};

type GetMenuData = (children: React.ReactElement) => MenuItem[];

const getMenuData: GetMenuData = (children) => {
  const {
    props: { children: childrenProp, href },
  } = children;
  const array: MenuItem[] = [];
  if (typeof childrenProp === 'string') {
    array.push({
      label: childrenProp,
      href: decodeURI(href),
    });
  } else {
    if (Array.isArray(childrenProp)) {
      childrenProp.forEach((child) => {
        if (typeof child === 'object') {
          array.push(...getMenuData(child));
        }
      });
    } else {
      array.push(...getMenuData(childrenProp));
    }
  }
  return array;
};

const scrollDetector = (positions: number[], scrollToElement: (index: number) => void) => {
  const y = window.scrollY;
  if (y < positions[0]) {
    scrollToElement(-1);
  } else if (y > positions[positions.length - 1]) {
    scrollToElement(positions.length - 1);
  } else {
    for (let i = 0; i < positions.length - 1; i++) {
      const firstPosition = positions[i];
      const secondPosition = positions[i + 1];
      if (y >= firstPosition && y < secondPosition) {
        scrollToElement(i);
        return;
      }
    }
  }
};

export const useMenu: UseMenu = () => {
  const setActiveItem = useAction(activeItemAtom.set);
  const [menuNode] = useAtom(menuMdxAtom);
  const route = useRoute();
  const path = route.route.path;
  const [stand] = useAtom(standAtom);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [nodes, setNodes] = useState<NodeItem[]>([]);

  const { github, figma } = stand?.stand ?? ({} as Stand);

  const menu: MenuItem[] = useMemo(() => {
    return menuNode ? getMenuData(menuNode as React.ReactElement) : [];
  }, [menuNode]);

  useEffect(() => {
    setActiveItem(undefined);
    setActiveIndex(-1);
  }, [path]);

  const menuPositions = useMemo(() => {
    return nodes.map((item) => {
      return item.element.offsetTop;
    });
  }, [nodes]);

  useEffect(() => {
    if (menu.length > 0) {
      const nodeArray: NodeItem[] = [];
      menu.forEach((item) => {
        if (item.href[0] === '#') {
          const element = document.getElementById(item.href.split('#')[1]);
          element &&
            nodeArray.push({
              item,
              element,
            });
        }
      });
      setNodes(nodeArray);
    } else {
      setNodes([]);
    }
  }, [menu]);

  useEffect(() => {
    setActiveItem(nodes[activeIndex]?.item);
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener('scroll', () => scrollDetector(menuPositions, setActiveIndex));
    return () => {
      window.removeEventListener('scroll', () => scrollDetector(menuPositions, setActiveIndex));
    };
  }, [menuPositions]);

  const links: MenuItem[] | undefined = useMemo(() => {
    const array: MenuItem[] = [];
    if (stand) {
      if (github) {
        array.push({
          label: 'Открыть на Github',
          href: github,
        });
      }
      if (figma) {
        array.push({
          label: 'Открыть в Figma',
          href: figma,
        });
      }
      array.push({
        label: 'Сообщить о проблеме',
        href: 'https://github.com/consta-design-system/uikit/issues/new/choose',
      });
      return array;
    }
  }, [stand]);

  return {
    menu,
    links,
  };
};
