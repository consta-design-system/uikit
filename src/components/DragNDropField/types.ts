export type FileError = {
  message: string;
  code: 'file-too-large' | 'file-too-small' | 'too-many-files' | 'file-invalid-type' | string;
};

export type DragNDropFieldPropErrorMessages = Partial<
  Record<FileError['code'], string | ((file: File | undefined, error?: FileError) => string)>
>;

export type DragNDropFieldChildrenRenderProp = (
  props: {
    openFileDialog: () => void;
  } & Pick<DragNDropFieldProps, 'accept' | 'maxSize' | 'multiple'>,
) => React.ReactNode;

export type DragNDropFieldProps = {
  accept?: string | string[];
  maxSize?: number;
  multiple?: boolean;
  onDropFiles: (files: File[]) => void;
  errorMessages?: DragNDropFieldPropErrorMessages;
  children?: React.ReactNode | DragNDropFieldChildrenRenderProp;
};
