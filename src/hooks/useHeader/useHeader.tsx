import { useAction } from '@reatom/react';
import React, { useEffect, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { activeItemAtom } from '##/modules/menuMdx';
import { typographyHeaderConverter } from '##/utils/typographyHeaderConverter';

type UseHeader = (
  children: React.ReactNode,
  ref: React.RefObject<HTMLHeadingElement>,
) => {
  id: string;
  label: string;
};

export const useHeader: UseHeader = (children, ref) => {
  const route = useRoute();
  const { params } = route.route;
  const setActiveItem = useAction(activeItemAtom.set);

  const { id, label } = useMemo(() => {
    const str = children?.toString() ?? '';
    return typographyHeaderConverter(str);
  }, [children]);

  const hash = useMemo(() => params.hash, [params]);

  useEffect(() => {
    if (id && hash) {
      if (hash === id) {
        const top = ref.current?.offsetTop ?? 0;
        window.scrollTo({
          top: top + 10,
          left: 0,
          behavior: 'smooth',
        });
        setActiveItem({
          label,
          href: `#${id}`,
        });
      }
    }
  }, [hash, id, ref.current]);

  return {
    id,
    label,
  };
};
