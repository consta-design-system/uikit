# Changelog

## v5.29.1 (23/01/2026)
- [fix(DatePicker): handle time-only format without date (#4148)](https://github.com/consta-design-system/uikit/commit/777840cd4b08b0d495e8c35ed8b034268efe086a) - [@ShavrinAleksei](https://github.com/ShavrinAleksei)

--------------------

## v5.29.0 (20/01/2026)
Самое важное:
- Добавили возможность указывать `viewport` для компонетов:
  - `AutoComplete`
  - `AutoCompleteCanary`
  - `Combobox`
  - `ContextMenu`
  - `DatePicker`
  - `FlatSelect`
  - `Select`
  - `SelectCanary`
  - `UserSelect`

---

- [chore(deps): update consta@stand](https://github.com/consta-design-system/uikit/commit/0ed7de065f7557c6d16c11a7567e06b2e9305397) - [@gizeasy](https://github.com/gizeasy)
- [chore(eslint): remove unused deprecated typescript-eslint-parser (#4139)](https://github.com/consta-design-system/uikit/commit/3ac10e0326ca3c9d4af1ba3a0989b44cc16901d6) - [@baevm](https://github.com/baevm)
- [feat: Added support for the viewport  (#4146)](https://github.com/consta-design-system/uikit/commit/90a778b63d3f6732abd5a7f4f151cce0ca6fe942) - [@gizeasy](https://github.com/gizeasy)
- [feat(TextField): rewrite TextAreaAutoSize and fixed some bugs (#4141)](https://github.com/consta-design-system/uikit/commit/adf81ed0707df1596303ce2d6cc8532184ad9b12) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.28.4 (26/12/2025)
- [fix(TextField): fixed children container width (#4137)](https://github.com/consta-design-system/uikit/commit/a60db4b10c0d9a3414c258a826131a756fa54936) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.28.3 (26/12/2025)
- [fix(TextField): fixed calculate padding (#4136)](https://github.com/consta-design-system/uikit/commit/ef80a5bbc469e45248f7d463b6f376b7765ca4eb) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.28.2 (23/12/2025)
- [fix(TextFieldCanary): fixed minLength (#4135)](https://github.com/consta-design-system/uikit/commit/71740a356dd560c31a4d722f483924f774fec9f4) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.28.1 (18/12/2025)
- [fix(ContextMenu): fixed className (#4134)](https://github.com/consta-design-system/uikit/commit/5b8cae4667c84126159b65a7a7735752159c0a1b) - [@gizeasy](https://github.com/gizeasy)
- [fix(Sidebar): fix type for ref (#4132)](https://github.com/consta-design-system/uikit/commit/827fbfd3b031723b15924bbbe5f008d06df7e73a) - [@baevm](https://github.com/baevm)
- [docs(FieldGroup): fix typos in doc (#4128)](https://github.com/consta-design-system/uikit/commit/76f2b35c8aa53b0ee670c120939a090089c5f7a6) - [@baevm](https://github.com/baevm)

--------------------

## v5.28.0 (04/12/2025)
Самое важное:
- Добавили новый компонент `Notification` и его элементы, для вывода нотификаций
- В `DateTime` и `DatePicker` добавили свойство  `timeOptions`, для гибкой настройки контролов выбора времени.

---


- [feat(Notification): add components (#4124)](https://github.com/consta-design-system/uikit/commit/c7b9e1eeee4c3ed11e9e3e075aacaa2dc794e0b6) - [@gizeasy](https://github.com/gizeasy)
- [fix: add SidebarDeprecated and ModalDeprecated (#4126)](https://github.com/consta-design-system/uikit/commit/64eeeffa0f6ab704d1455c72ec0e70cd7b7b56d1) - [@gizeasy](https://github.com/gizeasy)
- [docs(Badge): add missing view=tinted docs (#4120)](https://github.com/consta-design-system/uikit/commit/a4472ab1fc5216f31f12c6e06917c4a5c10b5471) - [@baevm](https://github.com/baevm)
- [feat(Datetime): time options (#4112)](https://github.com/consta-design-system/uikit/commit/e123250e92613a2c4e60697279211830503767a0) - [@ShavrinAleksei](https://github.com/ShavrinAleksei)
- [test: add tests for ProgressLine, useForkRef, useMouseLeave (#4116)](https://github.com/consta-design-system/uikit/commit/251aa97e72f237629163097120e8d8e61ee69d6a) - [@baevm](https://github.com/baevm)
- [test(Picture/Grid/DragNDropFieldCanary): add tests (#4111)](https://github.com/consta-design-system/uikit/commit/57088313b59a517c55cfd0a611138d62a3be1755) - [@baevm](https://github.com/baevm)

--------------------

## v5.27.1 (11/11/2025)
- [fix(Modal): fixed zIndex prop (#4110)](https://github.com/consta-design-system/uikit/commit/d8544b0b9df8f58e2ed3a881cd1bbf7c6645b8c3) - [@gizeasy](https://github.com/gizeasy)
- [fix(Slider): tab navigation (#4109)](https://github.com/consta-design-system/uikit/commit/680364e4a88431e569e065a764354563e8979bff) - [@ShavrinAleksei](https://github.com/ShavrinAleksei)

--------------------

## v5.27.0 (06/11/2025)
Самое важное:
 - Переработали `Modal` и добавили `ModalLayout` и `ModalHeader` для более гибкой кастомизации.
 - Переработали `Sidebar` для более гибкой кастомизации. 
 - Добавили раздел **Как использовать** в `Modal` и `Sidebar` с примерами.

---

- [docs: removed unnecessary properties (#4108)](https://github.com/consta-design-system/uikit/commit/fb6e4e03559e6699d6b621f16df4bd88119f0e0f) - [@gizeasy](https://github.com/gizeasy)
- [feat(Sidebar): refactor component (#4104)](https://github.com/consta-design-system/uikit/commit/7da573de1acbbc714ca3bc58292c329904c5e962) - [@gizeasy](https://github.com/gizeasy)
- [tests: add tests for ListCanary, Tooltip, Popover (#4105)](https://github.com/consta-design-system/uikit/commit/1cd184c8ef34fc9e5f1c5e0131830f2baabaa62f) - [@baevm](https://github.com/baevm)
- [docs: check tabs (#4103)](https://github.com/consta-design-system/uikit/commit/86d88a68eab13c565a8034c082509894d37aa0a3) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Combobox, Select): onСhange required (#4099)](https://github.com/consta-design-system/uikit/commit/74f7d8b3e6b4302341cae35d96f00e54e6a4b336) - [@ShavrinAleksei](https://github.com/ShavrinAleksei)
- [test(hooks): add tests (#4100)](https://github.com/consta-design-system/uikit/commit/11d8397e4117645ab61782b6d06af6ecb69586c7) - [@baevm](https://github.com/baevm)
- [test(Banner): add tests (#4095)](https://github.com/consta-design-system/uikit/commit/168f15a6d602f521b3ad3237e7d43ae8b134f6fb) - [@ShavrinAleksei](https://github.com/ShavrinAleksei)
- [feat(FieldWrapper): add counterStatus prop (#4093)](https://github.com/consta-design-system/uikit/commit/df46541a688f3bad00c0f22402796025b45e97a8) - [@gizeasy](https://github.com/gizeasy)
- [feat(Modal): add components (#4082)](https://github.com/consta-design-system/uikit/commit/ee8ea7ec4c8bbaa5415ba6b1aba81a816780cd1a) - [@gizeasy](https://github.com/gizeasy)
- [docs: return complex props (#4091)](https://github.com/consta-design-system/uikit/commit/efffc10f4acf3984cbc2154b44b6905e3489ac70) - [@alyonurchick1](https://github.com/alyonurchick1)

--------------------

## v5.26.0 (20/10/2025)
Самое важное:
- Добавили новый компонент `FlatSelect`
- Обновили документацию девяти компонентов
- Добавили тесты для `Pagination`, `BookmarkTabs`

---

- [chore(eslint): remove unused eslint-plugin-id-match (#4092)](https://github.com/consta-design-system/uikit/commit/63fd2f31bc78f81610eb883d1e501ad6d00e5f3b) - [@baevm](https://github.com/baevm)
- [fix(ContextMenu): remove unused ref (#4083)](https://github.com/consta-design-system/uikit/commit/504ec2d5fc87bce0e614890792cca98376ee48af) - [@baevm](https://github.com/baevm)
- [tests (Pagination, BookmarkTabs): добавить тесты (#4079)](https://github.com/consta-design-system/uikit/commit/d80e1a4a45fcba21c93d53095992bfd5dba7b4e9) - [@baevm](https://github.com/baevm)
- [docs(ThemeToggler): implementation of editorial policy (#4072)](https://github.com/consta-design-system/uikit/commit/02bd4edf132193bae93047d41c9e11f442ce6cdb) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(TextFieldCanary): implementation of editorial policy (#4068)](https://github.com/consta-design-system/uikit/commit/ec7d075e43d46324322c2c94f42f1bdfc8f4e854) - [@alyonurchick1](https://github.com/alyonurchick1)
- [feat(FlatSelect): add component (#4069)](https://github.com/consta-design-system/uikit/commit/e11ab65cd615e6929d2e7f785ff5a9a7fb0d0c33) - [@gizeasy](https://github.com/gizeasy)
- [docs(User): implementation of editorial policy (#4076)](https://github.com/consta-design-system/uikit/commit/7ee29a9951ce4349083681d5ab42cf9a8ec80e08) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Tooltip): implementation of editorial policy (#4075)](https://github.com/consta-design-system/uikit/commit/9d3ef41b4db938f904929b8797b122827ca7520f) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Timer): implementation of editorial policy (#4073)](https://github.com/consta-design-system/uikit/commit/a3452ec8495b7920a927451b024af543739659b9) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Theme): implementation of editorial policy (#4070)](https://github.com/consta-design-system/uikit/commit/7d757129e918f4cad341c9b9fba92d0f4b3e50f1) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(TextField): implementation of editorial policy (#4067)](https://github.com/consta-design-system/uikit/commit/363830e4b5590bffba2e654db91f8e8e7ec5e796) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Text): implementation of editorial policy (#4066)](https://github.com/consta-design-system/uikit/commit/666056fad468c8e01aed42e8208c3e62ed04c44f) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Tag): implementation of editorial policy (#4065)](https://github.com/consta-design-system/uikit/commit/9e56616ebf0cf5752f97d39ad05a69319057098a) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(github actions): fix duplicate typecheck in github actions, add lint job (#4071)](https://github.com/consta-design-system/uikit/commit/c025e90463d06c1d2fa8daefdbf8f93c3a08c6fb) - [@baevm](https://github.com/baevm)
- [test(Slider/Sidebar/Modal): adds tests for Slider and Sidebar, fixes commented test in Modal (#4064)](https://github.com/consta-design-system/uikit/commit/fcb0ea7d11b9ae8210bf4ace44517d01e275f22b) - [@baevm](https://github.com/baevm)
- [fix(Combobox): fix combobox clear button visibility with selectAll and multiple (#4062)](https://github.com/consta-design-system/uikit/commit/63ef467b3f9c7234a9010ffefa50d02668fc26cb) - [@baevm](https://github.com/baevm)

--------------------

## v5.25.1 (10/09/2025)
- [docs(Tabs): implementation of editorial policy (#4059)](https://github.com/consta-design-system/uikit/commit/94eba6c6aba682db596c69d501fde41ce963c9ac) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (SwitchGroup): implementation of editorial policy (#4058)](https://github.com/consta-design-system/uikit/commit/71cf3ead3e0f85425591f91379dea81635a87982) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(ProgressStepBar): fix line width for 2 steps (#4054)](https://github.com/consta-design-system/uikit/commit/96f754b8f9fba5e2f77505b6981fa222676fb734) - [@baevm](https://github.com/baevm)
- [docs(Switch): implementation of editorial policy (#4057)](https://github.com/consta-design-system/uikit/commit/01cb990765c36785a409515eaf2d2e3b42c0df9d) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Steps): implementation of editorial policy (#4055)](https://github.com/consta-design-system/uikit/commit/5182b6c037f9d04d12a28af22f6725993d851f55) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(StepsCanary): implementation of editorial policy (#4056)](https://github.com/consta-design-system/uikit/commit/80539d84ed782b665b30d6c06cc8c87c5422bec4) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Spoiler): implementation of editorial policy (#4053)](https://github.com/consta-design-system/uikit/commit/e651a8d58b8077b3600b09cff4249cb9459c12d9) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(SnackBar): implementation of editorial policy (#4051)](https://github.com/consta-design-system/uikit/commit/9b18d40d2af167e878a6d67f858c3a9707b00294) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Slider): implementation of editorial policy (#4050)](https://github.com/consta-design-system/uikit/commit/5d70ba45419bb69d9e9f84e9c6bb3b71efa8e2b2) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Sidebar): implementation of editorial policy (#4049)](https://github.com/consta-design-system/uikit/commit/3ec30874389a42a671eef51571d10cc5270de8ed) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(SelectCanary): implementation of editorial policy (#4047)](https://github.com/consta-design-system/uikit/commit/fd59ddfe6a4d1c0dc0d3f50733fcbde0ce495ae4) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(ProgressStepBar): implementation of editorial policy (#4039)](https://github.com/consta-design-system/uikit/commit/9318f74d82f2d776ab3b81707e2cbe97f0b39b53) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Responses): implementation of editorial policy (#4045)](https://github.com/consta-design-system/uikit/commit/7f068bc7d408932366f70cc8f92124408281932f) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Select): implementation of editorial policy (#4046)](https://github.com/consta-design-system/uikit/commit/e54741cf8c795ba2ae561d336bad478f91609b0c) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Radio): implementation of editorial policy (#4043)](https://github.com/consta-design-system/uikit/commit/74adf0852c46a928e4895145a758e73ee4a2e6d4) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (RadioGroup): implementation of editorial policy (#4042)](https://github.com/consta-design-system/uikit/commit/3af395a2f150f1270e22a147c27d3760df020ca4) - [@alyonurchick1](https://github.com/alyonurchick1)

--------------------

## v5.25.0 (28/08/2025)
Самое важное:
- В `Button` изменили вид состояния `loading`. Теперь `Loader` выводится с `type="circle"`
- Добавили новый компонент `Banner`, который предназначен для отображения срочных и важных оповещений

---

- [docs (ProgressLine): implementation of editorial policy (#4037)](https://github.com/consta-design-system/uikit/commit/4f919af5c2c32ec9a92bac8b91c25ec662392b31) - [@alyonurchick1](https://github.com/alyonurchick1)
- [feat(Button): added type="circle" for Loader (#4041)](https://github.com/consta-design-system/uikit/commit/bb38547137c6f9c471e1b99e5a53a3fdaf54a53e) - [@gizeasy](https://github.com/gizeasy)
- [docs (ProgressSpin): implementation of editorial policy (#4038)](https://github.com/consta-design-system/uikit/commit/6b14aa912cf4ccb8ddeec5e4afb5fb03bd3558be) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(AutoCompleteCanary): export fixed (#4034)](https://github.com/consta-design-system/uikit/commit/4ac9cafeb43459e320f0e4c77251731008ed91f4) - [@gizeasy](https://github.com/gizeasy)
- [docs(Pagination): fixed examples (#4033)](https://github.com/consta-design-system/uikit/commit/507d60e860bfc66f42030ed8115cce0da5f5f1e9) - [@gizeasy](https://github.com/gizeasy)
- [feat(Banner): add component (#4028)](https://github.com/consta-design-system/uikit/commit/fc1d544142a5ca65d914deb014715b635105b637) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.24.2 (01/08/2025)
- [fix(Attachment): fixed withAction (#4026)](https://github.com/consta-design-system/uikit/commit/433ec061b8d9ddf2fca3a9cacbaff74b4c623998) - [@klekovvlad](https://github.com/klekovvlad)
- [fix(TextFieldCanary): fixed calculate width (#4024)](https://github.com/consta-design-system/uikit/commit/e3f256c4f383a72352795e9ae4ddcb2645a2264b) - [@gizeasy](https://github.com/gizeasy)
- [docs(Tabs): fixed page (#4025)](https://github.com/consta-design-system/uikit/commit/990920577dfa4fc34d6fb73d11213f7cf57a3d52) - [@gizeasy](https://github.com/gizeasy)
- [docs (Popover): implementation of editorial policy (#4020)](https://github.com/consta-design-system/uikit/commit/1dd2e0457cb3ddf50468c920fb81332c3391f386) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Picture): implementation of editorial policy (#4019)](https://github.com/consta-design-system/uikit/commit/b571d1d4f6a43df3845e79a9879512e1eacc4bd6) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Pagination): implementation of editorial policy (#4018)](https://github.com/consta-design-system/uikit/commit/dd04bce1e93ceb05df362cc85d52b43e50919ff4) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Modal): implementation of editorial policy (#4017)](https://github.com/consta-design-system/uikit/commit/aa7170fa85afbe34c6d621e976670732b7f0096a) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Loader): implementation of editorial policy (#4014)](https://github.com/consta-design-system/uikit/commit/90dd239dbf344d64620c190305dc3caca0b45d6e) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (List): implementation of editorial policy](https://github.com/consta-design-system/uikit/commit/4a09a9aafad3fd81361c9a08819ba85e37933454) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Layout): implementation of editorial policy (#4012)](https://github.com/consta-design-system/uikit/commit/7e5305677cc9e3c1e1738ebcaf76016e4825971b) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Informer): implementation of editorial policy (#4011)](https://github.com/consta-design-system/uikit/commit/4ad0fc552aa8981a4ff3b8ce528bc5f099b097f1) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(DatePicker): fixed disableDates (#4010)](https://github.com/consta-design-system/uikit/commit/9841c1e4cf29514c58f85849ebd8ff259b006afc) - [@baevm](https://github.com/baevm)

--------------------

## v5.24.1 (11/07/2025)
- [docs (FileField): implementation of editorial policy (#4005)](https://github.com/consta-design-system/uikit/commit/766fc6c537525739fb50fe56d3e3f08a7a794b17) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (File): implementation of editorial policy (#4004)](https://github.com/consta-design-system/uikit/commit/dfc80c73256efea1246d5745911650283df5dbb1) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (FieldGroup): implementation of editorial policy (#4003)](https://github.com/consta-design-system/uikit/commit/4de6dfa304c4cfcde241303935012a3b812d3bdd) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (DragNDropFieldCanary): implementation of editorial policy (#4002)](https://github.com/consta-design-system/uikit/commit/b7ff247099569ec7493c08677a25a578437634d7) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (DragNDropField): implementation of editorial policy (#4001)](https://github.com/consta-design-system/uikit/commit/d405f69cdd7e6c6ce9eb44f026a82731b901cc5a) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (DateTime): implementation of editorial policy (#4000)](https://github.com/consta-design-system/uikit/commit/4f1cee37595cac019733b961678e466859a77d37) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (ContextMenu): implementation of editorial policy (#3998)](https://github.com/consta-design-system/uikit/commit/e16904681ec6738214505f3176d5caa143592160) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (DatePicker): implementation of editorial policy (#3999)](https://github.com/consta-design-system/uikit/commit/3bf4deb877fa248a0afd2cbfc15522d301ea200c) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Combobox): implementation of editorial policy (#3997)](https://github.com/consta-design-system/uikit/commit/d113fbb11063c21790cbaf429d8bf6901b86278e) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (CollapseGroup): implementation of editorial policy (#3996)](https://github.com/consta-design-system/uikit/commit/cd03c393f848446664e03765861181da62277ce1) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Collapse): implementation of editorial policy (#3993)](https://github.com/consta-design-system/uikit/commit/bb600938a84de3eaa54b84aa66bff63ad250e534) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (ChoiceGroup): implementation of editorial policy (#3992)](https://github.com/consta-design-system/uikit/commit/cea8f332ff0b74a8009a89f4e25ee07e004daced) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (CheckboxGroup): implementation of editorial policy (#3991)](https://github.com/consta-design-system/uikit/commit/8cac0b046472fccba68785558d00d192f6ad620d) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Checkbox): implementation of editorial policy (#3990)](https://github.com/consta-design-system/uikit/commit/fe47f652dab5e9e99aac872efdd1f03fd15f1fbd) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(DatePicker): fixed caption space (#3988)](https://github.com/consta-design-system/uikit/commit/b370d3acc3772174848d43a15578a7cb9f14d3a9) - [@gizeasy](https://github.com/gizeasy)
- [fix(ContextMenu): fixed outside clicks (#4006)](https://github.com/consta-design-system/uikit/commit/30af6bf2bac78378f5889868fa404fc1e1af738e) - [@gizeasy](https://github.com/gizeasy)
- [chore: update deps](https://github.com/consta-design-system/uikit/commit/80d8582520210c181bd999492fd260e3fb0b870e) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.24.0 (01/07/2025)
BREAKING CHANGE: need to update 'compute-scroll-into-view' package

---

- [chore: update compute-scroll-into-view (#3989)](https://github.com/consta-design-system/uikit/commit/a0e25c9b5ce9bb0e22933d0fd936f8d073ae4fde) - [@gizeasy](https://github.com/gizeasy)
- [docs(Card): implementation of editorial policy (#3986)](https://github.com/consta-design-system/uikit/commit/3b34dde96864923c1c141100d20793bfb4b67cf5) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(Button): implementation of editorial policy (#3984)](https://github.com/consta-design-system/uikit/commit/d52e0a63983b6f9c263891f5976ca3ba26ae4e54) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(BadgeGroup): implementation of editorial policy (#3980)](https://github.com/consta-design-system/uikit/commit/c9d6809b98b84ab73fae38bcab5e53ebc8e7ea55) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(AutoComplete Canary): implementation of editorial policy (#3979)](https://github.com/consta-design-system/uikit/commit/c4deea006beb65b37fed1ef4ec42cbcb2aa3c094) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(AutoComplete): update docs(#3978)](https://github.com/consta-design-system/uikit/commit/cf1cdd4a3206430d1cca5ccecc9c5c826c0a07eb) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs(AvatarGroup): update docs(#3977)](https://github.com/consta-design-system/uikit/commit/4741a26e92bd303c540ba29a71c024e04f9bf485) - [@alyonurchick1](https://github.com/alyonurchick1)
- [docs (Badge): update Badge.dev.stand.mdx (#3976)](https://github.com/consta-design-system/uikit/commit/7ac0e986f48ae9b5c64b50bbe8bd9e1470ea4fbb) - [@alyonurchick1](https://github.com/alyonurchick1)

--------------------

## v5.23.0 (24/06/2025)
- [feat(PortalWithTheme): added type React.RefObject<HTMLElement> for container (#3973)](https://github.com/consta-design-system/uikit/commit/e5ec16b06484ccf7476ab40182154044a2fb55a7) - [@gizeasy](https://github.com/gizeasy)
- [docs: implementation of editorial policy (#3970)](https://github.com/consta-design-system/uikit/commit/a19f26a685d30171100812a6c0dfd07f04f8a902) - [@alyonurchick1](https://github.com/alyonurchick1)

--------------------

## v5.22.0 (10/06/2025)
- [feat: update react types (#3969)](https://github.com/consta-design-system/uikit/commit/945799c00045d8c3355260bb93288912ea99396a) - [@gizeasy](https://github.com/gizeasy)
- [fix(BookmarkTabs): fixed style (#3952)](https://github.com/consta-design-system/uikit/commit/478be7023786079f611e5f4fe4c7b11cd0d5a225) - [@gizeasy](https://github.com/gizeasy)
- [test(Switch): update tests (#3967)](https://github.com/consta-design-system/uikit/commit/e8e2774dcaf304f80d6fade8ec04080c9e7da48f) - [@gizeasy](https://github.com/gizeasy)
- [test(Radio): update tests (#3966)](https://github.com/consta-design-system/uikit/commit/6a96217428cdb15dbbce9d851ee9e17c6e9346bd) - [@gizeasy](https://github.com/gizeasy)
- [test(Checkbox): update tests (#3965)](https://github.com/consta-design-system/uikit/commit/f2b84c4cec2f73c4d65766e4556c26245bb01808) - [@gizeasy](https://github.com/gizeasy)
- [test(Card): add tests](https://github.com/consta-design-system/uikit/commit/03ad4cc9b92c3e22ec56cc0e4f10e221d73df11e) - [@gizeasy](https://github.com/gizeasy)
- [test(Button): updating tests](https://github.com/consta-design-system/uikit/commit/8bc10215386c911816ce73eb0d20561dd01adf81) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.21.0 (06/06/2025)
Самое важное:
- В `ThemeToggler` добавили анимацию смены иконок
- Актуализировали тесты для `Breadcrumbs`, `BadgeGroup` и `AvatarGroup`

---

- [test(Breadcrumbs): add tests (#3962)](https://github.com/consta-design-system/uikit/commit/ecda95a991c9e26da7422cadc976ba02f1b820bf) - [@gizeasy](https://github.com/gizeasy)
- [test(BadgeGroup): add tests (#3949)](https://github.com/consta-design-system/uikit/commit/e3401506883ecdd447a175ffa61ddd8567b4772a) - [@gizeasy](https://github.com/gizeasy)
- [test(Badge): add tests (#3948)](https://github.com/consta-design-system/uikit/commit/13830f4ec7fcd02823e0d5db918b8dcf417d84eb) - [@gizeasy](https://github.com/gizeasy)
- [fix(FieldWrapper): change gap for size=s (#3947)](https://github.com/consta-design-system/uikit/commit/f9082c578bd8176527b7bd4e8244c26112500a68) - [@baevm](https://github.com/baevm)
- [test(AvatarGroup): add tests (#3946)](https://github.com/consta-design-system/uikit/commit/06f0b1abd7e95e4f89af378d1a91113bae431868) - [@gizeasy](https://github.com/gizeasy)
- [feat(ThemeToggler): added animation for switching icons (#3945)](https://github.com/consta-design-system/uikit/commit/0a9162948f754b109477e512be0fe2ef2e5fbfcc) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.20.2 (28/05/2025)
- [fix(UserSelect): correction of name circumcision (#3942)](https://github.com/consta-design-system/uikit/commit/26f34c915063688798aee90f9018414821274072) - [@klekovvlad](https://github.com/klekovvlad)
- [chore: fixed build](https://github.com/consta-design-system/uikit/commit/307bffd73ab798f41910c811ccea75f26927b324) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.20.0 (23/05/2025)
Самое важное:
- Добавили в `Tooltip` свойство `container` для возможности указания родительского контейнера для рендера.

---

- [fix(Select, Combobox): fixed unfocus in firefox (#3939)](https://github.com/consta-design-system/uikit/commit/4470abaa8ea8a2d6cda8e7e9c7fca715d762bbf9) - [@gizeasy](https://github.com/gizeasy)
- [feat(Tooltip): adds container prop (#3930)](https://github.com/consta-design-system/uikit/commit/daf1cbe28273b3d18017f681352932a70208b547) - [@baevm](https://github.com/baevm)
- [chore: fixed build](https://github.com/consta-design-system/uikit/commit/42801758a1893b7e695d56b8e0f888592becfc27) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.19.0 (05/05/2025)
Самое важное:
- Добавлен новый компонент `Select(canary)` который обеспечивает функционал `Combobox` и `Select`.

---

- [feat(Select): add canary component (#3907)](https://github.com/consta-design-system/uikit/commit/3ad5947067ff13daee9a0732167503f67ae2c751) - [@gizeasy](https://github.com/gizeasy)
- [docs: replace informers (#3920)](https://github.com/consta-design-system/uikit/commit/8bf61a1d1127ba3339d2832932633b2eb054aa39) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(Attachment): fixes attachment actions key (#3923)](https://github.com/consta-design-system/uikit/commit/d4a2b99b36c8b123eacd7ab84a60c0488f0a0a1b) - [@baevm](https://github.com/baevm)

--------------------

## v5.18.0 (11/04/2025)
Самое главное:
- В `Tabs` добавлен `getItemKey` для возможности указывать произвольный ключ.
- Добавлены тесты для `Avatar`, `AutoComplete`, `Attachment` и `FieldComponents`.

---

- [fix(Transition): fixed findDOMNode is not a function in react 19 (#3922)](https://github.com/consta-design-system/uikit/commit/9a071fbbf0fd24f38bdf10da4a30f531a70886ec) - [@gizeasy](https://github.com/gizeasy)
- [test(Avatar): add tests](https://github.com/consta-design-system/uikit/commit/761ec46d442f14d75a2a90ada56cf127dff9c533) - [@gizeasy](https://github.com/gizeasy)
- [test(AutoComplete): add tests (#3913)](https://github.com/consta-design-system/uikit/commit/f728b6a448ae2207e5cc8b75de503244b2ffda71) - [@gizeasy](https://github.com/gizeasy)
- [docs: fix docs typos (#3902)](https://github.com/consta-design-system/uikit/commit/671d545de0ebb667d4f6a3ea87c3191b2cbf46e1) - [@baevm](https://github.com/baevm)
- [feat(Tabs, BookmarkTabs): add getItemKey for Tabs, fix empty tabs render problem for BookmarkTabs](https://github.com/consta-design-system/uikit/commit/84649da176a7e42a8c0ac5a59c2cc0516e9eaace) - [@ZettZet](https://github.com/ZettZet)
- [test(Attachment, FieldComponents): add tests (#3910)](https://github.com/consta-design-system/uikit/commit/38e9c667edee8b7f11b926ea555de280b135f1ef) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.17.0 (09/01/2025)
Самое важное:
- Добавили новый `canary` компонент `Steps`. Полностью переработали дизайн компонента и добавили новые возможности.

---

- [test(StepsCanary): edit tests](https://github.com/consta-design-system/uikit/commit/7a57287ad45afb9d066ea55b186812629cf34ed7) - [@gizeasy](https://github.com/gizeasy)
- [feat(StepsCanary): new canary component (#3861)](https://github.com/consta-design-system/uikit/commit/a62788e19d34bc78681148bc70fb812197fa2706) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.16.0 (12/12/2024)
Самое важное:
- В `Attachment` добавили возможность указывать несколько кнопок с действиями.
- В `Loader` добавили новый тип компонента и возможность указывать произвольный размер и цвет.
- В `Tag` добавили свойство `disabled`.

---

- [test(Attachment): fix test](https://github.com/consta-design-system/uikit/commit/3294b2115a8815e6b3f55b203ab05a57105f0398) - [@gizeasy](https://github.com/gizeasy)
- [feat(Attachment): add actions (#3846)](https://github.com/consta-design-system/uikit/commit/3728cab89756bd790eea304636186bf88201ebea) - [@gizeasy](https://github.com/gizeasy)
- [feat(Loader): add _view_circle (#3849)](https://github.com/consta-design-system/uikit/commit/8a2180b73709a30b69cb060e1b70d4f32b7cd6a5) - [@gizeasy](https://github.com/gizeasy)
- [chore(cspell): add  --no-progress flag (#3851)](https://github.com/consta-design-system/uikit/commit/7e7004f8a830b497e433a68e17fae6d31dfefb29) - [@gizeasy](https://github.com/gizeasy)
- [docs(edit cspell) (#3845)](https://github.com/consta-design-system/uikit/commit/c74c489c6c6429d6cda5cd96b1a0a4a39d6bc551) - [@alyonurchick1](https://github.com/alyonurchick1)
- [fix(DatePicker): fixed visited date (#3850)](https://github.com/consta-design-system/uikit/commit/71e1a1f72e0cde38a06c19b09474459aaf4722da) - [@gizeasy](https://github.com/gizeasy)
- [feat(Tag): add disabled prop (#3841)](https://github.com/consta-design-system/uikit/commit/a1c40e61b23d836d58250d39884082fcbb01d648) - [@baevm](https://github.com/baevm)

--------------------

## v5.15.0 (26/11/2024)
Самое главное:
- В `TextField` добавили поддержку onWheel и отключили его действие по умолчанию для `type="number"`.
- В `Steps` обернули номер шага в `<span/>` для возможности стилизации.
- Исправили опечатки по всему проекту.

---

- [fix(Informer): fixed icon position (#3831)](https://github.com/consta-design-system/uikit/commit/f57e24a5ce1af47c5d0fb5ff3b9df97c32471853) - [@gizeasy](https://github.com/gizeasy)
- [docs(Switch): update onChange docs for Switch (#3829)](https://github.com/consta-design-system/uikit/commit/0b43f0f967f30f347e54ddfcad9c69cfbe84d55f) - [@vitaliidasaev](https://github.com/vitaliidasaev)
- [fix: misprint (#3828)](https://github.com/consta-design-system/uikit/commit/1cc4e4076001461cea6d1d74615f960348416663) - [@gizeasy](https://github.com/gizeasy)
- [feat(TextField): add wheel event handler for input[type="number"] (#3820)](https://github.com/consta-design-system/uikit/commit/7fb111e571d24a45f2204bbed0e66be1224ccf81) - [@belk1ng](https://github.com/belk1ng)
- [feat(Steps): add wrapper to step index (#3821)](https://github.com/consta-design-system/uikit/commit/b46890555deac4530b4f82fb959482ccddd47780) - [@belk1ng](https://github.com/belk1ng)
- [fix(Slider): fix value changing after click with disabled prop (#3822)](https://github.com/consta-design-system/uikit/commit/eb818a974a94a7294f2b12eccb646770b11b8d6e) - [@belk1ng](https://github.com/belk1ng)
- [fix(TextFieldCanary): fixed import (#3819)](https://github.com/consta-design-system/uikit/commit/88c9a63cb5a99d700360a8a78fb45be6e4142f6c) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.14.0 (13/11/2024)
Самое важное:
- В `SnackBar` добавили возможность указать прогресс.
- В `Badge` добавили модификации `_view_pinted` и `_status_disabled`.
- В `Popover` добавили возможность указать родительский контейнер.

---

- [fix(FieldComponents): fixed import (#3817)](https://github.com/consta-design-system/uikit/commit/3570773d39dd9209cd7c143dc6e2e9e2c986e3e5) - [@gizeasy](https://github.com/gizeasy)
- [feat(SnackBar): add progress (#3796)](https://github.com/consta-design-system/uikit/commit/0cb9703b6a9956aaf2563717fd471a79d67b6d10) - [@gizeasy](https://github.com/gizeasy)
- [feat(Badge): add _view_pinted and _status_disabled (#3792)](https://github.com/consta-design-system/uikit/commit/04e198e5261fbf69df6de065a89fc5f791773319) - [@gizeasy](https://github.com/gizeasy)
- [feat(Popover): add container property (#3812)](https://github.com/consta-design-system/uikit/commit/00c224a26cfd9b14f2959f2f9d9891bd91f2642a) - [@ZettZet](https://github.com/ZettZet)

--------------------

## v5.13.0 (31/10/2024)
Самое важное:
- В `Informer` добавили новый вид `outline`.

---

- [docs(TextField): remove wrapper from stand (#3793)](https://github.com/consta-design-system/uikit/commit/e9d1b61da756986bbe43dedb89378d149adc2b89) - [@gizeasy](https://github.com/gizeasy)
- [feat(Informer): add _view_outline (#3791)](https://github.com/consta-design-system/uikit/commit/35d82b078711f6b61238e73336c16ad1f9b4a5e3) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.12.0 (23/10/2024)
Самое важное:
- добавили новый компонент `AutoComplete(Canary)`. В отличие от старого компонента в нем появилась возможность множественного значения value.
- в `DatePicker` добавили возможность исключать периоды дат и времени с помощью `disableDates`.

---

- [feat(AutoComplete): add canary component (#3780)](https://github.com/consta-design-system/uikit/commit/4e6de1ad3a58a368e3b3f719f7d91d184b078f5e) - [@gizeasy](https://github.com/gizeasy)
- [feat(DatePicker): add disableDates (#3788)](https://github.com/consta-design-system/uikit/commit/5acafb7cfeea97d53ff5476f102db21bb3b57173) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.11.0 (16/10/2024)
Самое важное:
- Компонент Table помечен как deprecated, чтобы уже сейчас вы готовились к переходу на  библиотеку @consta/table. Поддержка компонента в @consta/uikit v6 закончится, но еще останется в составе библиотеки.

---

- [fix(ProgressStepBar): add validate activeStepIndex (#3784)](https://github.com/consta-design-system/uikit/commit/a32b963845232bf219d176f86ebcecea5224eed4) - [@gizeasy](https://github.com/gizeasy)
- [feat(Table): mark us deprecated (#3782)](https://github.com/consta-design-system/uikit/commit/d0929e9af9782ec6eeab78e1a45d017cb813aea8) - [@gizeasy](https://github.com/gizeasy)
- [chore: update deps (#3783)](https://github.com/consta-design-system/uikit/commit/686b01decf984754dc69d7831cda5915a2d3e363) - [@gizeasy](https://github.com/gizeasy)
- [fix(Picture): remove console.log (#3775)](https://github.com/consta-design-system/uikit/commit/b3f4f1dd8f494547d619e9717ef5f58955d1e2b4) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v5.10.0 (04/10/2024)
Самое важное:
- Включили набор компонентов `FieldComponents` для создания собственных полей ввода
- Добавили возможность импортировать отдельные компоненты по свойству `type` из `TextField`
- Добавили новый тип `textarray` для `TextField`
- В `TextField` реализовали ручное управление размерами для типа `textarea`
- В `Text` добавили значения `extralight` и `extrabold` для свойства `weight`

---

- [feat(TextField): add canary component (#3771)](https://github.com/consta-design-system/uikit/commit/c5f94d20625ee9bc41c30576907449fb1e49b652) - [@gizeasy](https://github.com/gizeasy)
- [feat(Text): add _weight_extralight and _weight_extrabold (#3766)](https://github.com/consta-design-system/uikit/commit/dacbdbd954324fd83d149b3bdd17f693ab7245ca) - [@gizeasy](https://github.com/gizeasy)
