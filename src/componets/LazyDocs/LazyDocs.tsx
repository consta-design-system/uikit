import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { MDXProvider } from '##/containers/MDXProvider';

type LazyDocsProps = { id: string };

const FallbackError = () => <div>раздел в разработке</div>;
const FallbackLoading = () => <div>Загрузка</div>;

export const LazyDocsPreseter: React.FC<LazyDocsProps> = ({ id }) => {
  const Docs = lazy(() => import(`../../stands/lazyDocs/${id}_stand_mdx.tsx`));

  return (
    <div>
      <Suspense fallback={<FallbackLoading />}>
        <MDXProvider>
          <Docs />
        </MDXProvider>
      </Suspense>
    </div>
  );
};

export const LazyDocs: React.FC<LazyDocsProps> = memo(
  (props) => (
    <ErrorBoundary fallback={<FallbackError />}>
      <LazyDocsPreseter {...props} />
    </ErrorBoundary>
  ),
  (prevProps: LazyDocsProps, nextProps: LazyDocsProps) =>
    prevProps.id === nextProps.id,
);
