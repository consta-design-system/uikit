import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { LibPageMenu } from './LibPageMenu';
import { LibPageContent } from './LibPageContent';

export const LibPage: React.FC = () => {
  return (
    <DocLayout leftSide={<LibPageMenu />}>
      <LibPageContent />
    </DocLayout>
  );
};
