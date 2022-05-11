# Changelog

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

--------------------

## v3.17.0 (24/02/2022)
Самое важное:
- Добавлена возможность указывать кастомный тип `Item` для `SnackBar`
- Добавлены новые иконки
- Доработана документация
---

- [docs(Selects): edit text (#2082)](https://github.com/consta-design-system/uikit/commit/943477417ea49e3590b92a4999c7dd8b5c9d62db) - [@arhayka](https://github.com/arhayka)
- [docs(fix link to the Table): (#2081)](https://github.com/consta-design-system/uikit/commit/a0d54d0ab48441502be42e925b0b9d8f089d2269) - [@arhayka](https://github.com/arhayka)
- [chore(deps): bump url-parse from 1.5.3 to 1.5.7 (#2073)](https://github.com/consta-design-system/uikit/commit/979d962af025b7d9864a45b037a1c8d398e12e56) - [@dependabot[bot]](https://github.com/dependabot[bot])
- [feat(icon): add new icons (#2076)](https://github.com/consta-design-system/uikit/commit/a4ec03c929ecbc003549371f0fe45d399360156d) - [@kolebayev](https://github.com/kolebayev)
- [fix(CssTransition): fix warning with finDOMNode in Transaction children (#2072)](https://github.com/consta-design-system/uikit/commit/766daf499c847fbf9760b5754f1884a6e5820138) - [@N1MBER](https://github.com/N1MBER)
- [refactor(SnackBar): add other props for detecting item props and also update doc (#2032)](https://github.com/consta-design-system/uikit/commit/fa52bf026c3743c609ea508e0d4c6b5e8468dcf1) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.16.0 (16/02/2022)
Самое важное:

- в `DatePicker` добавили новый тип `date-time-range` (выбор периода дат с временем)
- `DatePicker` стал стабильнее, добавили тесты
- в `Select` теперь можно указать текст, который будет выводиться, если нет ни одной опции для выбора
- в `TextField` теперь можно указывать шаги массивом чисел
- добавили документацию по хукам `useRefs`, `useHideElementsInLine` и миксину `MixPopoverAnimate`
- в документацию для дизайнеров добавили раздел "Контрибьюторам" — для тех, кто хочет в развитии дизайн-системы
---

- [docs(MixPopoverAnimate): add docs (#2055)](https://github.com/consta-design-system/uikit/commit/db2c8832881379b88f5a21e94785c90b4105c03b) - [@arhayka](https://github.com/arhayka)
- [docs(TextField): edit docs: steps, min, max (#2060)](https://github.com/consta-design-system/uikit/commit/5afe9ad2094c75ea2d5259e902d38ca4e67a6cf6) - [@arhayka](https://github.com/arhayka)
- [docs(useHideElementsInLine): add docs (#2058)](https://github.com/consta-design-system/uikit/commit/0c6c7575c13350705c2b3ac7343cbb4781f94baa) - [@gizeasy](https://github.com/gizeasy)
- [docs(useRefs): add docs (#2053)](https://github.com/consta-design-system/uikit/commit/a55943f0457bac07defe27f9b61c7a8da6ad3bfd) - [@arhayka](https://github.com/arhayka)
- [feat(DatePicker): add date-time-range type (#2054)](https://github.com/consta-design-system/uikit/commit/04d1b38fed1edf39be4b025894ff79ed281887e3) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): bump ajv from 6.12.2 to 6.12.6 (#2052)](https://github.com/consta-design-system/uikit/commit/67bf0290a9be76137812d22536b1c8cbc6098ddb) - [@dependabot](https://github.com/dependabot[bot])
- [fix(useSelect): fix bug with Uncaught TypeError (#2047)](https://github.com/consta-design-system/uikit/commit/65f7cf10e41adb7982d19226bbe40346e9316c68) - [@N1MBER](https://github.com/N1MBER)
- [feat(Selects): add prop labelForEmptyItems (#2046)](https://github.com/consta-design-system/uikit/commit/f77d6b2fc97d46671b1e19abd5223524d0c5925f) - [@N1MBER](https://github.com/N1MBER)
- [feat(TextField): add step array to textfield props (#1926)](https://github.com/consta-design-system/uikit/commit/0c24f3e76835def89ff973e4f759dd52f96b3d94) - [@N1MBER](https://github.com/N1MBER)
- [fix(useTimer): fix bug with memory leak (#2048)](https://github.com/consta-design-system/uikit/commit/9b02c336bc174398077e15ff7d9281219e933733) - [@N1MBER](https://github.com/N1MBER)
- [test(DatePicker): add tests (#2050)](https://github.com/consta-design-system/uikit/commit/e175753c33e0b89f231ab947ba477c36e99c51ff) - [@gizeasy](https://github.com/gizeasy)
- [feat(docs): add design contributing docs (#2039)](https://github.com/consta-design-system/uikit/commit/260be28aba02b2c17e18a36aed41b71cce8a5203) - [@kolebayev](https://github.com/kolebayev)

--------------------

## v3.15.1 (09/02/2022)
Самое важное:

- `DateTime`, обновлены тесты
- Обновлена докуменация
- Исправлены мелкие недочеты

--- 

- [docs(TextField): add autoComplit to the props table (#2040)](https://github.com/consta-design-system/uikit/commit/3c1e56e9ec5b32e82186d8bf01785f3f7501683a) - [@arhayka](https://github.com/arhayka)
- [docs(Responces): add ResponsesExit to the docs (#2038)](https://github.com/consta-design-system/uikit/commit/3609a932fe231d3bd4016dc58f8afdf66b38562b) - [@arhayka](https://github.com/arhayka)
- [test(DateTime): add tests (#2037)](https://github.com/consta-design-system/uikit/commit/28133c0531cbef19e61d26d24f06cbdb17850473) - [@gizeasy](https://github.com/gizeasy)
- [docs(Icons): add create icons page (#2023)](https://github.com/consta-design-system/uikit/commit/50dcfe357f57bd224a60d2e5d71186f13d29539e) - [@arhayka](https://github.com/arhayka)
- [docs(Breadcrumbs): edit docs (#2022)](https://github.com/consta-design-system/uikit/commit/a11dbcd3cecb33cb311e1c41df3704b6c621a449) - [@gizeasy](https://github.com/gizeasy)
- [refactor(DateTime): small code change (#2036)](https://github.com/consta-design-system/uikit/commit/41fc55023cec03a149915a2ade8b23b962632f78) - [@gizeasy](https://github.com/gizeasy)
- [fix(Storybook): fixed link to Skeleton (#2021)](https://github.com/consta-design-system/uikit/commit/1fe1b336ee55f7028ccc3cea84b1123a01d4c311) - [@gizeasy](https://github.com/gizeasy)
- [fix(ContextMenuItem): fix cascading styles (#2020)](https://github.com/consta-design-system/uikit/commit/5093c47d3c07f68abf9e2175d3f626c8054184d9) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.15.0 (02/02/2022)
Самое важное:

- научили `Breadcrumbs` адаптироваться к ширине контейнера: теперь хлебные крошки красиво сворачиваются до многоточия  или прокручиваются (это можно настроить)
- в `SnackBar`  добавили линейный таймер
- в `ContextMenu` — поддержкау `ref`
- в `Responses` появилась новая иллюстрация
- добавили `MixDropdownAnimate`, миксин для анимации всплывающих окон
- и ещё всякое по мелочи.

---

- [docs(repos): add templates (#2017)](https://github.com/consta-design-system/uikit/commit/e28c27534a49aa9be51b51e1b0b4237312edd2ef) - [@arhayka](https://github.com/arhayka)
- [feat(Breadcrumbs): add props fitMode and lastItemIsLink (#2009)](https://github.com/consta-design-system/uikit/commit/a14df2bde5853337b6ce8e7827ccff2ebe726689) - [@gizeasy](https://github.com/gizeasy)
- [feat(SnackBar): add progress line timer (#1978)](https://github.com/consta-design-system/uikit/commit/56691134fedae9494c86cd1f7d33d3900ebfc6ef) - [@N1MBER](https://github.com/N1MBER)
- [feat(TextField): add new type for autoComplete on TextField (#1994)](https://github.com/consta-design-system/uikit/commit/b143f5c90a6da5811efd97ec5ae3318c577eff10) - [@N1MBER](https://github.com/N1MBER)
- [feat(ContextMenu): add ref for component (#2008)](https://github.com/consta-design-system/uikit/commit/afc39eb3c3f5089498fbb5aefc925085c159317f) - [@gizeasy](https://github.com/gizeasy)
- [feat(MixDropdownAnimate): add mix  (#2007)](https://github.com/consta-design-system/uikit/commit/c66fc3546bd87bd3aba15333bd765aa9edebf3e2) - [@gizeasy](https://github.com/gizeasy)
- [feat(useHideElementsInLine): add hook (#2006)](https://github.com/consta-design-system/uikit/commit/e10c1f996f142d4d8ab6e1909a1ef66bafd09d56) - [@gizeasy](https://github.com/gizeasy)
- [feat(useRefs): add hook useRefs (#2005)](https://github.com/consta-design-system/uikit/commit/01fdc8b03b1f3fbf420955e884b18ff38fb848ee) - [@gizeasy](https://github.com/gizeasy)
- [docs(common): edit links to github (#1998)](https://github.com/consta-design-system/uikit/commit/43dd100026a67dc42d594ed7c61596ffef992e6a) - [@arhayka](https://github.com/arhayka)
- [docs(DatePicker): edit docs (#1997)](https://github.com/consta-design-system/uikit/commit/f22b08b40490e6ab76ab2621e6f298737cc2f645) - [@arhayka](https://github.com/arhayka)
- [feat(ResponsesExit): add new response image (#1995)](https://github.com/consta-design-system/uikit/commit/727c52318ca4d93d46ddb70eac72dd9a1d9fa6d7) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.14.0 (26/01/2022)
Самое важное:
- в `DatePicker` добавили тип `'date-time'` и возможность добавления своих контролов
- обновили иконки
- в `Table` добавили возможность подписки на клик по ячейке
- обновили документацию

---


- [feat(DatePicker) add date-time type (#1984)](https://github.com/consta-design-system/uikit/commit/9aff4ba09a09c367303caa831194b6e380f0d995) - [@gizeasy](https://github.com/gizeasy)
- [feat(components): improvement zIndex API (#1980)](https://github.com/consta-design-system/uikit/commit/b9c93262fff3b37bc328eb6da80566ee4604b053) - [@gizeasy](https://github.com/gizeasy)
- [fix(Slider): removed warnings about required keys (#1981)](https://github.com/consta-design-system/uikit/commit/dd577d57c08ae5c641e3e10abe398e1fd32d2dbc) - [@gizeasy](https://github.com/gizeasy)
- [docs(review): add images for charts & section (#1971)](https://github.com/consta-design-system/uikit/commit/8bb01196bc0b548912c22f0a233d10bcca948aa3) - [@arhayka](https://github.com/arhayka)
- [fix(Table): fix bug with render function (#1979)](https://github.com/consta-design-system/uikit/commit/bcfa9bec719ecf864b2acc1a98d9b3c2c675afef) - [@N1MBER](https://github.com/N1MBER)
- [feat(icon): add new icons (#1970)](https://github.com/consta-design-system/uikit/commit/6a25de0181a0c583f3b61f2f6dfb750f845ea387) - [@hell0anna](https://github.com/hell0anna)
- [docs(import): add import react to all missing examples (#1969)](https://github.com/consta-design-system/uikit/commit/1e06364a76266f85698b3290d680cb19a88c484e) - [@N1MBER](https://github.com/N1MBER)
- [feat(Table): added handle click and contextmenu click in table cell (#1983)](https://github.com/consta-design-system/uikit/commit/9fdd4017477f4f99cf9ebbacd8a5dbce25ab0ab0) - [@SergeyKatugin](https://github.com/SergeyKatugin)
- [feat(DatePicker): add addtional controls to datepicker / dateTime (#1882)](https://github.com/consta-design-system/uikit/commit/ea1aa86877110aba5821833959912db8f228126f) - [@N1MBER](https://github.com/N1MBER)
- [chore(CODEOWNERS): update](https://github.com/consta-design-system/uikit/commit/b0b3b7dd215e81f0c05d26ea611204b11ffc88dd) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.13.0 (19/01/2022)
Выкатили обновления, вот самое важное:

- сделали новый `Breadcrumbs` (пока в статусе Canary),
- исправили ошибку в `DatePicker`, теперь с якорем, к которому цепляется Popover, всё в порядке,
- и немного улучшили документацию.

Чуть не забыли: наши репозитории переехали в новый спейс, теперь всё [тут](https://github.com/consta-design-system)

Не потеряйте нас :)

---

- [docs(DepricatedCoponents): removed from documentation (#1965)](https://github.com/consta-design-system/uikit/commit/f2ee18cd5fe8dce562eb253077c8ca7db51e9bb1) - [@gizeasy](https://github.com/gizeasy)
- [feat(BreadcrumbsCanary): add component (#1931)](https://github.com/consta-design-system/uikit/commit/c255909bfe43342e1925e31c5c5f97460d286fcb) - [@gizeasy](https://github.com/gizeasy)
- [fix(DatePicker): fix bug with incorrect popover position (#1932)](https://github.com/consta-design-system/uikit/commit/c895916796b6ad1231328f0d76fce0e8874d6ede) - [@N1MBER](https://github.com/N1MBER)
- [refactor(mixCard): added usage of cnMixSpace for padding (#1927)](https://github.com/consta-design-system/uikit/commit/9fb738dab23ff98778d2ef7203ee3b7ef1995b5a) - [@N1MBER](https://github.com/N1MBER)
- [docs(Sidebar): docs review (#1919)](https://github.com/consta-design-system/uikit/commit/1fd9e328095c24cd752454caee73aee472dc6bbe) - [@arhayka](https://github.com/arhayka)
- [docs(ThemeToggler): docs review (#1914)](https://github.com/consta-design-system/uikit/commit/93a4533176d4f3aaa2f8c3d3c6a5a1424bd3b05c) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.12.4 (12/01/2022)
- адаптировали `Slider` для мобильных устройств
- доработали документацию

---

- [docs(Badge): docs review (#1909)](https://github.com/gazprom-neft/consta-uikit/commit/814a1ecec3feb766c20dba5a6bffbda987ea41fa) - [@arhayka](https://github.com/arhayka)
- [docs(Popover): docs review (#1912)](https://github.com/gazprom-neft/consta-uikit/commit/8d9dca5b476aa964ffa43f3fc9c7ebfddb930a78) - [@arhayka](https://github.com/arhayka)
- [docs(Loader): docs review (#1913)](https://github.com/gazprom-neft/consta-uikit/commit/202c8e5175aee3719ab2b27ea081aee4191cec0c) - [@arhayka](https://github.com/arhayka)
- [docs(ProgressSpin): docs review (#1915)](https://github.com/gazprom-neft/consta-uikit/commit/a65ea44190987be5ea0a9eed8e79261d9f55a52a) - [@arhayka](https://github.com/arhayka)
- [docs(Responses): docs review (#1916)](https://github.com/gazprom-neft/consta-uikit/commit/e3bfbebad05f1f72b2dad72a814daa3dfeafaf9f) - [@arhayka](https://github.com/arhayka)
- [docs(SnackBar): docs review (#1917)](https://github.com/gazprom-neft/consta-uikit/commit/e681f982c4e11acc85955706533b14ab0f33016f) - [@arhayka](https://github.com/arhayka)
- [docs(Timer): docs reivew (#1918)](https://github.com/gazprom-neft/consta-uikit/commit/618dea0861e8031ecb30802ad43b1183aa665133) - [@arhayka](https://github.com/arhayka)
- [fix(Slider): fix bug with non working mobile mode (#1900)](https://github.com/gazprom-neft/consta-uikit/commit/01bf0d7e470e208762fb1d2874b2cfe066231a24) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.12.3 (29/12/2021)
- [fix(MixCard): fix  mistakes in stylesheet file (#1889)](https://github.com/gazprom-neft/consta-uikit/commit/070b7b2589b11e520bc5ca079fe385f31a411ea7) - [@N1MBER](https://github.com/N1MBER)
- [docs(review): add images (#1894)](https://github.com/gazprom-neft/consta-uikit/commit/7c34f9aefd50a1904b602f3da42cdb0ebc1c199c) - [@arhayka](https://github.com/arhayka)
- [docs(common): write docs about new components creation (#1871)](https://github.com/gazprom-neft/consta-uikit/commit/5db2b97ddcd2bb028db4200e191fbd7b85ee3b98) - [@arhayka](https://github.com/arhayka)
- [docs(global): review docs structure (#1879)](https://github.com/gazprom-neft/consta-uikit/commit/28450362b5ca79664bad6eb3ce4de33758f49fe3) - [@arhayka](https://github.com/arhayka)
- [feat(DatePicker): add label and caption props, update docs and playground (#1876)](https://github.com/gazprom-neft/consta-uikit/commit/5eb6952506e5066f7b176f1612707f698d292cc7) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.12.2 (22/12/2021)
- [docs(Table): edit docs, add examples (#1864)](https://github.com/gazprom-neft/consta-uikit/commit/58c88be03d1699c4331095dafcf9c83114769445) - [@arhayka](https://github.com/arhayka)
- [fix(Theme): fixed --line-height-text-2xs (#1870)](https://github.com/gazprom-neft/consta-uikit/commit/6eab23112af357fce46ee6a415d1b824fc130704) - [@gizeasy](https://github.com/gizeasy)
- [fix(SnackBar): fix warning with findDOMNode (#1867)](https://github.com/gazprom-neft/consta-uikit/commit/6320f47055018b20a854f76b203939a1ccb02d8a) - [@N1MBER](https://github.com/N1MBER)
- [refactor(Checkbox): edit code (#1868)](https://github.com/gazprom-neft/consta-uikit/commit/5f2d43f178676ba94aa0aeb9aab9556047ffd6dd) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.12.1 (17/12/2021)
- [docs(global): add import field to all components and fix mistakes (#1865)](https://github.com/gazprom-neft/consta-uikit/commit/54fa15bbd9527e92f73841740b8488b9aaa72ee8) - [@N1MBER](https://github.com/N1MBER)
- [fix(ProgressStepBar): fixed icon render](https://github.com/gazprom-neft/consta-uikit/commit/c6cdded99572b9cfe769bde603ecdd6ee5aa6c9b) - [@gizeasy](https://github.com/gizeasy)
- [docs(useBreakpoints): edit docs (#1863)](https://github.com/gazprom-neft/consta-uikit/commit/fff37e78ba85ade4f2d1b638003242a5f7f39636) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.12.0 (15/12/2021)
- Добавили хук `useBreakpoints` для подписки на изменение `breakpoints`
- Иконки теперь умеют возвращать `ref`
- В `MixSpace` добавили новые значения модификаторов
- Доработали документацию

---

- [docs(useBreakpoints): add docs](https://github.com/gazprom-neft/consta-uikit/commit/656502fc8396f1e6d88371a946ed1ee3be131e89) - [@gizeasy](https://github.com/gizeasy)
- [feat(useBreakpoints): add hook useBreakpoints](https://github.com/gazprom-neft/consta-uikit/commit/8efa228a2ce57e1e981c3fc0ad09407fb6a64f68) - [@gizeasy](https://github.com/gizeasy)
- [fix(TextField): fix bug with non-working autofocus (#1855)](https://github.com/gazprom-neft/consta-uikit/commit/15bf72198baa6e66a9e015019ea512551e80b2a3) - [@N1MBER](https://github.com/N1MBER)
- [docs(Informer): docs review (#1845)](https://github.com/gazprom-neft/consta-uikit/commit/01d93f3cbec3a93ad4008754fc03e315057b6b14) - [@arhayka](https://github.com/arhayka)
- [docs(Collapse): docs review (#1846)](https://github.com/gazprom-neft/consta-uikit/commit/27f543bc5f191a1a0c960e446d39f1b3f915eac7) - [@arhayka](https://github.com/arhayka)
- [refactor(Icon): refactor createIcon, types, types in docs](https://github.com/gazprom-neft/consta-uikit/commit/6a8c18a5cb720401bc0ad1984acb3cb576115254) - [@gizeasy](https://github.com/gizeasy)
- [feat(Icon): createIcon return component can hold ref;](https://github.com/gazprom-neft/consta-uikit/commit/dcc5647bbd31fa22a24584a716bc609efbe1f2b3) - [@levi2ki](https://github.com/levi2ki)
- [feat(MixSpace): add new values for padding & margin (#1844)](https://github.com/gazprom-neft/consta-uikit/commit/7fcc5a635278c245578d7fc97a02a26a93cb7beb) - [@N1MBER](https://github.com/N1MBER)
- [feat(ContextMenu): added getItemAs and getItemHTMLAttributes (#1848)](https://github.com/gazprom-neft/consta-uikit/commit/7afb10808bc6f105724c0ec8dcbfedaf45c0885e) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.11.0 (08/12/2021)
Ура! Добавили `Slider` , его можно двигать и выбирать значение (слайдер 🔥🔥🔥, но вы проверьте :)

И ещё по мелочи:
⁃ сделали адаптивными `ProgressStepBar` и `Steps`,
⁃ добавили в таблицу возможность применить свой CSS-класс к любой ячейке,
⁃ исправили баг с undefined в `eventInterceptionMap` в ключах объекта,
⁃ обновили документацию по `UserSelect` и `Attachment`.

---

- [feat(Slider): add new component (#1726)](https://github.com/gazprom-neft/consta-uikit/commit/c641d23d5ddb8ed9a846696bacdaf37d9efe4a58) - [@N1MBER](https://github.com/N1MBER)
- [feat(components): add adaptivity for ProgressStepBar and Steps (#1791)](https://github.com/gazprom-neft/consta-uikit/commit/d0f87aeb7ec71eb0edf9fd8b31966aaa8aee09d8) - [@N1MBER](https://github.com/N1MBER)
- [docs(UserSelect): docs review (#1834)](https://github.com/gazprom-neft/consta-uikit/commit/675994f8659dcc87e2b6b959e4a823b6c319d3a4) - [@arhayka](https://github.com/arhayka)
- [docs(Attachment): docs review (#1835)](https://github.com/gazprom-neft/consta-uikit/commit/ca2187bd581f079e044972626c5d98d1d9664220) - [@arhayka](https://github.com/arhayka)
- [docs(units): remove slash before $ (#1803)](https://github.com/gazprom-neft/consta-uikit/commit/6b1fc7f48b8dfbf3b3b37204dafe58283354d7f0) - [@arhayka](https://github.com/arhayka)
- [feat(ProgressStepBar): change example on playground and also change label prop to optional (#1816)](https://github.com/gazprom-neft/consta-uikit/commit/6ee0d18ff79fcb5d63c82fd52abe3fbb47fe684c) - [@N1MBER](https://github.com/N1MBER)
- [feat(components): added getConditionalClassName prop to Table (#1789)](https://github.com/gazprom-neft/consta-uikit/commit/6ed65dae14eecee1afc9bcd383b1a9edc323302f) - [@ndrzhn](https://github.com/ndrzhn)
- [fix(EventInterceptor): fixed import loop in eventInterceptorMap (#1830)](https://github.com/gazprom-neft/consta-uikit/commit/c2bc7fc241d7d037978454a08c4b5840d51f1646) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.10.0 (01/12/2021)
- В `ContextMenu` добавили свойство `onItemClick`, для более удобной обработки клика по элементам
- `ChoiceGroup`, теперь свойство `multiple` не обязательное
- Изменили зависимость `react` в `peerDependencies` так чтобы `npm@7` не ругался если версия мажерная версия react выше чем 16, при сборке ваших проектов.
- Добавили `MixSpace` для быстрой простановки отступов

---

- [docs(workflow): add workflow description (#1688)](https://github.com/gazprom-neft/consta-uikit/commit/1b530c106e76c017f6eb5deee5e66081dc019f79) - [@arhayka](https://github.com/arhayka)
- [feat(ContextMenu): add onClick properties (#1787)](https://github.com/gazprom-neft/consta-uikit/commit/30c4bd272571a5b7addd87cc726e34315108d43a) - [@N1MBER](https://github.com/N1MBER)
- [fix(ChoiceGroup): fixed multiple type (#1817)](https://github.com/gazprom-neft/consta-uikit/commit/ec34946a006a5317e9e8e3b65477dffd28deb37e) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): change peerDependencies (#1815)](https://github.com/gazprom-neft/consta-uikit/commit/73ae3e46c4663f1eb79dba5420293db07a879a93) - [@gizeasy](https://github.com/gizeasy)
- [docs(review): add component images, fix misprints (#1814)](https://github.com/gazprom-neft/consta-uikit/commit/0e901320582217251960f38a40ba4cf968c705a2) - [@arhayka](https://github.com/arhayka)
- [docs(MixSpace): edit docs, add examples (#1812)](https://github.com/gazprom-neft/consta-uikit/commit/ea57cd870f350c6f08bc18e6c391afef13a82ce0) - [@arhayka](https://github.com/arhayka)
- [fix(Button): add inner ref (#1811)](https://github.com/gazprom-neft/consta-uikit/commit/24ee305acf60f569050944b54d72797db9729c8d) - [@iliasov-artem](https://github.com/iliasov-artem)
- [fix(Theme): fix system colors (#1808)](https://github.com/gazprom-neft/consta-uikit/commit/8f1b175fc55fc0e7f6f330f5833e728026bb0bf2) - [@N1MBER](https://github.com/N1MBER)
- [refactor(getSizeByMap): rename from getSizeByMap to  getByMap (#1798)](https://github.com/gazprom-neft/consta-uikit/commit/86c55833973d55439acb6778c40ee7db9a0f558d) - [@N1MBER](https://github.com/N1MBER)
- [feat(SnackBar): add adaptivity for SnackBar (#1792)](https://github.com/gazprom-neft/consta-uikit/commit/6642676e9706cb06901c8688ec693a45c38798a7) - [@N1MBER](https://github.com/N1MBER)
- [fix(useSelect): fix bug with notFoundLabel (#1793)](https://github.com/gazprom-neft/consta-uikit/commit/1f1425e9eb9cfe97d0c04b7b4453954899237ea9) - [@N1MBER](https://github.com/N1MBER)
- [feat(MixSpace): add new mixin and documentation for him (#1776)](https://github.com/gazprom-neft/consta-uikit/commit/fa85cf1bdd74edcd81df8521ebf664a937a7dcdf) - [@N1MBER](https://github.com/N1MBER)
- [docs(TextField): fix examples code (#1785)](https://github.com/gazprom-neft/consta-uikit/commit/6e6b6ce3a7a285a817711e990c2e6edc7c6d4801) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.9.3 (17/11/2021)
Важное из изменений:
- В `Table` добавили возможность скрывать колонки
- Добавили в `Avatar` размер `L`
- Обновили документацию
- `Select` исправили критичный баг

---

- [docs(DateTime): edit docs, fix format (#1778)](https://github.com/gazprom-neft/consta-uikit/commit/f305f99c3e0febeb4c42fde1e2056c11331e08c5) - [@arhayka](https://github.com/arhayka)
- [docs(Avatar): add size L to docs (#1774)](https://github.com/gazprom-neft/consta-uikit/commit/780fe0258fc6afa0145e80794b141a12231897e5) - [@arhayka](https://github.com/arhayka)
- [docs(developer): add pages about design and code style (#1766)](https://github.com/gazprom-neft/consta-uikit/commit/ce7bed2918acf3d34f99867b67d256e854585ff3) - [@arhayka](https://github.com/arhayka)
- [docs(common): add components and images to review (#1773)](https://github.com/gazprom-neft/consta-uikit/commit/bb8d7800d608a8813cca3d27e783c001766d1855) - [@arhayka](https://github.com/arhayka)
- [docs(DatePicker): add note about this doc (#1777)](https://github.com/gazprom-neft/consta-uikit/commit/b313947c833f1f1217810fd12ed272b8fd02e8e5) - [@arhayka](https://github.com/arhayka)
- [fix(DatePicker): fixed bugs (#1771)](https://github.com/gazprom-neft/consta-uikit/commit/4e4aa55e013fc2f6723a4b7923833cefc30f9bda) - [@gizeasy](https://github.com/gizeasy)
- [fix(Select): fix bug with placeholder (#1759)](https://github.com/gazprom-neft/consta-uikit/commit/4aa9e146b307bd091a7da68c62894e947a2018a4) - [@N1MBER](https://github.com/N1MBER)
- [feat(EventInterceptor): add all props for analitic](https://github.com/gazprom-neft/consta-uikit/commit/0f702ef8469308dc60bc8f51971335df07c68d4f) - [@RuWolf](https://github.com/RuWolf)
- [feat(Avatar): add L size (#1760)](https://github.com/gazprom-neft/consta-uikit/commit/90e450d68b04b5ec0922cb7acd999aaebc94c505) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): bump ws from 5.2.2 to 5.2.3 (#1749)](https://github.com/gazprom-neft/consta-uikit/commit/daf297c71c9ef641a3a44db9d4c15a63ccab2d6e) - [@dependabot[bot]](https://github.com/dependabot[bot])
- [feat(Table): added hidden prop to table column (#1732)](https://github.com/gazprom-neft/consta-uikit/commit/09605ec9744428a1b8de4a158605e3660a2d3d86) - [@SergeyKatugin](https://github.com/SergeyKatugin)

--------------------

## v3.9.2 (10/11/2021)
Важное из обновления:
- Дополнили документацию по компонентам `ProgressStepBar` и `TextField`
- Добавили таблицу возможность указывать минимальную ширину столбца.
- Исправили баг с отображением "Не найдено" в `Combobox`

---
- [chore(storybook): automatic assembly of overview page (#1676)](https://github.com/gazprom-neft/consta-uikit/commit/cd5d4cf84b3f20f806345a211d8301f9a0c574ff) - [@gizeasy](https://github.com/gizeasy)
- [feat(Table): add minColumnWidth prop (#1727)](https://github.com/gazprom-neft/consta-uikit/commit/e9f8d2ca70779e11f38f147fe7490e475f794b1e) - [@vlzelensky](https://github.com/vlzelensky)
- [docs(TextField): review docs, add type=number (#1725)](https://github.com/gazprom-neft/consta-uikit/commit/3eeb425b7ac563f60c16071888d42af114340a8d) - [@arhayka](https://github.com/arhayka)
- [fix(Combobox): fix bug with notFoundLabel (#1728)](https://github.com/gazprom-neft/consta-uikit/commit/8857af9aced15b304a915778ff203abbbbbdbc98) - [@N1MBER](https://github.com/N1MBER)
- [fix(ContextMenu): edit getOnClick type (#1722)](https://github.com/gazprom-neft/consta-uikit/commit/000c969fb97c4ae45e265611119785e71f897b21) - [@gizeasy](https://github.com/gizeasy)
- [docs(ProgressStepBar): edit docs, add examples (#1703)](https://github.com/gazprom-neft/consta-uikit/commit/e0b1b91c27d52e838a16ba89eac883b68b54f097) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.9.1 (03/11/2021)
- [feat(Table): added control for table (#1716)](https://github.com/gazprom-neft/consta-uikit/commit/99d67aff670d2f499abcefc168eba73805ef3f16) - [@SergeyKatugin](https://github.com/SergeyKatugin)

--------------------

## v3.9.0 (27/10/2021)
В `TextField` добавили возможность очищать по крестику и при `type = number` теперь красивые стилизованные кнопочки. Так же обновлена документация и внесены фиксы в некоторые компоненты.

---

- [docs(componets): Add canary label (#1714)](https://github.com/gazprom-neft/consta-uikit/commit/ec1953ddfb58d8df696856a6056ece5e0d3cf613) - [@N1MBER](https://github.com/N1MBER)
- [feat(FieldLabel): add new prop 'required' (#1661)](https://github.com/gazprom-neft/consta-uikit/commit/813b371f93c7bf66f0e5356aece7cba065411b50) - [@N1MBER](https://github.com/N1MBER)
- [ feat(TextField): add custom arrows to type number (#1658)](https://github.com/gazprom-neft/consta-uikit/commit/c71bd7265a2bcd0ff880c868658cf17a66a5041d) - [@N1MBER](https://github.com/N1MBER)
- [feat(TextField): add button for cleaning (#1657)](https://github.com/gazprom-neft/consta-uikit/commit/5567ea2fb1a93cc86cef315ae4c10b5bbe605dab) - [@N1MBER](https://github.com/N1MBER)
- [docs(common): edit main page (#1698)](https://github.com/gazprom-neft/consta-uikit/commit/336c2b56f599366fdfb40d166c6c8cad092f7c5f) - [@arhayka](https://github.com/arhayka)
- [docs(useChoiceGroupIndexed): add docs (#1675)](https://github.com/gazprom-neft/consta-uikit/commit/9d8536abf43a6e0392422f2f876ec3ec78e6a688) - [@arhayka](https://github.com/arhayka)
- [ fix(Combobox): fix bug with labelForNotFound and add props to docs](https://github.com/gazprom-neft/consta-uikit/commit/8f49e3bbd5c82c7044372d7b357931d2a0000f66) - [@N1MBER](https://github.com/N1MBER)
- [fix(ProgressStepBar): fixed several bugs (#1699)](https://github.com/gazprom-neft/consta-uikit/commit/dfbb57572fb89767318d59528d6db59b7aceb36f) - [@gizeasy](https://github.com/gizeasy)
