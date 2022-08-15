import { getErrorsList } from '../getErrorsList';
import { defaultLocale } from '../locale';

const sizes = {
  minSize: 512,
  maxSize: 512 * 1024,
};

describe('getErrorsList', () => {
  const filePng = {
    name: 'file.png',
    type: 'image/png',
    size: 1024 * 1024,
  } as File;
  const fileTxt = {
    name: 'file.txt',
    type: 'text/plain',
    size: 1024,
  } as File;
  const fileUnknown = {
    name: 'file.unknown',
    size: 1,
  } as File;

  it('возвращает пустой список, если не было файлов', () => {
    expect(getErrorsList([], sizes, defaultLocale)).toEqual([]);
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
        sizes,
        defaultLocale,
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
        sizes,
        defaultLocale,
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
        sizes,
        defaultLocale,
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
        sizes,
        defaultLocale,
      ),
    ).toEqual(['file.unknown: формат файла не подходит']);
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
        sizes,
        defaultLocale,
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
        sizes,
        defaultLocale,
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
        sizes,
        defaultLocale,
      ),
    ).toEqual(['file.txt: не получилось добавить файл']);
  });
});
