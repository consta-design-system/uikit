# Changelog

## v4.30.1 (27/09/2023)
- [fix(List): fixed background on ListItem (#3300)](https://github.com/consta-design-system/uikit/commit/6b87a1e491836354e17626440e8adcd14f2b414f) - [@gizeasy](https://github.com/gizeasy)
- [fix(Selects): fix render numbers value (#3297)](https://github.com/consta-design-system/uikit/commit/f129a3482476c59038252295f9a5853c203b12b2) - [@N1MBER](https://github.com/N1MBER)
- [fix(Button): property type set to all places (#3295)](https://github.com/consta-design-system/uikit/commit/ebec6dba46e0fcc789f0f5714348ab906bfb180d) - [@N1MBER](https://github.com/N1MBER)
- [docs(List): remove non exist field from documentation (#3296)](https://github.com/consta-design-system/uikit/commit/f70ea5167e2888489215f8336e7dd8cf9c2dc9d2) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.30.0 (20/09/2023)
- [fix(List): fixed render undefined in renderSlot (#3289)](https://github.com/consta-design-system/uikit/commit/78515e8ae5107cc73e4d4f9c84eb6bdf978af8b7) - [@gizeasy](https://github.com/gizeasy)
- [feat(BookmarkTabs): add tab navigation to close button (#3256)](https://github.com/consta-design-system/uikit/commit/3913dc4397e1d773999ac2e0ace5a825681b7aa0) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.29.0 (18/09/2023)
- В `Tabs` переработали адаптивность, теперь выбранный пункт не скрывается.
- В компоненты со свойством `as` добавили ограничение на возможные тэги, убрали svg элементы.

---

- [feat(Tabs): rewrite adaptivity logic (#3282)](https://github.com/consta-design-system/uikit/commit/6a9078b18713f24ad4d1680b22b3023df265a010) - [@N1MBER](https://github.com/N1MBER)
- [fix(BookmarkTabs): remove :has use (#3284)](https://github.com/consta-design-system/uikit/commit/1fabf695f335462ba0b15ec401bf314323df2713) - [@N1MBER](https://github.com/N1MBER)
- [fix(Button): fix disabled mode (#3253)](https://github.com/consta-design-system/uikit/commit/b3c96e04e18c4be282be43237618477332e53da0) - [@N1MBER](https://github.com/N1MBER)
- [feat(AsTags): added new type and rewrited component props (#3280)](https://github.com/consta-design-system/uikit/commit/4abb1db609473c58c8efa6047e55859da7178f71) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.28.1 (14/09/2023)
- [feat(List): added reexport renderHeader](https://github.com/consta-design-system/uikit/commit/76cd7cef99b04fb5b297261740aa60d79afb99ab) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.28.0 (13/09/2023)
Самое важное:
- Добавлены новые компоненты `Chips`, `ChipsItem`, `ChipsChoice`.
- В `ChoiceGroup`, `CheckboxGroup` добавили свойства `getItemAttributes` и `getItemRef`.
- В `Combobox` добавили свойство `allSelectedAllLabel`.

---

- [feat(Chips): add components Chips, ChipsItem, ChipsChoice (#3266)](https://github.com/consta-design-system/uikit/commit/9783ae1ca2ba472b59834b7a1754b7ea47baed5d) - [@gizeasy](https://github.com/gizeasy)
- [fix(Button): fix icon styles (#3269)](https://github.com/consta-design-system/uikit/commit/a19ba2db92c06dc152808a20d675b438f12fd89f) - [@gizeasy](https://github.com/gizeasy)
- [docs(Switch): fix example (#3264)](https://github.com/consta-design-system/uikit/commit/7df3aa2782f7ffe2f3bc2dae569497759aa661fe) - [@N1MBER](https://github.com/N1MBER)
- [feat(ChoiceGroup, CheckboxGroup): added props getItemAttributes and getItemRef (#3263)](https://github.com/consta-design-system/uikit/commit/9f8708f63a88d911525980e82f12f5d998d5b518) - [@N1MBER](https://github.com/N1MBER)
- [docs(Table): fix typo (#3260)](https://github.com/consta-design-system/uikit/commit/4c2336c0686d0a49f1daff77bb4c4ba8692e954c) - [@nevsky118](https://github.com/nevsky118)
- [fix(TextField): move RefAttributes in TextFieldProps type (#3258)](https://github.com/consta-design-system/uikit/commit/8e87af0e63dd7be87181d6542079f41da7c76664) - [@gizeasy](https://github.com/gizeasy)
- [fix(DatePicker): fix keyboard events (#3251)](https://github.com/consta-design-system/uikit/commit/9352e4659edc2fd0bf8069e53ba6bfeadc0b0e53) - [@N1MBER](https://github.com/N1MBER)
- [feat(ComboboxCanary): added new prop allSelectedAllLabel (#3255)](https://github.com/consta-design-system/uikit/commit/b3a6d1cf15fcf46d572c29d7dcbd093e17413180) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.27.0 (06/09/2023)
Самое важное:

- `Badge` теперь можно использовать в качестве счетчика(`counter`)
- В `DatePicker` изменили взаимодействие с клавиатуры и добавили свойства для управления выпадающим списком.  [Подробнее об изменениях](https://github.com/consta-design-system/uikit/pull/3204)
- Добавили `Loader[Canary]` и переработали в нем позиционирование компонента.
- В `Slider` добавили свойства для управления позиционированием тултипа.

---

- [feat(Badge): add counter mod (#3240)](https://github.com/consta-design-system/uikit/commit/f4655dc62241c95688909351b76a18fc4d879da8) - [@gizeasy](https://github.com/gizeasy)
- [feat(DatePicker): add new props: dropdownOpen, onDropdownOpen, ignoreOutsideClicksRefs (#3238)](https://github.com/consta-design-system/uikit/commit/30c100e25756bd21f1835061311890835a25bf53) - [@N1MBER](https://github.com/N1MBER)
- [feat(Loader): rewrite styles and layout (#3239)](https://github.com/consta-design-system/uikit/commit/a745c55f6d2149859b3012d2c1f5021c766b2fd7) - [@N1MBER](https://github.com/N1MBER)
- [fix(ProgressStepBar): fix refs problem (#3247)](https://github.com/consta-design-system/uikit/commit/5f3baf693070797671565836dbd7980f2842a690) - [@N1MBER](https://github.com/N1MBER)
- [feat(Slider): add new props: tooltipDirection & tooltipPossibleDirections (#3246)](https://github.com/consta-design-system/uikit/commit/9cec9491781a2359ff777ab9ccc6718ab51cfcd8) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.26.1 (31/08/2023)
- [fix(BookmarkTabs): reexport fix (#3237)](https://github.com/consta-design-system/uikit/commit/e87278371c3ba513d2efa5b674262be6d9a275c4) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.26.0 (30/08/2023)
Добавлен новый компонент `BookmarkTabs` - табы в виде вкладок

---

- [feat(BookmarkTabs): add new component (#3224)](https://github.com/consta-design-system/uikit/commit/734ddbb6dd1c3f6d615c93df9c1d0788a533b690) - [@N1MBER](https://github.com/N1MBER)
- [fix(useAutoComplete): fix Tab two times when enter own custom  value (#3232)](https://github.com/consta-design-system/uikit/commit/299df63b8b00a7a569bf8c57ceaca1aa1c4e7a68) - [@vitaliidasaev](https://github.com/vitaliidasaev)
- [fix(Collapse): fix collapse height (#3226)](https://github.com/consta-design-system/uikit/commit/979763a8bc7d9e34cbddae3eed5e9bbdffa287ed) - [@N1MBER](https://github.com/N1MBER)
- [fix(TextField): fix value checking (#3228)](https://github.com/consta-design-system/uikit/commit/8a5317dc779c3fc34f4b7c076aca0525cc08a8be) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.25.0 (16/08/2023)
Добавлены компоненты `Combobox[canary]`, `Select[canary]`, `UserSelect[canary]` и изменен `AutoComplete[canary]`. В них появились/изменились следующие функциональности:

- Добавили возможность виртуального скролла
- Изменили API свойств `onChandge`, `onCreate`, `renderItem`. [Подробнее об изменениях](https://github.com/consta-design-system/uikit/pull/3188)
- Добавили свойства для управления выпадающим списком. [Подробнее об изменениях](https://github.com/consta-design-system/uikit/pull/3204)
- Изменили взаимодействие с клавиатуры. [Подробнее об изменениях](https://github.com/consta-design-system/uikit/pull/3204)

⚠️ Ломающие изменения:

- В `AutoComplete[canary]` изменились свойства `onChandge` и `renderItem`. [Подробнее об изменениях](https://github.com/consta-design-system/uikit/pull/3188)

---

- [feat(Selects): add props for control dropdown open/close state (#3204)](https://github.com/consta-design-system/uikit/commit/2f7f40fd7f322e990f38ce5d88efd80667d6ed7d) - [@gizeasy](https://github.com/gizeasy)
- [fix(TextField): fix clear button (#3199)](https://github.com/consta-design-system/uikit/commit/6a42c23eff6dd6e6600e1418406d37c419d614bd) - [@N1MBER](https://github.com/N1MBER)
- [fix(Button): fix border for secondary view (#3206)](https://github.com/consta-design-system/uikit/commit/67a97a42a9c15f3473fe8df28c4434c10057171b) - [@N1MBER](https://github.com/N1MBER)
- [feat(Selects): add canary Selects (#3188)](https://github.com/consta-design-system/uikit/commit/1ea3c340dc03b10fdf9f395d239fcf88b67b469a) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.24.0 (10/08/2023)
Самое важное:
- В `Spoiler` добавили возможность указывать количество строк, ниже которых текст сворачивается.
- Добавили `useStyleProps` - хук для получения любого css свойства элемента, с подпиской на тему.

Ломающие изменения:
- В `Spoiler[Canary]` переименовали свойство `fullText` на `content`

---

- [chore(deps): bump word-wrap from 1.2.3 to 1.2.4 (#3177)](https://github.com/consta-design-system/uikit/commit/6396d354b12b1d33e2a4acdbad0a7a64f2735b5e) - [@dependabot](https://github.com/dependabot[bot])
- [feat(useStyleProps): add useStyleProps  (#3198)](https://github.com/consta-design-system/uikit/commit/df727b8b89e8516d13a384a5875ec79204794295) - [@gizeasy](https://github.com/gizeasy)
- [feat(Spoiler): add props clamp, buttonIndent, buttonAlign (#3197)](https://github.com/consta-design-system/uikit/commit/4fde84fea03b213e9f3f56bb2cacb9ca98e54122) - [@gizeasy](https://github.com/gizeasy)
- [chore: edit deploy config and codeowners (#3194)](https://github.com/consta-design-system/uikit/commit/9dac7be9373b03bcd6558e79901b4846aa17b327) - [@gizeasy](https://github.com/gizeasy)
- [fix(ContextMenu): fixed an unnecessary call onClickOutside (#3182)](https://github.com/consta-design-system/uikit/commit/b32e95d401c4a83033f8a38f3716fdd4304209e0) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.23.1 (19/07/2023)
- [fix(Spoiler): fixed export from the library](https://github.com/consta-design-system/uikit/commit/f293e6221d3534cf0d099612c44ad9b4d74cc101) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.23.0 (18/07/2023)
Самое важное:

- добавили хук `useResizableContent`, для динамического изменения размера контента,
- добавили компонент `BadgeGroup` с помощью которого можно выводить `Badge` в виде списка,
- добавили компонент `Spoiler`, для скрытия и раскрытия части текста.

---

- [fix(Slider): fix slider logic and styles (#3017)](https://github.com/consta-design-system/uikit/commit/b316d699f7084d535821695d8b8a8808a6e9eaf7) - [@N1MBER](https://github.com/N1MBER)
- [feat(useResizableContent): added new hook for resize elements (#3169)](https://github.com/consta-design-system/uikit/commit/b6d9ea0d49d9d63799dea5210cfc46904d6af41f) - [@N1MBER](https://github.com/N1MBER)
- [docs(Table): replace code examples to how to use (#3124)](https://github.com/consta-design-system/uikit/commit/b40d110ba58fbdee11a035df297177c164a101c6) - [@N1MBER](https://github.com/N1MBER)
- [feat(BadgeGroup): add new component (#3141)](https://github.com/consta-design-system/uikit/commit/f9a882dbda7af3210aaaae97dc9f17f01743d19b) - [@N1MBER](https://github.com/N1MBER)
- [feat(Spoiler): add new component (#3132)](https://github.com/consta-design-system/uikit/commit/4e2c2fba84c607ce6150040c04ae5ec683c84a91) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.22.0 (13/07/2023)
Самое важное:
- в `Collapse` убрали ограничение использования `rightSide` при `iconPosition = 'right'`
- в компонентах где используется TextField, сделали возможным привязать `label` к `input`, достаточно указать `id` компоненту
 
---

- [fix(Steps): fix discrepancies between design and code (#3055)](https://github.com/consta-design-system/uikit/commit/0345da261e97465d656b001007cac6d8f20cde04) - [@N1MBER](https://github.com/N1MBER)
- [fix(Collapse): fix rendering of rightSide when iconPosition equla right (#3170)](https://github.com/consta-design-system/uikit/commit/90337ad76d34d981a5088ad2fa73f8b32396d4c3) - [@N1MBER](https://github.com/N1MBER)
- [fix(Discrepancies): fix style mistakes (#3014)](https://github.com/consta-design-system/uikit/commit/0ddea96fc0e31f15b0a041f3ab45a3f7dd357bb3) - [@N1MBER](https://github.com/N1MBER)
- [fix(useSelect): open dropdown when typing (#3164)](https://github.com/consta-design-system/uikit/commit/b380882788cc72677964bd4cda819715af6f5462) - [@N1MBER](https://github.com/N1MBER)
- [docs(List): fix import example (#3143)](https://github.com/consta-design-system/uikit/commit/83199f3f83ed484cdc732590f834d69d6c1af85f) - [@N1MBER](https://github.com/N1MBER)
- [docs(Table): fix prop name (#3142)](https://github.com/consta-design-system/uikit/commit/b6c22619631c3d46667020f28b0c2919b3dc5f89) - [@N1MBER](https://github.com/N1MBER)
- [feat(FieldLabel): change render to as and add htmlFor (#3140)](https://github.com/consta-design-system/uikit/commit/421eeb65a924ae86d62c9cd4d77b3861067decb7) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.21.0 (28/06/2023)
Самое важное:

- В `Text` добавили новые цвета
- В `Collapse` добавили свойство `form`

---

- [feat(Text): add new colors (#3134)](https://github.com/consta-design-system/uikit/commit/5ab69d77eed0769af07bd56562bf1cf1a899e3b5) - [@N1MBER](https://github.com/N1MBER)
- [fix(Tabs): fix Infinity height, fix onlyIcon style (#3135)](https://github.com/consta-design-system/uikit/commit/1625495daf3c94c0af167d2eed1936ce8e4b0c6c) - [@gizeasy](https://github.com/gizeasy)
- [fix(TextField): fix onChange params (#3133)](https://github.com/consta-design-system/uikit/commit/999ed546bb3389d9a90fa2a98ae518e686b2c2f7) - [@N1MBER](https://github.com/N1MBER)
- [feat(Tabs): added new props (#3126)](https://github.com/consta-design-system/uikit/commit/7da7c2450973332c60c1b187c3b55a4298983f37) - [@N1MBER](https://github.com/N1MBER)
- [fix(AutoComplete): fix memo filteredOptions (#3130)](https://github.com/consta-design-system/uikit/commit/37c02f72e7d61a466c56d6e1229febdb00d0ce0c) - [@gizeasy](https://github.com/gizeasy)
- [feat(Collapse): add prop form (#3059)](https://github.com/consta-design-system/uikit/commit/239f57ea439d1013177946bb09d856d325899e4d) - [@N1MBER](https://github.com/N1MBER)
- [fix(Button): fix mouse events for disabled button (#3120)](https://github.com/consta-design-system/uikit/commit/edf18e885e850e62c6d07980a3f67c91e6c98bdd) - [@N1MBER](https://github.com/N1MBER)
- [fix(withTooltip): fix types (#3127)](https://github.com/consta-design-system/uikit/commit/87748c2b5b54110c59b617f82740646db3813598) - [@N1MBER](https://github.com/N1MBER)
- [fix(SelectComponents): remove useless z-index (#3123)](https://github.com/consta-design-system/uikit/commit/9fa85e928fc58ce524241318a51bac39b2492c11) - [@N1MBER](https://github.com/N1MBER)
- [fix(Checkbox): remove useless z-index (#3122)](https://github.com/consta-design-system/uikit/commit/0f67f1731b7ab36fbd2d94dd7b247e3f5487f545) - [@N1MBER](https://github.com/N1MBER)
- [docs(Header): marked as deprecated (#3113)](https://github.com/consta-design-system/uikit/commit/03e53a3f0e51774757a0a372d04efc12aa60bf77) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.20.0 (23/06/2023)
Самое важное:
- в `Button` изменили визуальный стиль модификаторов `_disabled` и `_loading`
- добавили useVirtualScroll, для создания списков с виртуальным скроллом

---

- [feat(AutoComplete): improvement searchFunction (#3118)](https://github.com/consta-design-system/uikit/commit/92322a78329edb42f0734dafda7fd98a3571fc77) - [@gizeasy](https://github.com/gizeasy)
- [feat(Button): update disabled styles (#3104)](https://github.com/consta-design-system/uikit/commit/eb2f6ebac0fc01db3621c65d91e56867372bd60e) - [@N1MBER](https://github.com/N1MBER)
- [chore(deps-dev): bump semver from 7.3.7 to 7.5.2 (#3116)](https://github.com/consta-design-system/uikit/commit/5a4308a84cc917c130d0f31b75c8ad1ded072595) - [@dependabot](https://github.com/dependabot[bot])
- [feat(useVirtualScroll): add hook (#3108)](https://github.com/consta-design-system/uikit/commit/b5165123aa7bcf213dba5570ec12d01242623905) - [@gizeasy](https://github.com/gizeasy)
- [fix(List): fixed _status (#3109)](https://github.com/consta-design-system/uikit/commit/6ee3cd309745391c00183b394f07bdbaa5935a13) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): update](https://github.com/consta-design-system/uikit/commit/7e1f33cf081dda14a4b1aa54c72ff4cdad266982) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.19.0 (02/06/2023)
Самое важное: 
- В `Popover` решили проблему резких скачков при появлении элемента.
- В `Tooltip` добавили свойство `offset`.

---

- [docs(standConfig): add figmaUrl (#3074)](https://github.com/consta-design-system/uikit/commit/94459d029f5b4dec19a7d8d4766be3e55e0bf774) - [@gizeasy](https://github.com/gizeasy)
- [fix(ProgressStepBar): reduce of empty array with no initial value (#3094)](https://github.com/consta-design-system/uikit/commit/271f9bf816534df38ea16311a54a8c3c82673176) - [@vladimir-skikh](https://github.com/vladimir-skikh)
- [docs(Card): fix as description (#3096)](https://github.com/consta-design-system/uikit/commit/0ec2e152bedf84d7ccfcd1fb1a8a240db7751df3) - [@N1MBER](https://github.com/N1MBER)
- [fix(Slider): fix tooltip position](https://github.com/consta-design-system/uikit/commit/1a12e8919018383cb35fd6785b5a7e7ec24075bf) - [@gizeasy](https://github.com/gizeasy)
- [feat(Tooltip): add offset prop](https://github.com/consta-design-system/uikit/commit/103c6efae29b0139052536e08b491b75eb4b5969) - [@gizeasy](https://github.com/gizeasy)
- [refactor(DragNDropField): removed isRenderProp](https://github.com/consta-design-system/uikit/commit/9605b5dff8d0766e3342a9c27002bb8985d8d773) - [@gizeasy](https://github.com/gizeasy)
- [refactor(ContextMenu): removed animation fix](https://github.com/consta-design-system/uikit/commit/63b8b29af23fbabbfa0e8f944f2764680064fdc2) - [@gizeasy](https://github.com/gizeasy)
- [fix(Popover): fixed twitching during positioning](https://github.com/consta-design-system/uikit/commit/d0611087d89d1082154d4613ad1877161b1f8eb1) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.18.0 (31/05/2023)
Самое важное:
- Исправили расхождения с дизайном в компонентах `List`, `Checkbox`, `Informer`, `RadioGroup`, `CheckboxGroup`, `File`, `Breadcrumbs`, `ProgressStepBar`, `User`.
- В `Badge` добавили возможность ставить иконку справа.
- В `RadioGroup` и `CheckboxGroup` добавили возможность указывать ключ.

---

- [fix(List): fix discrepancies between desigh and code for list divider (#3087)](https://github.com/consta-design-system/uikit/commit/1ecf9f2fed368069227711261e55b9be364eb651) - [@N1MBER](https://github.com/N1MBER)
- [fix(Checkbox): fix arrow position (#3088)](https://github.com/consta-design-system/uikit/commit/77a29f962191775ac1624a8186c5b51cac231765) - [@N1MBER](https://github.com/N1MBER)
- [feat(Badge): added the ability to specify the icon on the right and left side (#3077)](https://github.com/consta-design-system/uikit/commit/f4f038d33b5b70f74f19d26b3c2a072403377097) - [@N1MBER](https://github.com/N1MBER)
- [docs(ProgressStepBar): add content to variants example (#3084)](https://github.com/consta-design-system/uikit/commit/93008e86d6dbf90d0ea0efd0e34f7b3530664da8) - [@N1MBER](https://github.com/N1MBER)
- [fix(ProgressStepBar): reduce of empty array with no initial value (#3082)](https://github.com/consta-design-system/uikit/commit/219b14208d8d1564f13929e8a994e41c3435f62f) - [@vladimir-skikh](https://github.com/vladimir-skikh)
- [fix(Informer): fix discrepancies between design and code (#3053)](https://github.com/consta-design-system/uikit/commit/ad97a676c1b80b0304e17dbe64fd1e133958fd04) - [@N1MBER](https://github.com/N1MBER)
- [fix(SnackBar): fix variants (#3054)](https://github.com/consta-design-system/uikit/commit/3761ff2ba56beeb0f96e78a9aa62aa9a42e29729) - [@N1MBER](https://github.com/N1MBER)
- [feat(RadioGroup): fix styles and add keys props (#3056)](https://github.com/consta-design-system/uikit/commit/2c49effdafd893b3b4587d70186995cdd3afc18d) - [@N1MBER](https://github.com/N1MBER)
- [fix(File): fix spin size (#3057)](https://github.com/consta-design-system/uikit/commit/353fae631c09fb62a31f834edc48ba74289eddf3) - [@N1MBER](https://github.com/N1MBER)
- [fix(Breadcrumbs): fix discrepancies between design and code (#3058)](https://github.com/consta-design-system/uikit/commit/d998131fb8598925357bc53105b08310063d63cd) - [@N1MBER](https://github.com/N1MBER)
- [fix(ProgressStepBar): fix discrepancies between design and code and also fix bugs (#3061)](https://github.com/consta-design-system/uikit/commit/874cb6e5e1f748db8cecb3c022c891ef07bd02e2) - [@N1MBER](https://github.com/N1MBER)
- [fix(User): fix discrepancies between design and code (#3060)](https://github.com/consta-design-system/uikit/commit/d641d3ef9e2103179afc2405b9e488b2f3a82a9d) - [@N1MBER](https://github.com/N1MBER)
- [fix(DragNDropField): fix tooltip content wrap (#3076)](https://github.com/consta-design-system/uikit/commit/3a361eca621f1c8444eeb520462da9a9d994968b) - [@N1MBER](https://github.com/N1MBER)
- [fix(SelectDropown): fix labelForEmptyItems (#3078)](https://github.com/consta-design-system/uikit/commit/3fa869e1ff5971613427948611c4dcce387678c3) - [@N1MBER](https://github.com/N1MBER)
- [fix(DateTime): fig bug with useless props (#3079)](https://github.com/consta-design-system/uikit/commit/d3e3c05a03741ea5a4cbf0b5fcfff18c0697d0b6) - [@N1MBER](https://github.com/N1MBER)
- [fix(Tabs): fix styles break (#3083)](https://github.com/consta-design-system/uikit/commit/36cbc53f75a9900579cd600c9f69837064ce1c76) - [@gizeasy](https://github.com/gizeasy)
- [docs(Combobox): selectAll conditional by multiple in variants](https://github.com/consta-design-system/uikit/commit/d9064e3399a1d057b165ecb38de33b9292767828) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.17.2 (22/05/2023)
Запускать локальный сервер разработки и сборку пакетов теперь можно и на ОС Windows. 

---

- [chore: configure build for windows (#3051)](https://github.com/consta-design-system/uikit/commit/e533ecef0f7392d091616e24922a458fa0f73c85) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.17.1 (05/05/2023)
- [fix(Combobox): fix update serchValue (#3030)](https://github.com/consta-design-system/uikit/commit/ab41caac40ca84c74eed84a38cc95cc5bbd66627) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.17.0 (27/04/2023)
Самое важное:

- в `useBreakpoints` добавили функцию `addPrefix`. Чтобы при пробросе `breakpoints`, как модификации блока, было удобнее генерировать класснеймы
- в `DatePicker` исправили валидaцию значения инпута при кастомном формате

---

- [feat(useBreakpoints): added helper `addPrefix` (#3025)](https://github.com/consta-design-system/uikit/commit/ec03a288b90ef65b1638fbba6e3572afb8f3ba7a) - [@gizeasy](https://github.com/gizeasy)
- [fix(DatePicker): fixed validate mask (#3012)](https://github.com/consta-design-system/uikit/commit/44484f9e1020c8211b96443fe1b235cb3abb2428) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.16.0 (21/04/2023)
Самое важное:
- В `Combobox` появилась возможность добавления опции "Выбрать все"

---

- [docs: edit stand config](https://github.com/consta-design-system/uikit/commit/981ce6ec98bef41c018a22d80042cffcafe838b8) - [@gizeasy](https://github.com/gizeasy)
- [docs: edit description (#3007)](https://github.com/consta-design-system/uikit/commit/ff1a27fbffa6fc1f07f54583a6eba032131e8925) - [@BagenovA](https://github.com/BagenovA)
- [fix(Table): example fixed (#3005)](https://github.com/consta-design-system/uikit/commit/e17258d029282b4a9024f88eba2ff7197856385c) - [@gizeasy](https://github.com/gizeasy)
- [docs: add aliases (#3002)](https://github.com/consta-design-system/uikit/commit/0e4c1aa1852a353ebbcd20116213211e0c90fd49) - [@N1MBER](https://github.com/N1MBER)
- [fix(Combobox): fixed type dropdownRef (#3000)](https://github.com/consta-design-system/uikit/commit/c8cd834ff32218d7f63f9a62ce83c2a2da482972) - [@gizeasy](https://github.com/gizeasy)
- [feat(Combobox): add prop selectAll (#2993)](https://github.com/consta-design-system/uikit/commit/b3f9daae7e0e3f061745f37bd1ff686fe2d94343) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.15.0 (17/04/2023)
Самое важное:
- Теперь в поле ввода можно установить иконку слева от заголовка.
- `DatePicker`. Исправлена работа кнопки «Очистить».
- `DateTime`. Добавлена возможность указывать произвольные даты.

---

- [chore: update @consta/stand](https://github.com/consta-design-system/uikit/commit/7b0ca0d675759519388bf4c40b217325f04a8104) - [@gizeasy](https://github.com/gizeasy)
- [feat(TextField): add margin to counter buttons for round forms (#2990)](https://github.com/consta-design-system/uikit/commit/e30b594c9b641b319a3d220cfcac0af7be16c1e0) - [@N1MBER](https://github.com/N1MBER)
- [docs(Selects): add fragments to docs about view clear (#2989)](https://github.com/consta-design-system/uikit/commit/a3b69f8c4e4d840b0e8819d0e2ad475f7884845b) - [@N1MBER](https://github.com/N1MBER)
- [feat(FieldLabel): added prop icon (#2960)](https://github.com/consta-design-system/uikit/commit/d0ca7ddd8595178c3d7c71cac24cfa5369cd04cf) - [@N1MBER](https://github.com/N1MBER)
- [feat(FieldLabel): added prop icon (#2949)](https://github.com/consta-design-system/uikit/commit/70c4ffbfc10ae4003816758d60a1aa3f0a117508) - [@N1MBER](https://github.com/N1MBER)
- [fix(DatePicker): fix clearButton (#2968)](https://github.com/consta-design-system/uikit/commit/1e5731b85b8b78adeaa88c87678926f186fe3402) - [@N1MBER](https://github.com/N1MBER)
- [feat(DateTime): add prop disableDates (#2940)](https://github.com/consta-design-system/uikit/commit/53f1fa766eb604f174525fc5d8d20ef5361eb674) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.14.2 (16/03/2023)
- [fix(useIMask): fixed updateValue (#2958)](https://github.com/consta-design-system/uikit/commit/afaaa13201285d44ba8300192e460b0fccd93708) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.14.0 (15/03/2023)
В `ThemeToggler` добавили свойство `view` по аналогии с `Button`.

---

- [chore(deps-dev): bump webpack from 5.74.0 to 5.76.0 (#2952)](https://github.com/consta-design-system/uikit/commit/feed5522da3ff75c50533a3fd7ce080e7c6325da) - [@dependabot[bot]](https://github.com/dependabot[bot])
- [docs(TextField): fixed mistakes in documentation (#2945)](https://github.com/consta-design-system/uikit/commit/39f9bdee4a97fb107e77cd933fc0860cc6e28d2c) - [@N1MBER](https://github.com/N1MBER)
- [fix(UserSelect): fixed bug with form (#2946)](https://github.com/consta-design-system/uikit/commit/f07d1c5163aee7a9493f244a3c50bc7640e31e30) - [@N1MBER](https://github.com/N1MBER)
- [feat(ThemeToggler): add view (#2950)](https://github.com/consta-design-system/uikit/commit/8a920ce35001a01067b1660edbaaafd1be220890) - [@gizeasy](https://github.com/gizeasy)
- [fix(DatePicker): revert to old logic (#2957)](https://github.com/consta-design-system/uikit/commit/3a6699c6f193196bd28023271827811d9a7605fd) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): bump decode-uri-component from 0.2.0 to 0.2.2 (#2936)](https://github.com/consta-design-system/uikit/commit/d5535465862923180098b120e710633a8897b607) - [@dependabot[bot]](https://github.com/dependabot[bot])
- [chore(deps): bump loader-utils from 2.0.2 to 2.0.4 (#2935)](https://github.com/consta-design-system/uikit/commit/18aa2f3a66db2ea3834872c4d04157d097a125dc) - [@dependabot[bot]](https://github.com/dependabot[bot])

--------------------

## v4.13.0 (02/03/2023)
Добавили в `Collapse` свойство `iconView`, которое меняет вариант отображения иконки разворота

---

- [feat(Collapse): add iconView (#2932)](https://github.com/consta-design-system/uikit/commit/5806bc992bf79fa89d89047636c6dda470d29ac5) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.12.0 (22/02/2023)
Самое важное:

- В `Slider` появилась возможность добавлять поля ввода с обеих сторон
- В `Combobox` добавили размер `xs`
- В `Tabs` теперь есть несколько свойств для добавления иконок и произвольного контента рядом с наименованием

---

- [chore(CODEOWNERS): change codeowners](https://github.com/consta-design-system/uikit/commit/e1e587fb5343cac77357e192b16ad4cc44f7fcff) - [@gizeasy](https://github.com/gizeasy)
- [docs(Table): add accent on id in row (#2915)](https://github.com/consta-design-system/uikit/commit/b96ebae870a965f233c0b54c5353acfa89dbf8d6) - [@N1MBER](https://github.com/N1MBER)
- [feat(Slider): add `'input'` for `rightSide` (#2924)](https://github.com/consta-design-system/uikit/commit/c574da5621d83d3172a4e69f01cd8c0edfeae7cf) - [@gizeasy](https://github.com/gizeasy)
- [feat(Combobox): add xs size (#2916)](https://github.com/consta-design-system/uikit/commit/29138db8ce9e081380d0ba3234aef9f93df0e5a5) - [@gizeasy](https://github.com/gizeasy)
- [feat(Tabs): add new getters (#2911)](https://github.com/consta-design-system/uikit/commit/ff1f6a4fa6d3a62a9f8868a00d2be2cfd9a24e83) - [@gizeasy](https://github.com/gizeasy)
- [fix(EventInterceptor): fix logic of select handler (#2903)](https://github.com/consta-design-system/uikit/commit/ea33a5a17851b655d5645c84165f0c21963c18a4) - [@N1MBER](https://github.com/N1MBER)
- [fix(DatePicker): fix bug with dropdown viability on tab click (#2893)](https://github.com/consta-design-system/uikit/commit/6f015eb0c9f117bc820ac67bc67e7959c08f525a) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.11.0 (16/02/2023)
Самое важное:

- В `TextField` добавлена документация по использованию масок
- В `Combobox`, `AutoComplete` и `UserSelect` добавлена возможность программно управлять значением поиска 

---

- [docs(ChoiceGroup): update link to sandbox (#2910)](https://github.com/consta-design-system/uikit/commit/9575b7d4860bd6977dad9e6e8e3c4305c0b56f9b) - [@N1MBER](https://github.com/N1MBER)
- [feat(ProgressStepBar): rewrite line rendering and fix bug with hidden outline (#2900)](https://github.com/consta-design-system/uikit/commit/7f8d1e12bc6381c5a17802d0b7d739c4028e7f60) - [@N1MBER](https://github.com/N1MBER)
- [docs(TextField): add examples with imask usage (#2890)](https://github.com/consta-design-system/uikit/commit/0559e3ba5c6cab499eac3e95c76cefbb8cfa6ced) - [@N1MBER](https://github.com/N1MBER)
- [fix(Selects): fix logic of choicing disabled items (#2901)](https://github.com/consta-design-system/uikit/commit/f98ee2985677150f446c8d1cd263be0b8c70fdc1) - [@N1MBER](https://github.com/N1MBER)
- [feat(Selects): add searchValue prop (#2898)](https://github.com/consta-design-system/uikit/commit/e526359e713cdb34e788a6003c8488d8f0de9770) - [@N1MBER](https://github.com/N1MBER)
- [fix(TextField): fix bug with scroll on disabled textarea (#2897)](https://github.com/consta-design-system/uikit/commit/060eb2259fad7622f5850de87e8087cee2324825) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v4.10.0 (08/02/2023)
Самое важное:

- В `Avatar` и  `AvatarGroup` добавили модификацию `_monochrome`, для случаев, когда цветные аватарки не подходят
- В `Switch` добавили размер `xs` 
- В `SwitchGroup` добавили размеры `xs` и `s`
---

- [feat(Avatar): add monochrome (#2885)](https://github.com/consta-design-system/uikit/commit/ee47022e27daf152411f75a84a1f632bafa3cd28) - [@gizeasy](https://github.com/gizeasy)
- [feat(Switch): add new size (#2884)](https://github.com/consta-design-system/uikit/commit/0b9112dc2a0f0fa9343e83552b661c4ae994f202) - [@N1MBER](https://github.com/N1MBER)
- [feat(MixFocus): add vars (#2889)](https://github.com/consta-design-system/uikit/commit/e94e6464c815dd933a48d6b39f71082b043881fe) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.9.0 (02/02/2023)
Самое важное:

- Теперь `AvatarGroup` может подстраивать количество аватарок под ширину родителя.
- В `Attachment` добавили свойство `size`.

---

- [feat(AvatarGroup): add visibleCount='auto' (#2881)](https://github.com/consta-design-system/uikit/commit/7e985b0d6c6a4d6f17815f214c980d0bac817ca7) - [@gizeasy](https://github.com/gizeasy)
- [feat(Attachment): add prop size (#2882)](https://github.com/consta-design-system/uikit/commit/2e05b41020520fb1d9244d16f55bad6ca1a8a831) - [@N1MBER](https://github.com/N1MBER)
- [fix(Table): fix bug with excluding in calculations previous state (#2877)](https://github.com/consta-design-system/uikit/commit/685024043045074fe01af43a4835801a390b1f98) - [@N1MBER](https://github.com/N1MBER)
- [docs(sandbox): add links to sandbox for a few components and hooks (#2876)](https://github.com/consta-design-system/uikit/commit/d3f9450afb472c6a24963b07000cab6619305ab3) - [@N1MBER](https://github.com/N1MBER)
- [chore(deps): update @consta/stand](https://github.com/consta-design-system/uikit/commit/9cd4a1569a6975eb83c502705647fc246ca53499) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v4.8.0 (31/01/2023)
Самое важное:
- Добавили мобильный вид в `ContextMenu` и переработали анимацию раскрытия вложенных меню.
---

- [feat(ContextMenu): mobile view added (#2872)](https://github.com/consta-design-system/uikit/commit/a46494848d343ed2020bc61cdd37e33ef23394e9) - [@gizeasy](https://github.com/gizeasy)
- [chore(deps): update @consta/icons and @consta/stand](https://github.com/consta-design-system/uikit/commit/3e08155f0dbf660418afce22a179cd8525231c27) - [@gizeasy](https://github.com/gizeasy)
