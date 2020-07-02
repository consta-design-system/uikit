import './Attach.css';

import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
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

export const cnAttach = cn('Attach');

export const Attach: ComponentWithAs<Props> = forwardRefWithAs<Props>((props, ref) => {
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

  return (
    <Tag
      {...otherProps}
      onClick={onClick}
      className={cnAttach({ withAction }, [className])}
      ref={ref}
    >
      <File
        className={cnAttach('File', { error: Boolean(errorText) })}
        extension={fileExtension}
        loading={loading}
        loadingWithProgressSpin
        loadingProgress={loadingProgress}
        size="s"
      />
      <div className={cnAttach('Content')}>
        {fileName && (
          <Text className={cnAttach('FileName')} size="s" view="primary" lineHeight="xs">
            {fileName}
          </Text>
        )}
        {fileDescription && !loading && (
          <Text className={cnAttach('FileDescription')} size="xs" lineHeight="xs" view="ghost">
            {fileDescription}
          </Text>
        )}
        {loadingText && loading && (
          <Text className={cnAttach('LoadingText')} size="xs" lineHeight="xs" view="ghost">
            {loadingProgress ? `${loadingText} ${loadingProgress}%` : `${loadingText}...`}
          </Text>
        )}
        {errorText && (
          <Text className={cnAttach('ErrorText')} size="xs" lineHeight="xs" view="alert">
            {errorText}
          </Text>
        )}
      </div>
      {onButtonClick && (
        <Button
          className={cnAttach('Button')}
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
