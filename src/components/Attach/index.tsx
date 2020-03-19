import React, { lazy, Suspense } from 'react';
import bem from '../../utils/bem';

import './styles.css';

import FileLoading from '../File/icons/Loading';
import Button from '../Button';
import IconTrash from '../Icon/icons/Trash';
import IconClose from '../Icon/icons/Close';
import { getFileSizeStr, getFileIconComponentName, getStrFromTimestamp } from './utils';

const b = bem('attach');

type CommonProps = {
  fileName: string;
  timestamp?: number;
  fileSize?: number;
  progress?: number;
  message?: string;
  href?: string;
  getIconComponentName?: (findedName: string, fileName: string) => string;
  onDelete?: () => void;
  onCancel?: () => void;
};

type LoadedProps = {
  status: 'loaded' | string;
  fileSize: number;
  timestamp: number;
  onDelete?: () => void;
} & CommonProps;

type LoadingProps = {
  status: 'loading' | string;
  progress: number;
  onCancel?: () => void;
} & CommonProps;

type ErrorProps = {
  status: 'error' | string;
  message: string;
  onCancel?: () => void;
} & CommonProps;

type ContentProps = {
  status: 'content' | string;
  fileSize: number;
  timestamp: number;
  href: string;
} & CommonProps;

type AttachType = LoadedProps | LoadingProps | ErrorProps | ContentProps;

const Attach: React.FC<AttachType> = props => {
  const {
    status,
    fileName,
    timestamp,
    fileSize,
    progress,
    message,
    href,
    onDelete,
    onCancel,
    getIconComponentName,
  } = props;

  const FileIconComponentName = getIconComponentName
    ? getIconComponentName(getFileIconComponentName(fileName), fileName)
    : getFileIconComponentName(fileName);
  const FileIcon =
    status === 'loading'
      ? FileLoading
      : lazy(async () => {
          try {
            const result = await import(`../File/icons/${FileIconComponentName}`);
            return result;
          } catch (e) {
            return null;
          }
        });

  const RootElement = status === 'content' ? 'a' : 'div';

  const defaultProps = {
    className: b({ status }),
    ...(status === 'content' && { href, download: true }),
  };

  return (
    <RootElement {...defaultProps}>
      {status === 'loaded' && onDelete && (
        <Button wpSize="xs" view="clear" iconOnly={true} className={b('action')} onClick={onDelete}>
          <IconTrash size={'s'} />
        </Button>
      )}

      {(status === 'loading' || status === 'error') && onCancel && (
        <Button wpSize="xs" view="clear" iconOnly={true} className={b('action')} onClick={onCancel}>
          <IconClose size={'s'} />
        </Button>
      )}

      <span className={b('icon')}>
        <Suspense fallback={<FileLoading size="s" />}>
          <FileIcon size="s" />
        </Suspense>
      </span>
      <span className={b('content')}>
        <span className={b('name')}>{fileName}</span>
        <span className={b('information')}>
          {(status === 'loaded' || status === 'content') && (
            <React.Fragment>
              {fileSize && (
                <span className={b('information-item')}>{getFileSizeStr(fileSize)}</span>
              )}
              {timestamp && (
                <span className={b('information-item')}>{getStrFromTimestamp(timestamp)}</span>
              )}
            </React.Fragment>
          )}

          {status === 'loading' && (
            <span className={b('information-item')}>Загрузка {progress && `${progress} %`}</span>
          )}

          {status === 'error' && (
            <span className={b('information-item', { error: true })}>{message}</span>
          )}
        </span>
      </span>
    </RootElement>
  );
};

export default Attach;
