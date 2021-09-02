import './Attachment.css';

import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Button } from '../Button/Button';
import { File } from '../File/File';
import { Text } from '../Text/Text';

type Props = {
  fileExtension?: string;
  loading?: boolean;
  fileName?: string;
  fileDescription?: string;
  loadingProgress?: number;
  errorText?: string;
  loadingText?: string;
  onButtonClick?: React.EventHandler<React.MouseEvent>;
  buttonIcon?: React.FC<IconProps>;
  buttonTitle?: string;
  withAction?: boolean;
  className?: string;
  children?: never;
};

const cnAttachment = cn('Attachment');

const Attachment = forwardRefWithAs<Props>((props, ref) => {
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
      className={cnAttachment({ withAction, withOnButtonAction }, [className])}
      ref={ref}
    >
      <File
        className={cnAttachment('File', { error: Boolean(errorText) })}
        extension={fileExtension}
        loading={loading}
        loadingWithProgressSpin
        loadingProgress={loadingProgress}
        size="s"
      />
      <div className={cnAttachment('Content')}>
        {fileName && (
          <Text className={cnAttachment('FileName')} size="s" view="primary" lineHeight="xs">
            {fileName}
          </Text>
        )}
        {fileDescription && !loading && (
          <Text className={cnAttachment('FileDescription')} size="xs" lineHeight="xs" view="ghost">
            {fileDescription}
          </Text>
        )}
        {loadingText && loading && (
          <Text className={cnAttachment('LoadingText')} size="xs" lineHeight="xs" view="ghost">
            {loadingProgress ? `${loadingText} ${loadingProgress}%` : `${loadingText}...`}
          </Text>
        )}
        {errorText && (
          <Text className={cnAttachment('ErrorText')} size="xs" lineHeight="xs" view="alert">
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
