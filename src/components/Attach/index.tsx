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
  } = props;

  const FileIconComponentName = getFileIconComponentName(fileName);
  const FileIcon =
    status === 'loading'
      ? FileLoading
      : lazy(() => import(`../File/icons/${FileIconComponentName}`));

  return (
    <div className={b({ status })}>
      {status === 'content' && <a className={b('link')} href={href} download={true} />}

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

      <div className={b('icon')}>
        <Suspense fallback={<FileLoading size="s" />}>
          <FileIcon size="s" />
        </Suspense>
      </div>
      <div className={b('content')}>
        <div className={b('name')}>{fileName}</div>
        <div className={b('information')}>
          {(status === 'loaded' || status === 'content') && (
            <React.Fragment>
              {fileSize && <div className={b('information-item')}>{getFileSizeStr(fileSize)}</div>}
              {timestamp && (
                <div className={b('information-item')}>{getStrFromTimestamp(timestamp)}</div>
              )}
            </React.Fragment>
          )}

          {status === 'loading' && (
            <div className={b('information-item')}>Загрузка {progress} %</div>
          )}

          {status === 'error' && (
            <div className={b('information-item', { error: true })}>{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attach;
