import { getErrorsList } from '../helpers';

describe('getErrorsList', () => {
  const filePng = {
    name: 'file.png',
    type: 'image/png',
    size: 1000,
  } as File;
  const fileTxt = {
    name: 'file.txt',
    type: '.txt',
    size: 1000,
  } as File;

  it('возвращает пустой список, если не было файлов', () => {
    expect(getErrorsList([])).toEqual([]);
  });

  it('возвращает пустой список, если ошибок нет', () => {
    expect(
      getErrorsList([
        {
          file: filePng,
          errors: [],
        },
      ]),
    ).toEqual([]);
  });

  it('возвращает ошибки размера файла', () => {
    expect(
      getErrorsList([
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
      ]),
    ).toEqual(['file.png: файл слишком большой', 'file.png: файл слишком маленький']);
  });

  it('возвращает ошибку формата файла', () => {
    expect(
      getErrorsList([
        {
          file: fileTxt,
          errors: [
            {
              code: 'file-invalid-type',
              message: '',
            },
          ],
        },
      ]),
    ).toEqual(['file.txt: неправильный формат файла']);
  });

  it('возвращает ошибку количества файлов', () => {
    expect(
      getErrorsList([
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
      ]),
    ).toEqual(['file.png: слишком много файлов', 'file.txt: слишком много файлов']);
  });

  it('возвращает общую ошибку в случае, если код ошибки неизвестный', () => {
    expect(
      getErrorsList([
        {
          file: fileTxt,
          errors: [
            {
              code: 'INVALID_CODE',
              message: '',
            },
          ],
        },
      ]),
    ).toEqual(['file.txt: не удалось добавить файл']);
  });
});
