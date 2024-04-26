import { IconComponent } from '@consta/icons/Icon';
import { Accept, DropEvent, FileRejection } from 'react-dropzone';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export type DragNDropFieldChildrenRenderFn = (props: {
  openFileDialog: () => void;
  isFocused: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  isFileDialogActive: boolean;
  acceptedFiles: File[];
  fileRejections: FileRejection[];
}) => React.ReactNode;

export type DragNDropFieldContentProps = {
  openFileDialog: () => void;
  locale: Required<DragNDropFieldPropLocale>;
  isFocused: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  isFileDialogActive: boolean;
  acceptedFiles: File[];
  fileRejections: FileRejection[];
} & Pick<
  DragNDropFieldProps,
  'accept' | 'maxSize' | 'multiple' | 'disabled' | 'minSize'
>;

export type FileSizes = {
  minSize?: number;
  maxSize?: number;
};

export type DragNDropFieldProps = PropsWithHTMLAttributes<
  {
    accept?: Accept;
    maxSize?: number;
    minSize?: number;
    maxFiles?: number;
    multiple?: boolean;
    disabled?: boolean;
    children?: React.ReactNode | DragNDropFieldChildrenRenderFn;
    locale?: DragNDropFieldPropLocale;
    onDrop?: <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => void;
    onDropAccepted?: <T extends File>(files: T[]) => void;
    onDropRejected?: (
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => void;
    onError?: (err: Error) => void;
  },
  HTMLDivElement
>;

export type LocaleError =
  | string
  | ((props: { file: File; sizes?: FileSizes }) => string);

export type LocaleLabel = string | ((props: { fileText: string }) => string);

export type DragNDropFieldPropLocale = {
  'file-invalid-type'?: LocaleError;
  'file-too-large'?: LocaleError;
  'file-too-small'?: LocaleError;
  'too-many-files'?: string;
  'general-error'?: string;
  'fit-files'?: string;
  'file'?: string;
  'files'?: string;
  'before'?: string;
  'from'?: string;
  'gigabyte'?: string;
  'megabyte'?: string;
  'kilobyte'?: string;
  'byte'?: string;
  'call-to-action'?: LocaleLabel;
  'action-button'?: LocaleLabel;
  'drag-active-message'?: string;
};

export const dragNDropFieldInformerPropStatus = [
  'default',
  'alert',
  'warning',
] as const;

export type DragNDropFieldInformerPropStatus =
  typeof dragNDropFieldInformerPropStatus[number];

export type DragNDropFieldInformerProps = {
  status?: DragNDropFieldInformerPropStatus;
  icon?: IconComponent;
  loading?: boolean | number;
  text?: string;
  withButton?: boolean;
  buttonIcon?: IconComponent;
  buttonLabel?: string;
  onButtonClick?: () => void;
};
