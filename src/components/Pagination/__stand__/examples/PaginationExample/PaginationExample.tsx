import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Pagination } from '../../../Pagination';

export const PaginationExample = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={3}
        position="left"
      />
    </Example>
  );
};

export const PaginationExampleForm = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        form="default"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        form="round"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        form="brick"
        position="left"
      />
    </Example>
  );
};

export const PaginationExampleSize = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        size="xs"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        size="s"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        size="m"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        size="l"
        position="left"
      />
    </Example>
  );
};

export const PaginationExampleType = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        type="default"
        position="left"
      />
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={5}
        type="input"
        position="left"
      />
    </Example>
  );
};

export const PaginationExamplePosition = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
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
    </Example>
  );
};

export const PaginationExampleMinified = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <Example col={1}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={3}
        minified
      />
    </Example>
  );
};

export const PaginationExampleButton = () => {
  return (
    <Example col={1}>
      <Button label="Показать еще" view="ghost" width="full" />
    </Example>
  );
};
