import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';

const FallbackError = () => <div>Упс, ошибка =(</div>;
const FallbackLoading = () => <div>Загрузка</div>;

const Presenter: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const CodePresenter = lazy(() => import(`./CodePresenter`));

  return (
    <Suspense fallback={<FallbackLoading />}>
      <CodePresenter {...props} />
    </Suspense>
  );
};

export const Code: React.FC<React.HTMLAttributes<HTMLSpanElement>> = memo(
  (props) => (
    <ErrorBoundary fallback={<FallbackError />}>
      <Presenter {...props} />
    </ErrorBoundary>
  ),
);
