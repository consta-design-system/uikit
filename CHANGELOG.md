# Changelog

## v4.1.0 (04/10/2022)
Самое важное:
- В таблице появилась возможность отображать строки сразу раскрытыми
- Обновили стенд

---

- [chore(deps): remove mdx-loader (#2669)](https://github.com/consta-design-system/uikit/commit/1ce33557ca03590383452c24b2d44d22b319f7dc) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): update @consta/stand (#2668)](https://github.com/consta-design-system/uikit/commit/c75ffa7d63665b307de197df57cb937cf5759590) - [@gizeasy](https://github.com/gizeasy)
- [feat(Table): add new props to table props and table row for expands rows (#2667)](https://github.com/consta-design-system/uikit/commit/7b9635d76729c13d30a098a506088aefe4a0a8ce) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.0.1 (28/09/2022)
Очень большое и важное обновление: поднимаем версию, выкладываем новый стенд.
Сами компоненты не меняются, зато:

- все Canary версии становятся стабильными,
- все стабильные, которые были на их месте, превращаются в Deprecated,
- все устаревшие версии удаляются из библиотеки.

А ещё шрифт Inter становится основным, если вы его специально подключали, нужно удалить.
Если используете какие-то из этих компонентов, поменяйте импорты при обновлении библиотеки:

Canary —> Stable
BreadcrumbsCanary —> Breadcrumbs
CheckboxGroupCanary -> CheckboxGroup
ChoiceGroupCanary -> ChoiceGroup
ContextMenuCanary -> ContextMenu
RadioGroupCanary -> RadioGroup
StepsCanary -> Steps
SwitchGroupCanary —> SwitchGroup
TabsCanary —> Tabs

Stable —> Deprecated

Breadcrumbs —> BreadcrumbsDeprecated

Сalendar -> СalendarDepricated
CheckboxGroup -> CheckboxGroupDeprecated
ChoiceGroup -> ChoiceGroupDeprecated
ContextMenu -> ContextMenuDeprecated
RadioGroup -> RadioGroupDeprecated
Steps -> StepsDeprecated
SwitchGroup —> SwitchGroupDeprecated 
Tabs —> TabsDeprecated

Удалены:

BasicSelectDeprecated
ComboboxDeprecated
MultiCombobobxDeprecated
UserSelectDeprecated

--------------------

## v3.29.0 (23/08/2022)
Самое важное:
- в `Tabs` добавили `xs` размер
---

- [docs(Button): fix misprint, describe icon size (#2590)](https://github.com/consta-design-system/uikit/commit/12efe41277802741581f2f6e48d08fd1f89163e2) - [@arhayka](https://github.com/arhayka)
- [feat(Tabs): add xs size and fix colors (#2481)](https://github.com/consta-design-system/uikit/commit/ae6ec2cfb446c591dfd8a51eb4cbeaaecc493912) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.28.0 (10/08/2022)
Самое важное:
- Разработали компонент `AvatarGroup`, теперь есть возможность показывать аватарки, группируя их.
- Доработали документацию
---

- [docs(review): added new images (#2479)](https://github.com/consta-design-system/uikit/commit/fb475f9f495ff2cba6fbf4182ef064954c3284c1) - [@gizeasy](https://github.com/gizeasy)
- [feat(AvatarGroup): add component for avatar grouping (#2471)](https://github.com/consta-design-system/uikit/commit/e9c3a6094eb952f7719c269a9296fbbc6b37ad3f) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.27.0 (05/08/2022)
Самое важное:
- В `ProgressLine` добавили модификацию `step`. Теперь можно показывать прогресс по шагам.
- В `Modal` добавили `afterClose`, событие которое отработает после размонтирования окна из дом.
- В `Badge` добавили `xs` размер
- Доработали документацию

---

- [feat(ProgressLine): add step modification (#2468)](https://github.com/consta-design-system/uikit/commit/0ed34c40e9cfefec9d7d52e97b967ffb13b464a8) - [@N1MBER](https://github.com/N1MBER)
- [feat(Modal): add afterClose prop (#2460)](https://github.com/consta-design-system/uikit/commit/49999d8d680312f7acbd935ead5305a1077d60d9) - [@N1MBER](https://github.com/N1MBER)
- [feat(Badge): add  xs size (#2455)](https://github.com/consta-design-system/uikit/commit/9936f6814adab85eda3bce516005bc1f6cacb09d) - [@N1MBER](https://github.com/N1MBER)
- [docs(components): fix figma links (#2459)](https://github.com/consta-design-system/uikit/commit/8f78711cab3f6c664ebbfa11a2f9601002d29b92) - [@arhayka](https://github.com/arhayka)
- [fix(Steps): fix crush with using google translate (#2458)](https://github.com/consta-design-system/uikit/commit/f1062cfc215aa4044492346d9eeebcf111de04d5) - [@N1MBER](https://github.com/N1MBER)
- [fix(Collapse): fix bug with color of icon on dark theme (#2454)](https://github.com/consta-design-system/uikit/commit/3dac567f3cab77fc96a221d2c9b5e8ed55c611d9) - [@N1MBER](https://github.com/N1MBER)
- [docs(common): update libraries lists and review (#2451)](https://github.com/consta-design-system/uikit/commit/1c6e6fb4e583658f111217033f92533103b234b5) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.26.4 (27/07/2022)
- [docs(about): add important links (#2443)](https://github.com/consta-design-system/uikit/commit/208d5fe5d3c5e3c6021c537f3c40bbccfcf0f595) - [@arhayka](https://github.com/arhayka)
- [docs(Button): add too big label example (#2442)](https://github.com/consta-design-system/uikit/commit/76cd5c5252516a0dabcec9c12b54908918eb9871) - [@arhayka](https://github.com/arhayka)
- [docs(Breadcrumbs): fix misprint (#2445)](https://github.com/consta-design-system/uikit/commit/7b8962c81a642f63f57e0bae8b3c35f2e39458be) - [@arhayka](https://github.com/arhayka)
- [docs(Theme): add shadows description (#2447)](https://github.com/consta-design-system/uikit/commit/fd6696fbf3c766ddbb0f2f27eefe4c4b37290a02) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.26.3 (21/07/2022)
Самое важное:
- В Table добавили возможность обрезать текст в ячейке.
- Доработали документацию

---

- [docs(Popover): change examples (#2437)](https://github.com/consta-design-system/uikit/commit/ee76227db9da51bfbd3253009f58618d095540e5) - [@arhayka](https://github.com/arhayka)
- [docs(Badge): add how to use section (#2435)](https://github.com/consta-design-system/uikit/commit/637abfb52282ce81f21b12daaf22a917dff6192c) - [@arhayka](https://github.com/arhayka)
- [fix(Table): fix wrap text on cell (#2425)](https://github.com/consta-design-system/uikit/commit/99ae1052eb18aea07432d8d982940e16236c1343) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.26.2 (06/07/2022)
Самое важное:

- Добавлены новые иконки, а также исправлены размеры для уже существующих
- Добавлен размер шрифта `medium` в `Text`

---

- [feat(Icons): add new icons and sizes (#2429)](https://github.com/consta-design-system/uikit/commit/6f668c9bef5b81e52948454366160fb3d2f8a1ba) - [@N1MBER](https://github.com/N1MBER)
- [feat(Fonts): add new font weight ](https://github.com/consta-design-system/uikit/commit/bb44e76fb9a10f16efade19663e54b9d07b9fe06) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.26.1 (29/06/2022)
Самое важное:
- Доработали документацию
- Добавили в `MixCard` и `Card` модификацию `_border`
---

- [docs(ProgressLine): edit docs (#2418)](https://github.com/consta-design-system/uikit/commit/d86948696fe86db7c61c516015a4399078046bde) - [@arhayka](https://github.com/arhayka)
- [docs(TextField): add docs for increamentButton, withClearButton and type=password (#2417)](https://github.com/consta-design-system/uikit/commit/acdf7fef90a8042c9f55acd9a562f7bcd2eecb33) - [@arhayka](https://github.com/arhayka)
- [chore(storybook): add automatization for publish stand (#2421)](https://github.com/consta-design-system/uikit/commit/e20a4a2a215378e8df8e90de8817a9d8d7d0ec6f) - [@gizeasy](https://github.com/gizeasy)
- [docs(review): add ProgressLine and FieldGroup (#2415)](https://github.com/consta-design-system/uikit/commit/453f7b0d15383e73e9f94a9ab5b3ab4019727d04) - [@arhayka](https://github.com/arhayka)
- [docs(DatePicker): add withClearButton description (#2414)](https://github.com/consta-design-system/uikit/commit/75ef14a33f394a9d7a3c6d1afc4bd47e96a4f053) - [@arhayka](https://github.com/arhayka)
- [docs(DragNDropField): edit locale descriptoin (#2413)](https://github.com/consta-design-system/uikit/commit/8bd09fc22451c73dce558420e3ffb0114d71b039) - [@arhayka](https://github.com/arhayka)
- [docs(FieldGroup): edit docs (#2412)](https://github.com/consta-design-system/uikit/commit/b92aaa4707158809333e188f399485d655bc4aeb) - [@arhayka](https://github.com/arhayka)
- [feat(MixCard): add border prop to mixin (#2416)](https://github.com/consta-design-system/uikit/commit/fcc736b78b422b3d143eff2ecde74796748e5ac3) - [@N1MBER](https://github.com/N1MBER)
- [chore(storybook): add automatisation for publish stand (#2398)](https://github.com/consta-design-system/uikit/commit/5c0214fbd997d932fb69708f1e5ae9bb3386897f) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.26.0 (22/06/2022)
Самое важное:

- Добавили новый компонент `ProgressLine`, для отображения статуса загрузки
- В `TextField` добавили события по нажатию кнопок

---

- [fix(TextField): fixed disabled (#2409)](https://github.com/consta-design-system/uikit/commit/4d54487ed5d023b8cc65f7168cbb44cc09894f59) - [@gizeasy](https://github.com/gizeasy)
- [fix(Slider): fix work of slider on a big and small values (#2382)](https://github.com/consta-design-system/uikit/commit/50ffaf64c01627c0cb0d45fa44b512f293515a2a) - [@N1MBER](https://github.com/N1MBER)
- [feat(TextField): add onKey events for input and add incrementButtons (#2394)](https://github.com/consta-design-system/uikit/commit/fe892b020af944ecc1b46255ac480170951b79f2) - [@N1MBER](https://github.com/N1MBER)
- [fix(User): fix word wrap (#2395)](https://github.com/consta-design-system/uikit/commit/11ba66ec0ff73a6a8e7180a740c520dc10934b1d) - [@N1MBER](https://github.com/N1MBER)
- [feat(ProgressLine): add ProgressLine component (#2383)](https://github.com/consta-design-system/uikit/commit/77e844e2e34c82d698e7b95b685480b8ef9dea74) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.25.0 (15/06/2022)
Самое важное:
- Добавили новый компонент `FieldGroup`, который склеивает несколько элементов формы — например, два поля или поле и кнопку. Не нужно думать про позиционирование элементов, проставлять отступы и скругление, компонент сделает всё сам. Использовать можно будет для любых элементов, у которых есть свойство `form` — `TextField`, `Button`, `Select`, `UserSelect`, `Combobox`, `DatePiker` и похожих.
---

- [fix(DateTime): fixed multiplicity (#2389)](https://github.com/consta-design-system/uikit/commit/fd2fc46f3f0da6b6df419460522a12f8e5ff1e0a) - [@gizeasy](https://github.com/gizeasy)
- [fix(Sidebar): fixed rootClassName (#2387)](https://github.com/consta-design-system/uikit/commit/406baed6caaaf72bae44d80054a15ff640bc8873) - [@gizeasy](https://github.com/gizeasy)
- [feat(FieldGroup): add FieldGroup](https://github.com/consta-design-system/uikit/commit/40fee71989c9c1c4603e3b65cb132a4f418fa24a) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.24.4 (08/06/2022)
- [refactor(DragNDropField): refactor locale (#2361)](https://github.com/consta-design-system/uikit/commit/15fbb25839545c6ab6a2be82f23addd65eb82f26) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.24.3 (08/06/2022)
Самое важное:
- В `TextField` появился функционал "показать пароль" при `_type_password`
- В `DragNDropField` добавили модификацию `_disabled`
- В `DatePicker` добавили крестик очистки поля ввода
---

- [fix(TextField): fixed bugs](https://github.com/consta-design-system/uikit/commit/07721120c0c5274305f9bc095d321def34ac483c) - [@gizeasy](https://github.com/gizeasy)
- [refactor(Popover): refactor (#2374)](https://github.com/consta-design-system/uikit/commit/175b420ce331ccb9eb39363591f6351306cd859d) - [@gizeasy](https://github.com/gizeasy)
- [feat(DatePicker): add withClearButton (#2365)](https://github.com/consta-design-system/uikit/commit/bdcf2bbd3578157faa61d87af454234234afe3d2) - [@gizeasy](https://github.com/gizeasy)
- [feat(Popover): fixed memory leak (#2367)](https://github.com/consta-design-system/uikit/commit/dcfab8341b0d96b9816dd6328e14a86b0de1a993) - [@gizeasy](https://github.com/gizeasy)
- [fix(fonts): fix export fonts (#2368)](https://github.com/consta-design-system/uikit/commit/44c0063c33476b7433c0e5e55adb64ff70599e1f) - [@gizeasy](https://github.com/gizeasy)
- [docs(Grid): edit example in doc (#2364)](https://github.com/consta-design-system/uikit/commit/5c3600bba36d475eb0b4d6145f004c335155a43d) - [@arhayka](https://github.com/arhayka)
- [fix(Table): add export SortByProps (#2356)](https://github.com/consta-design-system/uikit/commit/6eb4737765f711d5a6e0114d161a921e99f62869) - [@gizeasy](https://github.com/gizeasy)
- [docs(DragNDropField): edit docs for local (#2360)](https://github.com/consta-design-system/uikit/commit/9cdeddcb7cfb37d46588c5f7cfdfcfa883285fcc) - [@arhayka](https://github.com/arhayka)
- [feat(DragNDropField): add disabled (#2358)](https://github.com/consta-design-system/uikit/commit/6929db5f81db17db8faa0f380804cce51c9191aa) - [@gizeasy](https://github.com/gizeasy)
- [feat(TextField): add type password and resech (#2355)](https://github.com/consta-design-system/uikit/commit/b3230fabff9e9e107004931d453e4e09c3118668) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.24.2 (02/06/2022)
Самое важное:
В пакете `v3.24.1` была критическая ошибка, используйте `v3.24.2`

---
--------------------

## v3.24.1 (01/06/2022)
Самое важное:
- В `DragNDropField` добавили возможность локализации
- Обновили тесты для `Table`, `DateTime`, `useKeys`, `Select`
- Обновили документацию

---

- [test(Table): add tests to Table (#2330)](https://github.com/consta-design-system/uikit/commit/653998a80a4b3c50c31bf2605b90a7de5c6dd96c) - [@vebessonova](https://github.com/vebessonova)
- [feat(DragNDropField): add locale (#2314)](https://github.com/consta-design-system/uikit/commit/35ff97c63b41034712db1d208b208b029691d0f5) - [@N1MBER](https://github.com/N1MBER)
- [docs(Responses): add link to gpn-responses (#2346)](https://github.com/consta-design-system/uikit/commit/9eac0e09dc82199b959b3736bab4661620238d3d) - [@arhayka](https://github.com/arhayka)
- [docs(Table): add links to other tables (#2345)](https://github.com/consta-design-system/uikit/commit/d8e4de56d5ff1f22027e3621297d6819b6a58abc) - [@arhayka](https://github.com/arhayka)
- [docs(Header): add links to other headers (#2344)](https://github.com/consta-design-system/uikit/commit/0800da60c7a248ee79135de12f9c921763dccb28) - [@arhayka](https://github.com/arhayka)
- [test(DateTime): add tests to DateTime (#2337)](https://github.com/consta-design-system/uikit/commit/1964cb7cf30e286c0fd4f274406edaa57209e767) - [@loel001](https://github.com/loel001)
- [test(useKeys): add tests to useKeys (#2328)](https://github.com/consta-design-system/uikit/commit/513d786d923d0369af0819bda3098bdb9f61385f) - [@loel001](https://github.com/loel001)
- [test(Select): add tests to Select (#2329)](https://github.com/consta-design-system/uikit/commit/50d9f45273c78313c8696ebdc5786d2443d625d4) - [@loel001](https://github.com/loel001)
- [fix(Popover): fixed change position (#2335)](https://github.com/consta-design-system/uikit/commit/2503a1c455182ef4954d8589a1ae07429f941ab8) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.24.0 (25/05/2022)
- Добавили RadioGroup(Canary), ChoiceGroup(Canary), CheckBoxGroup(Canary), SwichGroup(Canary) и Tabs(Canary). Всё те же компоненты, только теперь без обязательных геттеров
- Доработали документацию
- Исправили несколько багов

---

- [feat(RadioGroupCanary): add RadioGroupCanary (#2313)](https://github.com/consta-design-system/uikit/commit/08c3bcb552cbebdd01a5e870f370aaa548c9e31b) - [@N1MBER](https://github.com/N1MBER)
- [feat(ChoiceGroupCanary): add ChoiceGroupCanary (#2312)](https://github.com/consta-design-system/uikit/commit/04cee6482933b27f7af6ef75a7c729ca6f0c02a3) - [@N1MBER](https://github.com/N1MBER)
- [feat(CheckboxGroupCanary): add CheckboxGroupCanary (#2311)](https://github.com/consta-design-system/uikit/commit/afec05578c46184cdf6a447d2d455fb3eef35d3b) - [@N1MBER](https://github.com/N1MBER)
- [feat(SwitchGroupCanary): add SwitchGroupCanary (#2310)](https://github.com/consta-design-system/uikit/commit/f1f4d12544dc405cdd9c188207437643e173b07b) - [@N1MBER](https://github.com/N1MBER)
- [feat(TabsCanary): add TabsCanary (#2309)](https://github.com/consta-design-system/uikit/commit/6037cfc8fdc9afb56b1527bde6367e2842d4287a) - [@N1MBER](https://github.com/N1MBER)
- [fix(getGroups): fixed calculate groups with groupId = 0 (#2322)](https://github.com/consta-design-system/uikit/commit/05a79381264b136533bdc355b964d8da5e32d37d) - [@gizeasy](https://github.com/gizeasy)
- [fix(Popover): fixed calculate position (#2321)](https://github.com/consta-design-system/uikit/commit/718bcd4dafb0347f649056463052a543a372824a) - [@gizeasy](https://github.com/gizeasy)
- [refactor(DatePicker): refactor renderAdditionalControls and useCurrentVisibleDate (#2318)](https://github.com/consta-design-system/uikit/commit/e556a36bbb96bb3213a91802caaaa3d4c38262a6) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.23.1 (18/05/2022)
Самое важное:
- Выпустили обновленный Steps (с флагом `Canary`) — использование геттеров теперь не обязательно.
- Добавили инструкцию по подключению шрифта Inter для дизайнеров, можете посмотреть, как [внедрить](https://uikit.consta.design/?path=/docs/new-font--page) его в свой проект.
- Исправили ошибку с названием файлов в `File`.
- Исправили баг в `Slider` на крайних значениях.

---

- [feat(StepsCanary): add new canary component (#2268)](https://github.com/consta-design-system/uikit/commit/5a084690e87f81aaf087e60caf85516861abdd23) - [@N1MBER](https://github.com/N1MBER)
- [fix(Slider): fix detecting of active line (#2298)](https://github.com/consta-design-system/uikit/commit/5037568da0431d3eb2400d8cb8c4526abcb2f320) - [@N1MBER](https://github.com/N1MBER)
- [fix(File): fixed file extensions (#2301)](https://github.com/consta-design-system/uikit/commit/7a5194a0217d82f24d92648c092b32de1be415fc) - [@gizeasy](https://github.com/gizeasy)
- [docs(new font): new font instructions for designers (#2295)](https://github.com/consta-design-system/uikit/commit/09a781476fb38c1ab2596e4805d603e121568f6d) - [@kolebayev](https://github.com/kolebayev)

--------------------

## v3.23.0 (11/05/2022)
Самое важное:
- Добавили шрифт `Inter` в библиотеку, вы можете его попробовать на своем проекте.
- Добавили в обзор `MixPlot` и `ag-grid-adapter`.
---

- [feat(fonts): add Inter (#2290)](https://github.com/consta-design-system/uikit/commit/ce494da31323a3e85c799d6c65131e8b2a24871f) - [@gizeasy](https://github.com/gizeasy)
- [docs(review): add MixPlot and agGridAdapter (#2289)](https://github.com/consta-design-system/uikit/commit/d445c058c4f6085ad962775e54a850d635d16d6c) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.22.0 (04/05/2022)
Самое важное:

- в `DatePicker` добавили новые типы "month" и "month-range". Они позволяют выбирать дату или диапазон дат с точностью до месяца.
- Обновлена документация, добавлены разделы про адаптивность компоненов.
--- 

- [docs(Table): add adaptive section (#2278)](https://github.com/consta-design-system/uikit/commit/997a3e7594f8c4331599615734c2a0653ed3df46) - [@arhayka](https://github.com/arhayka)
- [docs(Header): fix typo in doc Heder —> Header (#2275)](https://github.com/consta-design-system/uikit/commit/e42f4287a8fca24143eceaf6d7e036e68cbcfd21) - [@arhayka](https://github.com/arhayka)
- [docs(ProgressStepBar): add adaptive section (#2270)](https://github.com/consta-design-system/uikit/commit/3c455be69f53aeacf01769daff107f6df3fc8f27) - [@arhayka](https://github.com/arhayka)
- [fix(Select): fix height on multiple mode (#2267)](https://github.com/consta-design-system/uikit/commit/09ea6155c48a685286469bf586dd861b2056e7b2) - [@N1MBER](https://github.com/N1MBER)
- [feat(DatePickerTypeMonth): add new types month and month-range (#2265)](https://github.com/consta-design-system/uikit/commit/23af903b43fcd346d20a6d4c700ae978f5b1bcac) - [@N1MBER](https://github.com/N1MBER)
- [docs(Steps): add adaptive (#2266)](https://github.com/consta-design-system/uikit/commit/e3d366c0b3fb6c37e093ff5139c00e99ec9950e0) - [@arhayka](https://github.com/arhayka)
- [docs(Snackbar): add adaptive section (#2261)](https://github.com/consta-design-system/uikit/commit/7007668663c11e1d572cd3c8d6513448e3332296) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.21.2 (28/04/2022)
- [fix(DatePicker): fixed multiplicity on DatePicker type='date-time-range'](https://github.com/consta-design-system/uikit/commit/af801220f13c753fd67d98030057467535f450cf) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.21.0 (27/04/2022)
Самое главное:
- в `DatePicker` появились типы `year` и `year-range`
- Доработана документация по `DatePicker` и `Combobox`
---

- [fix(TableSelectedOptionsList): add ellipsis to filter list (#2257)](https://github.com/consta-design-system/uikit/commit/d3e5df5e78211ac79bd342dbc2959f136d9d8082) - [@N1MBER](https://github.com/N1MBER)
- [docs(Combobox): verify examples (#2256)](https://github.com/consta-design-system/uikit/commit/cedcbfcf14778ab26c297eac6f53b5947f723927) - [@arhayka](https://github.com/arhayka)
- [feat(DatePicker): add types year and year-range (#2254)](https://github.com/consta-design-system/uikit/commit/da36fda7386db228b1d3e458bfafe5aff06b4c25) - [@N1MBER](https://github.com/N1MBER)
- [docs(DatePicker): add docs for type Range fields (#2253)](https://github.com/consta-design-system/uikit/commit/8d97debbb8e107f365ad57e5894913a149e2dc99) - [@arhayka](https://github.com/arhayka)
- [docs(common): add SVG parameters to create icon docs (#2237)](https://github.com/consta-design-system/uikit/commit/e24316c67a123d368a2a79d4d0b69b054048edb5) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.20.0 (22/04/2022)
- Изменили API для `DatePicker` — настройки для `range`-типов стали удобнее. ⚠️ Осторожно, ломающие изменения:  некоторые свойства поменялись, см. ниже. 
- Исправили критическую ошибку в `useBreakpoints` —  `CSS` и `JS` брейкпоины теперь переключаются одновременно.
- `Select` — исправили ошибку с неправильным выделением опций.
- Добавили докуменацию про адапивность компонентов:  `Responses`,  `Pagination`, `Layout`,  `Grid`
- в `Table` исправили баг с `lazyload`

⚠️ Какие свойства поменялись в `DatePicker`

```
startFieldInputRef - deleted, use inputRef
endFieldInputRef - deleted, use inputRef
startFieldLeftSide - deleted, use leftSide
startFieldRightSide - deleted, use rightSide
endFieldLeftSide - deleted, use leftSide
endFieldRightSide - deleted, use rightSide
startFieldOnFocus - deleted, use onFocus
startFieldOnBlur - deleted, use onBlur
endFieldOnFocus - deleted, use onFocus
endFieldOnBlur - deleted, use onBlur
```

---

- [docs(global): remove gpn (#2245)](https://github.com/consta-design-system/uikit/commit/d367ba6b631c602a94460e411a5c57715db95787) - [@arhayka](https://github.com/arhayka)
- [docs(Responses): add adaptive section (#2239)](https://github.com/consta-design-system/uikit/commit/d83e2b754ea9c8e6041b3b53e8d63609584244c0) - [@arhayka](https://github.com/arhayka)
- [fix(Table): fix lazyload (#2236)](https://github.com/consta-design-system/uikit/commit/eec933b23553bc40b467404b2cad0341e5fc2a15) - [@N1MBER](https://github.com/N1MBER)
- [docs(Pagination): add adattive section (#2225)](https://github.com/consta-design-system/uikit/commit/a6bcf44cab2d3ab211ee33e9cf7f3fd160d07421) - [@arhayka](https://github.com/arhayka)
- [docs(Layout): add adaptive section (#2224)](https://github.com/consta-design-system/uikit/commit/6502713b2305f61228cb0e0c00940d9fc7e1ecce) - [@arhayka](https://github.com/arhayka)
- [docs(Grid): add adaptive section (#2222)](https://github.com/consta-design-system/uikit/commit/387c4579bdd2b411a8cc58281ef1021436278e13) - [@arhayka](https://github.com/arhayka)
- [chore(deploy): edit config (#2247)](https://github.com/consta-design-system/uikit/commit/34a860c2ed609376c77d12e8ae650c9dc8410267) - [@gizeasy](https://github.com/gizeasy)
- [feat(DatePicker): edit api (#2230)](https://github.com/consta-design-system/uikit/commit/6a1c57e061e3a5daa7c3ae6041e1fd1fbdba2591) - [@gizeasy](https://github.com/gizeasy)
- [fix(useBreakpoints): fixed EventListener (#2234)](https://github.com/consta-design-system/uikit/commit/9e054e422fded782c978f04fd7c25bd0c5258537) - [@gizeasy](https://github.com/gizeasy)
- [feat(SelectItem): added break-word (#2233)](https://github.com/consta-design-system/uikit/commit/61877e21550d0563dcbf8dd356a427d9fc18d453) - [@gizeasy](https://github.com/gizeasy)
- [docs(global): change links to the landing (#2226)](https://github.com/consta-design-system/uikit/commit/6e44faf9dd1ec6e6076b902e20f446213d6f5a1d) - [@arhayka](https://github.com/arhayka)
- [fix(SelectDropdown): fix bug with items index (#2232)](https://github.com/consta-design-system/uikit/commit/8eb24883ee45e843357d4b3ec93c47c3db12eb04) - [@N1MBER](https://github.com/N1MBER)
- [docs(global): replace url (#2228)](https://github.com/consta-design-system/uikit/commit/720df584d236bf436d0370e469916a16895f9e24) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.19.0 (13/04/2022)
Самое важное:
- В `BreadcrumbsCanary` добавлена возможность добавления под меню в элемент хлебных крошек
---

- [docs(review): add gantt picture (#2206)](https://github.com/consta-design-system/uikit/commit/4e79d1a62bdbbc19c3cfaacc077f104e116eadda) - [@arhayka](https://github.com/arhayka)
- [feat(BreadcrumbsCanary): add inner submenu (#2183)](https://github.com/consta-design-system/uikit/commit/95a04092be8b38b66a5b6e0c6fd516261991da90) - [@N1MBER](https://github.com/N1MBER)
- [chore(storybook): chage publick url (#2204)](https://github.com/consta-design-system/uikit/commit/16756a016cd920e03097bd9198067cf2e4caa967) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.18.3 (06/04/2022)
Самое важное:
- В `DatePicker` добавлен новый тип `time` — когда нужно указать только время.
- Добавили в документацию к компонентам `ChoiceGroup`, `Card`, `Button `раздел по адаптивности. Постепенно добавим такой раздел во все компоненты. 
- Теперь если во всплывающие окна (к примеру, `Modal`) положить компоненты с всплывающими окнами (к примеру, `Select`), то `Select` будет всегда выше по `zIndex`, даже если в `Modal` указали свой `zIndex`.

---

- [docs(common): change links to vercel (#2199)](https://github.com/consta-design-system/uikit/commit/03c0113b8e80cd0f7decce33b588a5777ebc9a2a) - [@arhayka](https://github.com/arhayka)
- [feat(Combobox): hide label for not found while items list is empty (#2181)](https://github.com/consta-design-system/uikit/commit/bee7232f6c693ee9ccffb2263fb271e1ee8fdd2e) - [@karpovfv](https://github.com/karpovfv)
- [feat(DatePicker): added type time (#2174)](https://github.com/consta-design-system/uikit/commit/09ccf9cd26a827f71ac14c45dbb512b287420208) - [@gizeasy](https://github.com/gizeasy)
- [docs(ContextMenu): fix examples (#2188)](https://github.com/consta-design-system/uikit/commit/43ae44bb1acb44e18db44aef7613e4bafaa0ecce) - [@arhayka](https://github.com/arhayka)
- [docs(ChoiceGroup): add adaptive section (#2186)](https://github.com/consta-design-system/uikit/commit/d3d5cebfd0ac626ea6116d09afb9b7c8668155bd) - [@arhayka](https://github.com/arhayka)
- [feat(PortalWithTheme): zIndex processing added (#2191)](https://github.com/consta-design-system/uikit/commit/d2942420986d1537105dd2e2cde15a983bb8cf40) - [@gizeasy](https://github.com/gizeasy)
- [docs(Card): add adaptive section (#2184)](https://github.com/consta-design-system/uikit/commit/c2e199616357790e7053db3ec60a7e54ee6d68a6) - [@arhayka](https://github.com/arhayka)
- [docs(Button): add adaptive section (#2182)](https://github.com/consta-design-system/uikit/commit/4b872f338bc2da5f48a1a2cc46ea4c10fbccc27a) - [@arhayka](https://github.com/arhayka)
- [fix(ContextMenuCanary): fix timeout on close inner levels (#2173)](https://github.com/consta-design-system/uikit/commit/62d6c20f66ea2015a618dcfe80b49a0a7739d2b1) - [@N1MBER](https://github.com/N1MBER)
- [fix(Pagination): remove usePropsHandler](https://github.com/consta-design-system/uikit/commit/911f3e54ea85ec5a6a0b665a9d278bfe833c6ec0) - [@gizeasy](https://github.com/gizeasy)
- [chore(deploy): edit public path (#2179)](https://github.com/consta-design-system/uikit/commit/955a0fc47c33ddcfef75cefb313e7ba359e2de2d) - [@gizeasy](https://github.com/gizeasy)
- [chore(deploy): conditional comment on a pull request (#2176)](https://github.com/consta-design-system/uikit/commit/8bddc476e4b2361888a50d61679c8b9883cf3418) - [@gizeasy](https://github.com/gizeasy)
- [test(ContextMenuCanary): add tests to ContextMenuCanary (#2175)](https://github.com/consta-design-system/uikit/commit/254639c3428eb47ed74604061871202ddeb4684f) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.18.2 (30/03/2022)
- [fix(Pagination): conditional rendering moved to the bottom (#2167)](https://github.com/consta-design-system/uikit/commit/530c2e9facdf821af0cdf195e2a701435deec398) - [@gizeasy](https://github.com/gizeasy)
- [chore(deploy): add deploy automatization (#2166)](https://github.com/consta-design-system/uikit/commit/2d051e3578d5cbf0317b96ef8b3b28750dea5400) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.18.1 (23/03/2022)
Самое важное:
- в `Select`, `Combobox`, `UserSelect` добавили индикатор загрузки (`isLoading`)
- в `Combobox`, `UserSelect`  добавили возможность получить значение вводимого текста в поле ввода (`onInputChange`)
- добавили иконки социальных сетей
- в `EventInterceptor` добавили поддержку всех компонентов, теперь можно подписаться на все компоненты.
---

- [ feat(cnMixPopoverAnimate): add animation to many components which use Popover component (#2109)](https://github.com/consta-design-system/uikit/commit/7ba359ce6ce41434c33c79d047d13ba00b8a0fae) - [@N1MBER](https://github.com/N1MBER)
- [chore(deps): bump shelljs from 0.8.4 to 0.8.5 (#1933)](https://github.com/consta-design-system/uikit/commit/f688d2140d99da04bb021bf1acd5d0f6a2d887b8) - [@dependabot](https://github.com/dependabot[bot])
- [chore(deps): bump url-parse from 1.5.7 to 1.5.10 (#2084)](https://github.com/consta-design-system/uikit/commit/ec533ef734ee90a3b2c9c7c63886bc276e27d0f0) - [@dependabot](https://github.com/dependabot[bot])
- [feat(Selectors): add isLoading and onInputChange props (#2127)](https://github.com/consta-design-system/uikit/commit/49ea2b6f6e76d87868a78a9a7384a4afb915628f) - [@N1MBER](https://github.com/N1MBER)
- [feat(Icons): add new icons for social (#2146)](https://github.com/consta-design-system/uikit/commit/f4bc4c4cfe7d3e219947115ef67a757831e94324) - [@N1MBER](https://github.com/N1MBER)
- [docs(common): add images to review, components, repos and figma libraries (#2143)](https://github.com/consta-design-system/uikit/commit/4c203aaa1029172a993358e87d2a46a2b3803ac2) - [@arhayka](https://github.com/arhayka)
- [fix(ContextMenu): fixed calculate zIndex (#2136)](https://github.com/consta-design-system/uikit/commit/667200a7c1d6c6783e1d26a31c3be2db96bc1d39) - [@gizeasy](https://github.com/gizeasy)
- [fix(Radio): add new prop inputId to Checkbox and Radio (#2142)](https://github.com/consta-design-system/uikit/commit/6df6e9ff87b9851ea95b8117b25bdac28a12c9fa) - [@N1MBER](https://github.com/N1MBER)
- [feat(EventInterceptor): connect other components to EventInterceptor (#2137)](https://github.com/consta-design-system/uikit/commit/37eb2f5dd0e2350a0e97e7f01c4585b9b9fed005) - [@N1MBER](https://github.com/N1MBER)
- [fix(ThemeToggler): add reexport types (#2145)](https://github.com/consta-design-system/uikit/commit/fd266c2085a949f19e3af998ecf869fa6e2ba671) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.18.0 (16/03/2022)
Самое важное:
- Выпустили обновленный `ContextMenu` (с флагом `Canary`) — добавлена  анимация появления и геттеры теперь не обязательны.
- Сделали миксин `MixPopoverArrow` для добавления уголка к всплывающим окнам
- В `ThemeToggler` геттеры теперь не обязательны
- В `EventInterceptor` появилась возможность подписаться на события компонентов `Tag` и `Card`

---

- [ feat(ContextMenuCanary): rewrited and updated ContextMenu (#2079)](https://github.com/consta-design-system/uikit/commit/c37e9efe64e7b2927a180425a98f419c8b295d42) - [@N1MBER](https://github.com/N1MBER)
- [ feat(EventInterceptor): add Tag and Card to EventInterceptor (#2128)](https://github.com/consta-design-system/uikit/commit/ffcbe2badd8896e1523aa0a5dbd4a9e883988f0c) - [@N1MBER](https://github.com/N1MBER)
- [feat(MixPopoverArrow): add new mixin (#2129)](https://github.com/consta-design-system/uikit/commit/d2012783bce6c887cebf0dd68d5998bc4551fba2) - [@N1MBER](https://github.com/N1MBER)
- [feat(ThemeToggler): rewrite examples, doc and component with getters (#2105)](https://github.com/consta-design-system/uikit/commit/daec7b0a6625b678979808701ffdafe58e94be5d) - [@N1MBER](https://github.com/N1MBER)
- [chore(CODEOWNERS): edit (#2135)](https://github.com/consta-design-system/uikit/commit/e00ed728e7a6f44622c08f3460b2da155d87c7d8) - [@gizeasy](https://github.com/gizeasy)
- [docs(principles): add doc (#2104)](https://github.com/consta-design-system/uikit/commit/8843535c6a2ad6ecebc1b41c19a020ccaae6a42c) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.17.3 (10/03/2022)
- [fix(Select): fix width (#2113)](https://github.com/consta-design-system/uikit/commit/0eb45830884cc2e4aa73dcdaa2127d0b919011e7) - [@N1KN](https://github.com/N1KN)
- [fix(SideBar): fix pointer-events (#2107)](https://github.com/consta-design-system/uikit/commit/f6b7ac20991df669128787e49f23e0e5dfe217cb) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.17.2 (04/03/2022)
- [fix(Tooltip): fixed position (#2110)](https://github.com/consta-design-system/uikit/commit/a73c95ca2aac29c0c6ff2c2424c0aff5e3868925) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.17.1 (02/03/2022)
Самое важное:
- В `Popover` расширили свойство offset, теперь можно указывать размеры, базирующиеся на теме.
- В `Table` доработали расчет ширины колонок.

---

- [ fix(Table): fix bug with column width (#2051)](https://github.com/consta-design-system/uikit/commit/8c6d8593891e3bb7ae24c67903ed64a9af611c89) - [@N1MBER](https://github.com/N1MBER)
- [feat(Popover): rewrite offset type (#2080)](https://github.com/consta-design-system/uikit/commit/4105c10895cbd66f67277897034d76de9513bc2c) - [@N1MBER](https://github.com/N1MBER)
