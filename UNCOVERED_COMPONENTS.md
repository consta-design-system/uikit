# Компоненты без тестового покрытия

> Отчёт по анализу тестового покрытия компонентов в `src/components`.
> Проверялись директории `__tests__` и файлы `*.unit.*`, `*.test.*`, `*.spec.*`.

## 🔴 Полностью без тестов (21 компонент)

| #   | Компонент                  | Исходники                                                                 |
| --- | -------------------------- | ------------------------------------------------------------------------- |
| 1   | `AutoComplete`             | `AutoComplete.tsx`, `useAutoComplete.ts`, `helpers.ts`                    |
| 2   | `ComboboxDeprecated`       | `ComboboxDeprecated.tsx`, `helpers.ts`                                    |
| 3   | `FieldCaption`             | отдельный компонент (не путать с покрытым `FieldComponents/FieldCaption`) |
| 4   | `FieldGroup`               | `FieldGroup.tsx`, `getForm.ts`                                            |
| 5   | `FieldLabel`               | отдельный компонент (не путать с покрытым `FieldComponents/FieldLabel`)   |
| 6   | `Responses`                | `Responses.tsx`, `createResponses.tsx`                                    |
| 7   | `Responses403`             | —                                                                         |
| 8   | `Responses404`             | —                                                                         |
| 9   | `Responses500`             | —                                                                         |
| 10  | `Responses503`             | —                                                                         |
| 11  | `ResponsesConnectionError` | —                                                                         |
| 12  | `ResponsesDeleted`         | —                                                                         |
| 13  | `ResponsesEmptyBox`        | —                                                                         |
| 14  | `ResponsesEmptyPockets`    | —                                                                         |
| 15  | `ResponsesExit`            | —                                                                         |
| 16  | `ResponsesNothingFound`    | —                                                                         |
| 17  | `ResponsesSuccess`         | —                                                                         |
| 18  | `Skeleton`                 | сам компонент; покрыт только подкомпонент `SkeletonText`                  |
| 19  | `TextAreaAutoSize`         | —                                                                         |
| 20  | `TooltipDeprecated`        | —                                                                         |
| 21  | `Transition`               | `Transition.tsx`, `TransitionGroup.tsx`, `TransitionGroupNode.tsx`        |

## 🟠 Частично покрытые (тесты есть только у утилит/отдельных частей)

| Компонент          | Покрыто                                           | НЕ покрыто                                                                                                                                                                       |
| ------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DragNDropField`   | только утилиты: `formatFileSize`, `getErrorsList` | сам компонент и `DragNDropFieldContent`                                                                                                                                          |
| `EventInterceptor` | только `propsHandlers` (5 обработчиков)           | сам `EventInterceptor`, `usePropsHandler`, `eventInterceptorMap`                                                                                                                 |
| `Skeleton`         | `SkeletonText`                                    | сам `Skeleton`, `SkeletonBrick`, `SkeletonCircle`                                                                                                                                |
| `ListCanary`       | `ListCanary`                                      | `ListItem`                                                                                                                                                                       |
| `SelectCanary`     | `SelectSingle`, `SelectMultiple`                  | `SelectDropdown`, `SelectInput`, `SelectItem`, `SelectItemAll`, `SelectLoader`, `SelectPopover`, `SelectCreateButton`, `SelectControlLayout`, `SelectMultipleValue`, `useSearch` |

## 📌 Примечания

- `FieldCaption` и `FieldLabel` на верхнем уровне — **отдельные** компоненты (рендерят `Text`), они не являются ре-экспортами из `FieldComponents`, где тесты есть.
- У `DragNDropField` внутри `__tests__` лежит только хелпер `formatFileRequirements.ts`, который не является тестом — фактически компонентных тестов нет.
- В `SelectCanary` тест `SelectMultiple` продублирован на двух уровнях: `SelectCanary/__tests__/SelectMultiple.unit.tsx` и `SelectCanary/SelectMultiple/__tests__/SelectMultiple.unit.tsx`.

## Итог

- **21 компонент полностью без тестов**
- **~16 подкомпонентов/модулей** внутри 5 составных компонентов не покрыты
