import { getErrorsList } from '../getErrorsList';
import { defaultLocale } from '../locale';
import { FileSizes } from '../types';

const sizes: FileSizes = {
  minSize: 512,
  maxSize: 512 * 1024,
};

describe('getErrorsList', () => {
  const filePng = new File([new ArrayBuffer(1024 * 1024)], 'file.png', {
    type: 'image/png',
  });
  const fileTxt = new File([new ArrayBuffer(1024)], 'file.txt', {
    type: 'text/plain',
  });
  const fileUnknown = new File([new ArrayBuffer(1)], 'file.unknown');

  it('возвращает пустой список, если не было файлов', () => {
    expect(getErrorsList([], defaultLocale, sizes)).toEqual([]);
  });

  it('возвращает пустой список, если ошибок нет', () => {
    expect(
      getErrorsList(
        [
          {
            file: filePng,
            errors: [],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual([]);
  });

  it('возвращает ошибки размера файла', () => {
    expect(
      getErrorsList(
        [
          {
            file: filePng,
            errors: [
              {
                code: 'file-too-large',
                message: '',
              },
              {
                code: 'file-too-small',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual([
      'file.png: файл слишком большой (максимум 512 Кб)',
      'file.png: файл слишком маленький (минимум 512 байт)',
    ]);
  });

  it('возвращает ошибку формата файла с указанием типа', () => {
    expect(
      getErrorsList(
        [
          {
            file: fileTxt,
            errors: [
              {
                code: 'file-invalid-type',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual(['file.txt: формат файла не подходит (text/plain)']);
  });

  it('возвращает ошибку формата файла без указания типа', () => {
    expect(
      getErrorsList(
        [
          {
            file: fileUnknown,
            errors: [
              {
                code: 'file-invalid-type',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual(['file.unknown: формат файла не подходит ']);
  });

  it('возвращает ошибку количества файлов', () => {
    expect(
      getErrorsList(
        [
          {
            file: filePng,
            errors: [
              {
                code: 'too-many-files',
                message: '',
              },
            ],
          },
          {
            file: fileTxt,
            errors: [
              {
                code: 'too-many-files',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual(['Вы перетащили несколько файлов. Выберите один, пожалуйста']);
  });

  it('возвращает вместе ошибки формата и количества файлов', () => {
    expect(
      getErrorsList(
        [
          {
            file: filePng,
            errors: [
              {
                code: 'too-many-files',
                message: '',
              },
            ],
          },
          {
            file: fileTxt,
            errors: [
              {
                code: 'file-invalid-type',
                message: '',
              },
              {
                code: 'too-many-files',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual([
      'Вы перетащили несколько файлов. Выберите один, пожалуйста',
      'file.txt: формат файла не подходит (text/plain)',
    ]);
  });

  it('возвращает общую ошибку в случае, если код ошибки неизвестный', () => {
    expect(
      getErrorsList(
        [
          {
            file: fileTxt,
            errors: [
              {
                code: 'INVALID_CODE',
                message: '',
              },
            ],
          },
        ],
        defaultLocale,
        sizes,
      ),
    ).toEqual(['не получилось добавить файл']);
  });

  it('использует кастомную локаль', () => {
    const customLocale = {
      'file-too-large': ({ file }: { file: File }) =>
        `Файл ${file.name} очень большой`,
    };
    expect(
      getErrorsList(
        [
          {
            file: filePng,
            errors: [
              {
                code: 'file-too-large',
                message: '',
              },
            ],
          },
        ],
        customLocale,
        sizes,
      ),
    ).toEqual(['Файл file.png очень большой']);
  });
});
