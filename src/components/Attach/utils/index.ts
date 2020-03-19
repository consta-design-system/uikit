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

  if (typeof ext !== 'string') return 'Undefined';

  const extensionsMap = {
    avi: 'Avi',
    bmp: 'Bmp',
    csv: 'Csv',
    csvx: 'Csv',
    doc: 'Doc',
    docx: 'Doc',
    exe: 'Exe',
    gif: 'Gif',
    jpg: 'Jpg',
    jpeg: 'Jpg',
    jp2: 'Jpg',
    mov: 'Mov',
    mp3: 'Mp3',
    mp4: 'Mp4',
    pdf: 'Pdf',
    png: 'Png',
    ppt: 'Ppt',
    pptx: 'Ppt',
    rar: 'Rar',
    rtf: 'Rtf',
    rtfx: 'Rtf',
    tiff: 'Tiff',
    txt: 'Txt',
    wav: 'Wav',
    xls: 'Xls',
    xlsx: 'Xls',
    zip: 'Zip',
  };

  const key = Object.keys(extensionsMap).find(name => name === ext);
  return key ? extensionsMap[key] : 'Undefined';
};

export const pad = (n: number): string => {
  return String(`00${n}`).slice(-2);
};

export const getStrFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year}, ${hour}:${minutes}`;
};
