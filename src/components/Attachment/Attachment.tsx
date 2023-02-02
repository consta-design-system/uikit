import './Attachment.css';

import React from 'react';

import { FileIconPropSize } from '##/fileIcons/FileIcon/FileIcon';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Button } from '../Button/Button';
import { File } from '../File/File';
import { Text, TextPropSize } from '../Text/Text';
import {
  AttachmentProps,
  AttachmentPropSize,
  attachmentPropSizeDefault,
} from './types';

const cnAttachment = cn('Attachment');

const fileSizeMap: Record<AttachmentPropSize, FileIconPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
};

const textSizeMap: Record<AttachmentPropSize, TextPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
};

const descriptionSizeMap: Record<AttachmentPropSize, TextPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
};
const Attachment = forwardRefWithAs<AttachmentProps>((props, ref) => {
  const {
    className,
    as = 'div',
    fileExtension,
    loading,
    fileName,
    buttonIcon,
    onButtonClick,
    errorText,
    loadingText = 'Loading',
    loadingProgress,
    fileDescription,
    size = attachmentPropSizeDefault,
    onClick,
    withAction: withActionProp,
    buttonTitle,
    ...otherProps
  } = props;
  const Tag = as as string;
  const withAction = withActionProp || Boolean(onClick);
  const withOnButtonAction = Boolean(onButtonClick);

  return (
    <Tag
      {...otherProps}
      onClick={onClick}
      className={cnAttachment({ withAction, withOnButtonAction, size }, [
        className,
      ])}
      ref={ref}
    >
      <File
        className={cnAttachment('File', { error: Boolean(errorText) })}
        extension={fileExtension}
        loading={loading}
        loadingWithProgressSpin
        loadingProgress={loadingProgress}
        size={fileSizeMap[size]}
      />
      <div className={cnAttachment('Content')}>
        {fileName && (
          <Text
            className={cnAttachment('FileName')}
            size={textSizeMap[size]}
            view="primary"
            lineHeight="xs"
          >
            {fileName}
          </Text>
        )}
        {fileDescription && !loading && (
          <Text
            className={cnAttachment('FileDescription')}
            size={descriptionSizeMap[size]}
            lineHeight="xs"
            view="ghost"
          >
            {fileDescription}
          </Text>
        )}
        {loadingText && loading && (
          <Text
            className={cnAttachment('LoadingText')}
            size={descriptionSizeMap[size]}
            lineHeight="xs"
            view="ghost"
          >
            {loadingProgress
              ? `${loadingText} ${loadingProgress}%`
              : `${loadingText}...`}
          </Text>
        )}
        {errorText && (
          <Text
            className={cnAttachment('ErrorText')}
            size={descriptionSizeMap[size]}
            lineHeight="xs"
            view="alert"
          >
            {errorText}
          </Text>
        )}
      </div>
      {withOnButtonAction && (
        <Button
          className={cnAttachment('Button')}
          as="span"
          onlyIcon
          iconLeft={buttonIcon}
          onClick={onButtonClick}
          title={buttonTitle}
          size="xs"
          view="clear"
        />
      )}
    </Tag>
  );
});

export { Attachment, cnAttachment };
