import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Pagination } from '../../../Pagination';

export const PaginationExample = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={3} />
    </StoryBookExample>
  );
};

export const PaginationExampleForm = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} form="default" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} form="round" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} form="brick" />
    </StoryBookExample>
  );
};

export const PaginationExampleSize = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} size="xs" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} size="s" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} size="m" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} size="l" />
    </StoryBookExample>
  );
};

export const PaginationExampleType = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} type="default" />
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={5} type="input" />
    </StoryBookExample>
  );
};

export const PaginationExamplePosition = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        position="center"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        position="right"
      />
    </StoryBookExample>
  );
};

export const PaginationExampleMinified = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Pagination currentPage={currentPage} onChange={handleChange} totalPages={3} minified />
    </StoryBookExample>
  );
};
