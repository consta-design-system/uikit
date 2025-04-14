import './Attachment.css';

import React from 'react';

import { Button } from '##/components/Button';
import { File } from '##/components/File';
import { Text, TextPropSize } from '##/components/Text';
import { FileIconPropSize } from '##/fileIcons/FileIcon/FileIcon';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';
import { isDefined } from '##/utils/type-guards';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import {
  AttachmentActions,
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
    withPictogram,
    loading,
    fileName,
    errorText,
    loadingText = 'Loading',
    loadingProgress,
    fileDescription,
    size = attachmentPropSizeDefault,
    onClick,
    actions: actionsProp = [],
    buttonTitle,
    buttonIcon,
    onButtonClick,
    ...otherProps
  } = props;
  const Tag = as as string;

  const actions: AttachmentActions[] = [
    onButtonClick && buttonIcon
      ? {
          onClick: onButtonClick,
          icon: buttonIcon,
          title: buttonTitle,
        }
      : undefined,
    ...actionsProp,
  ].filter(isDefined);

  const withActions = Boolean(actions?.length);

  return (
    <Tag
      {...otherProps}
      onClick={onClick}
      className={cnAttachment(
        {
          size,
          hoverEffect: Boolean(actions?.length || onClick),
          cursor: onClick ? 'pointer' : undefined,
          withActions,
          error: Boolean(errorText),
        },
        [cnMixFlex({ flex: 'flex', gap: 'xs' }), className],
      )}
      ref={ref}
    >
      {withPictogram && (
        <File
          className={cnAttachment('File')}
          extension={fileExtension}
          loading={loading}
          loadingWithProgressSpin
          loadingProgress={loadingProgress}
          size={fileSizeMap[size]}
        />
      )}
      <div
        className={cnAttachment('Content', [
          cnMixFlex({ flex: 'flex', direction: 'column', gap: '2xs' }),
        ])}
      >
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
      {withActions && (
        <div
          className={cnAttachment('Actions', [
            cnMixFlex({ flex: 'flex', gap: 'xs' }),
          ])}
        >
          {actions.map((action, index) => (
            <Button
              key={action.title || index}
              className={cnAttachment('Button')}
              tabIndex={-1}
              onlyIcon
              iconLeft={action.icon}
              onClick={action.onClick}
              title={action.title}
              ref={action.ref}
              size="xs"
              view="clear"
            />
          ))}
        </div>
      )}
    </Tag>
  );
});

export { Attachment, cnAttachment };
