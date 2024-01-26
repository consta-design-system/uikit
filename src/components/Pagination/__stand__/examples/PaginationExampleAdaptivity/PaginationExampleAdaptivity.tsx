import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { Pagination } from '##/components/Pagination/Pagination';

const modes: Record<string, number> = {
  big: 1000,
  medium: 600,
  small: 300,
};

export const PaginationExampleAdaptivity = () => {
  const [page, setPage] = useState(1);
  return (
    <Example
      col={1}
      items={['big', 'medium', 'small', 'button']}
      getItemDescription={(mode) =>
        modes[mode] ? `${modes[mode]}px` : 'button'
      }
      getItemNode={(mode) =>
        mode === 'button' ? (
          <Button label="Показать еще" view="ghost" width="full" />
        ) : (
          <Pagination
            items={15}
            value={page}
            showFirstPage
            showLastPage
            onChange={setPage}
            arrows={[true, true]}
            style={{ width: modes[mode] }}
          />
        )
      }
    />
  );
};
