import './Attach.css';

import React from 'react';

import { IIcon } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { componentIsFunction } from '../../utils/componentIsFunction';
import { Button } from '../Button/Button';
import { File } from '../File/File';
import { Text } from '../Text/Text';

declare type AttachProps = {
  as?: React.ElementType;
  fileExtension?: string;
  loading?: boolean;
  fileName?: string;
  fileDescription?: string;
  loadingProgress?: number;
  errorText?: string;
  loadingText?: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  onButtonClick?: React.EventHandler<React.MouseEvent>;
  buttonIcon?: React.FC<IIcon>;
  buttonTitle?: string;
  className?: string;
  withAction?: boolean;
  innerRef?: React.Ref<HTMLElement>;
};

export type IAttachProps<T = {}> = AttachProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof AttachProps & T> &
  Omit<T, keyof AttachProps>;

export const cnAttach = cn('Attach');

export function Attach(props: IAttachProps): React.ReactElement {
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
    innerRef,
    ...otherProps
  } = props;
  const Component = as;

  const withAction = withActionProp || Boolean(onClick);

  return (
    <Component
      onClick={onClick}
      className={cnAttach({ withAction }, [className])}
      ref={innerRef}
      {...(componentIsFunction(Component) && { innerRef })}
      {...otherProps}
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
    </Component>
  );
}
