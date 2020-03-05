export const getFileSizeStr = (fileSize: number): string => {
  let size = 0;
  let unit = 'B';
  if (fileSize > 1024) {
    size = Math.round((fileSize / 1024) * 100) / 100;
    unit = 'KB';
    if (size > 1024) {
      size = Math.round((size / 1024) * 100) / 100;
      unit = 'MB';
      if (size > 1024) {
        size = Math.round((size / 1024) * 100) / 100;
        unit = 'Гб';
      }
    }
  }

  return `${size} ${unit}`;
};

export const getFileIconComponentName = (fileName: string): string => {
  const ext = fileName.split('.').pop();

  if (ext === undefined || ext === '') return 'Undefined';

  switch (ext.toLowerCase()) {
    case 'avi':
      return 'Avi';
    default:
      return 'Undefined';
  }
};
