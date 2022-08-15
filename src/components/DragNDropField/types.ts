import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Locale } from './locale';

export type DragNDropFieldPropLocale = Locale;

export type FileError = {
  message: string;
  code:
    | 'file-too-large'
    | 'file-too-small'
    | 'too-many-files'
    | 'file-invalid-type';
};

export type FileRejection = {
  file: File;
  errors: FileError[];
};

export type DragNDropFieldPropErrorMessages = Partial<
  Record<
    FileError['code'],
    string | ((file: File | undefined, error?: FileError) => string)
  >
>;

export type DragNDropFieldChildrenRenderProp = (
  props: {
    openFileDialog: () => void;
    locale: Required<DragNDropFieldPropLocale>;
  } & Pick<
    DragNDropFieldProps,
    'accept' | 'maxSize' | 'multiple' | 'disabled' | 'minSize'
  >,
) => React.ReactNode;

export type FileSizes = {
  minSize?: number;
  maxSize?: number;
};

export type DragNDropFieldProps = PropsWithHTMLAttributes<
  {
    accept?: string | string[];
    maxSize?: number;
    minSize?: number;
    multiple?: boolean;
    onDropFiles: (files: File[]) => void;
    children?: React.ReactNode | DragNDropFieldChildrenRenderProp;
    locale?: DragNDropFieldPropLocale;
    disabled?: boolean;
  },
  HTMLDivElement
>;
