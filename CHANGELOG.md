# Changelog

## v4.5.0 (30/11/2022)
Самое важное
- В Checkbox добавлены размеры `s` и `xs`
- В CheckboxGroup добавлены размеры `s` и `xs`
- В Table исправлен баг с неверным отображением бордера
- Доработана докуменация

---

- [docs(Theme): edit docs about fonts](https://github.com/consta-design-system/uikit/commit/9356c051873fb30ce9d10ec5f9e6b6416a69ef44) - [@gizeasy](https://github.com/gizeasy)
- [feat(CheckboxGroup): add s and xs sizes (#2800)](https://github.com/consta-design-system/uikit/commit/8ef40e4d65d0eac2f2e5a6073385119dfc3716ad) - [@gizeasy](https://github.com/gizeasy)
- [fix(Table): fix border on multi level header (#2797)](https://github.com/consta-design-system/uikit/commit/2f6a382b4e89a886f3b94e413bd36132df443e80) - [@N1MBER](https://github.com/N1MBER)
- [feat(Checkbox): add 's' and 'xs' size (#2790)](https://github.com/consta-design-system/uikit/commit/a4b50e6195682df18dbad13685d0c80a32f31d81) - [@N1MBER](https://github.com/N1MBER)
- [docs: add how to use tab (#2799)](https://github.com/consta-design-system/uikit/commit/4fe6084492db080c4f188152c16817a45f5dad5d) - [@arhayka](https://github.com/arhayka)
- [docs(useBreakpoints): edit doc (#2798)](https://github.com/consta-design-system/uikit/commit/afd6d2385a207545eb51c5b35e94d6bf6e5abce5) - [@arhayka](https://github.com/arhayka)

--------------------

## v4.4.0 (29/11/2022)
Самое важное:
- добавили `useComponentBreakpoints`, подписывается на изменение ширины компонента и возвращает набор акивных контрольных точек, в отличии от `useComponentSize` ререндр компонента происходит только при пересечении `breakpoint`, а не на каждый пиксель.
- Компонент `Collapse` научился высчитывать высоту контента, и добавили возможность ограничить высоту через свойство `maxContentHeeight`
- Исправили несколько багов

---

- [feat(useComponentBreakpoints): add hook (#2791)](https://github.com/consta-design-system/uikit/commit/62132a3204d98633c21bdac6fd7d7a5d732bed68) - [@gizeasy](https://github.com/gizeasy)
- [feat(Collapse): add content size tracking and new prop maxContentHeeight (#2789)](https://github.com/consta-design-system/uikit/commit/c0ca5bf355daa96563af03d1fda3107816ce8324) - [@N1MBER](https://github.com/N1MBER)
- [fix(DatePicker): fix labelPosition (#2787)](https://github.com/consta-design-system/uikit/commit/982386525b20cb096f2e7efb2b854934d7d7a1a7) - [@gizeasy](https://github.com/gizeasy)
- [fix(AutoComplete): fix size (#2786)](https://github.com/consta-design-system/uikit/commit/bbf5ac8b236914eb6e1265f83b3309d8ea9a57b1) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.3.1 (24/11/2022)
Самое важное:
- Исправили некорректную отрисовку линии в `ProgressLine`
- По многочисленным просьбам в `Table` добавили возможность объединения ячеек по горизонтали. 

---

- [chore(deps): update @consta/stand (#2777)](https://github.com/consta-design-system/uikit/commit/888e495363eb41c6244c693151904074dcce404d) - [@gizeasy](https://github.com/gizeasy)
- [docs(AvatarGroup): fix image (#2776)](https://github.com/consta-design-system/uikit/commit/420ab95dea840b04e1d373288bccf563e5ec3a9a) - [@gizeasy](https://github.com/gizeasy)
- [fix(Table): fix bug with closing collapse rows (#2771)](https://github.com/consta-design-system/uikit/commit/b7ef4913ea995897e4edf006691dee06520f0a08) - [@N1MBER](https://github.com/N1MBER)
- [feat(Table): add colSpan for columns and also add variants with examples (#2768)](https://github.com/consta-design-system/uikit/commit/38b2426ca1e0ac24d3459dbc6fc299a66cb66174) - [@N1MBER](https://github.com/N1MBER)
- [docs(autoComplete): add pic for review (#2765)](https://github.com/consta-design-system/uikit/commit/3685f0c028efa32e6db99ffa09ccbf17b2bd9667) - [@arhayka](https://github.com/arhayka)
- [fix(ProgressLine): fix bug of line width with gaps](https://github.com/consta-design-system/uikit/commit/8a9311bab76eecff120a692dc0ef904acb243d6d) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.3.0 (16/11/2022)
Самое важное:
- В `Collapse` в заголовок теперь можно передавать `ReactNode`
- В `SnackBar` появилась модификация `form`
- Доработана документация
- Исправлено несколько багов

---

- [feat(Collapse): rewrite label from string to ReactNode (#2733)](https://github.com/consta-design-system/uikit/commit/c68de442c6f49da5dba1410d526170ab0e3fcb63) - [@N1MBER](https://github.com/N1MBER)
- [fix(DateTime): fix padding for date-time view (#2748)](https://github.com/consta-design-system/uikit/commit/e916000929af021438058f05d2c7008d434fdbc4) - [@N1MBER](https://github.com/N1MBER)
- [feat(docs): add new tab (#2758)](https://github.com/consta-design-system/uikit/commit/24735054e19c9a25ed7699a47cd2e97f98f7ec3c) - [@gizeasy](https://github.com/gizeasy)
- [feat(SnackBar): add prop form (#2730)](https://github.com/consta-design-system/uikit/commit/dea0b8ddb1fac2054286e1ee8ec6f161e56a2562) - [@N1MBER](https://github.com/N1MBER)
- [fix(Table): fix 'level' accessor (#2732)](https://github.com/consta-design-system/uikit/commit/d2ac4002939a98e1f7cded31f372f93a1eaec023) - [@N1MBER](https://github.com/N1MBER)
- [docs(review): add images (#2735)](https://github.com/consta-design-system/uikit/commit/daae59b7d130faeca7f7da7ee1f6ffa442994857) - [@arhayka](https://github.com/arhayka)
- [fix(useChoiceGroup): fix bug with false type variable (#2746)](https://github.com/consta-design-system/uikit/commit/2ab5c307a3f390dd1f1da6b9a91eae7a30d9de7d) - [@N1MBER](https://github.com/N1MBER)
- [fix(Text): fix quotes in the examples (#2747)](https://github.com/consta-design-system/uikit/commit/31becf53273706cf4301d1e11ccc6a91559ff73f) - [@N1MBER](https://github.com/N1MBER)
- [docs: rm articles, links, version (#2725)](https://github.com/consta-design-system/uikit/commit/d3d9460984efaf3e7fb72ab9b08a8bc716103a37) - [@arhayka](https://github.com/arhayka)

--------------------

## v4.2.2 (02/11/2022)
Самое важное:
- Добавлена поддержка иконок из `@consta/icons`

---

- [feat(Icons): update types for usage icons from @consta/icons (#2726)](https://github.com/consta-design-system/uikit/commit/cdeedd5cd588a6cbab656fbeba946ccff1c284c5) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.2.1 (26/10/2022)
- [fix(selects): select, Combobox, UserSelect fixed dropdown](https://github.com/consta-design-system/uikit/commit/5fb149684e1e12d71088ce85164dba1eaeb7d248) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.2.0 (19/10/2022)
Самое важное:
- Добавили новый компонент — AutoComplete
- Исправили баг с репозицией ContextMenu
- Написали статью о том, как выбрать таблицу для проекта

---

- [docs(TableComparison): write how to choose table (#2710)](https://github.com/consta-design-system/uikit/commit/92507e66684bb46cb50ac6f3a6304400dd7ec2c6) - [@arhayka](https://github.com/arhayka)
- [feat(AutoComplete): add new Component (#2693)](https://github.com/consta-design-system/uikit/commit/6783a321481649eb60ac0aab81f00521c897d085) - [@N1MBER](https://github.com/N1MBER)
- [feat(Variants): add missing variants for components (#2676)](https://github.com/consta-design-system/uikit/commit/9c77708c93a033c9a5f163ecfbcd996300990b51) - [@N1MBER](https://github.com/N1MBER)
- [fix(ContextMenu): fixed reposition (#2706)](https://github.com/consta-design-system/uikit/commit/dc2331e67575816fece73d63db00f8d0f64b54a4) - [@gizeasy](https://github.com/gizeasy)
- [docs(Layout): fix border on layout examples (#2705)](https://github.com/consta-design-system/uikit/commit/0483b4018030a3cdfddbec2023b6a1385faba5f1) - [@N1MBER](https://github.com/N1MBER)
- [fix(Select): fix height of item with empty row (#2704)](https://github.com/consta-design-system/uikit/commit/0b6534a94b7e0ad1c0e60bb8f8c233b4bf39e145) - [@N1MBER](https://github.com/N1MBER)
- [docs(File): add block for extensions with icon (#2702)](https://github.com/consta-design-system/uikit/commit/380d1920a940ae542342fdd672a85e4a12ea5206) - [@N1MBER](https://github.com/N1MBER)
- [docs: version, links, readme (#2692)](https://github.com/consta-design-system/uikit/commit/d8bc024f3c67900f7e5c04d0763649ecd43e1341) - [@arhayka](https://github.com/arhayka)
- [chore(deps): update @consta/stand version (#2680)](https://github.com/consta-design-system/uikit/commit/0c112b270496d4979cf6cb93d2040c2f4b59857d) - [@gizeasy](https://github.com/gizeasy)

--------------------

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
