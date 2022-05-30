import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from '##/componets/ErrorBoundary';

type LazyDocsProps = { id: string };

const FallbackError = () => <div>раздел в разработке</div>;
const FallbackLoading = () => <div>Загрузка</div>;

export const LazyDocsPreseter: React.FC<LazyDocsProps> = ({ id }) => {
  const Docs = lazy(() => import(`../../stands/lazyDocs/${id}_stand_mdx.tsx`));

  return (
    <div>
      <Suspense fallback={<FallbackLoading />}>
        <Docs />
      </Suspense>
    </div>
  );
};

export const LazyDocs: React.FC<LazyDocsProps> = (props) => (
  <ErrorBoundary fallback={<FallbackError />}>
    <LazyDocsPreseter {...props} />
  </ErrorBoundary>
);
