import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { LibsPageMenu } from './LibsPageMenu';
import { LibsPageContent } from './LibsPageContent';

export const LibsPage: React.FC = () => {
  return (
    <DocLayout leftSide={<LibsPageMenu />}>
      <LibsPageContent />
    </DocLayout>
  );
};
