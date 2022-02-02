# Changelog

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

--------------------

## v3.8.0 (20/10/2021)
Вечер. Среда. Consta. Новый релиз!

Добавили `ProgressStepBar` — компонент, с которым удобно считать шаги. 

Ну и важные и не очень важные мелочи, как без них :)

---

- [feat(ProgressStepBar): add new component (#1643)](https://github.com/gazprom-neft/consta-uikit/commit/d0e6a9564ebaaeddaffe9924c554b85e8aa673ed) - [@N1MBER](https://github.com/N1MBER)
- [fix(Modal): fix unclickable overlay (#1685)](https://github.com/gazprom-neft/consta-uikit/commit/ffaaa827ea55413898ce9ee97983562f58969f45) - [@N1MBER](https://github.com/N1MBER)
- [docs(Text):  update docs(#1680)](https://github.com/gazprom-neft/consta-uikit/commit/e933d2dfdd4662cbcaf6675a6ee9f0e67df09e7f) - [@arhayka](https://github.com/arhayka)
- [chore(ISSUE_TEMPLATE): cleared assignees](https://github.com/gazprom-neft/consta-uikit/commit/6f299f28e71889bceb821665eee8149ec32f0f0f) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.7.0 (13/10/2021)
Сегодня выкатили DatePiker! Пока в режиме Canary, но мы всё равно пританцовываем от радости 💃

---

- [feat(DatePicker): add component (#1650)](https://github.com/gazprom-neft/consta-uikit/commit/e88f5d371d6b3c7db2d71ec438fb258fbe906946) - [@gizeasy](https://github.com/gizeasy)
- [docs(storybook): fix figma links (#1655)](https://github.com/gazprom-neft/consta-uikit/commit/6f81480e9347120c53d3d3bacdb12ba2d122fe80) - [@hell0anna](https://github.com/hell0anna)
- [feat(ProgressSpin): add new size map (#1648)](https://github.com/gazprom-neft/consta-uikit/commit/34774ed94c103a4f22eb2a43f749811dc4be9e51) - [@N1MBER](https://github.com/N1MBER)
- [fix(TableTextFilter): fixed reset button (#1639)](https://github.com/gazprom-neft/consta-uikit/commit/8e9fa1c466c977e6e5e151e56b7e398920b17d7c) - [@yekaterinadochinetsnedra](https://github.com/yekaterinadochinetsnedra)

--------------------

## v3.6.0 (06/10/2021)
Ура, добавили `DateTime` — новый компонент для выбора даты и времени, заменяет `Calendar`. (`Calendar` работает, но с меткой `Deprecated`)

И ещё несколько небольших обновлений:
— в `SnackBar` теперь можно положить любую вёрстку,
— в `ChoiceGroup` можно сделать неактивным один или несколько элементов,
— в `TextField`, `Select`, `Combobox` и `UserSelect` добавили подсказку и заголовок (`label` и `caption`),
— в `Select`, `Combobox` и `UserSelect` — возможность указывать статус поля,
— а ещё обновили документацию для `Modal`, `Table` и `Layout`.

---

- [chore(deps): bump url-parse from 1.5.1 to 1.5.3 (#1638)](https://github.com/gazprom-neft/consta-uikit/commit/97a83093a9575b142fe948b36d9093e4533e93fa) - [@dependabot](https://github.com/dependabot[bot])
- [docs(Layout): edit docs (#1640)](https://github.com/gazprom-neft/consta-uikit/commit/fba6187dd31696d21e6b705ed02a7c48d0ca01f2) - [@arhayka](https://github.com/arhayka)
- [docs(Table): docs review (#1637)](https://github.com/gazprom-neft/consta-uikit/commit/2f045ec229a641e9ab049e80b03cef92728c5f59) - [@arhayka](https://github.com/arhayka)
- [ feat(SelectContainer): add status (#1623)](https://github.com/gazprom-neft/consta-uikit/commit/23f6f9761c1d0dbd31cad0bc7305bb64aed3ba7f) - [@N1MBER](https://github.com/N1MBER)
- [fix(DateTime): fixed onChangeCurrentVisibleDate](https://github.com/gazprom-neft/consta-uikit/commit/323f25a0fbbe912b308ff8fbbea81a50f52153a6) - [@gizeasy](https://github.com/gizeasy)
- [feat(DateTime): add component (#1422)](https://github.com/gazprom-neft/consta-uikit/commit/b8d2d7dac3043f4cc6279d6349f0158267e7269e) - [@gizeasy](https://github.com/gizeasy)
- [docs(Combobox): docs review (#1622)](https://github.com/gazprom-neft/consta-uikit/commit/e55f45cc5a114c432160306f803d63a4ff316210) - [@arhayka](https://github.com/arhayka)
- [docs(Modal): edit docs and examples (#1626)](https://github.com/gazprom-neft/consta-uikit/commit/4e82d95385eabd9f23de5a49d738c625b4e6cdb5) - [@arhayka](https://github.com/arhayka)
- [feat(ChoiceGroup): added setting disabled (#1575)](https://github.com/gazprom-neft/consta-uikit/commit/d6bf274533fe88434474fb55c2e9709e1a86f402) - [@AntonS86](https://github.com/AntonS86)
- [test(TextField): fix test](https://github.com/gazprom-neft/consta-uikit/commit/df48bd381f8dc29bcd2b2841e68e857f6fd3c9c4) - [@gizeasy](https://github.com/gizeasy)
- [feat(Collapse): add divider from label to body (#1625)](https://github.com/gazprom-neft/consta-uikit/commit/dbd5582a0ad0b56f0c82a9080288b2147a780cf3) - [@N1MBER](https://github.com/N1MBER)
- [docs(RadioGroup): add align example (#1619)](https://github.com/gazprom-neft/consta-uikit/commit/70d2c2ebf3852af82b4d10a273377d86abad0df8) - [@arhayka](https://github.com/arhayka)
- [fix(SnackBar): fix bug with not working autoclose in storybook (#1618)](https://github.com/gazprom-neft/consta-uikit/commit/ab721fabea22486251e0b6e12b35571769bee428) - [@N1MBER](https://github.com/N1MBER)
- [feat(FieldLabel): add components (#1606)](https://github.com/gazprom-neft/consta-uikit/commit/573c7cc7a9333156cf28389f89f15fc86e133e2a) - [@N1MBER](https://github.com/N1MBER)
- [fix(Switch): updated background-color disabled state (#1591)](https://github.com/gazprom-neft/consta-uikit/commit/440f1d750463290c887f99ffbfd58719ec75f52e) - [@AntonS86](https://github.com/AntonS86)
- [feat(SnackBar): Adding the ability to pass a React component (#1574)](https://github.com/gazprom-neft/consta-uikit/commit/943b81287eb5b6de1c6e28e3b13331e4a6bbe4c3) - [@N1KN](https://github.com/N1KN)
- [feat(EventInterceptor): Fix typings of usePropsHandler (#1563)](https://github.com/gazprom-neft/consta-uikit/commit/590bfa4a1e5fbea50a14a7b6ff8438ce0c7e641d) - [@N1KN](https://github.com/N1KN)

--------------------

## v3.5.0 (29/09/2021)
Важное из обновления:
- Добавили новый компонент `Layout`
- Расширили функционал таблицы

---

- [feat(Table): Add create row button; (#1611)](https://github.com/gazprom-neft/consta-uikit/commit/2b842b2de2b9814bd00c4cfac66e52a05262d695) - [@N1KN](https://github.com/N1KN)
- [docs(Card): edit docs (#1613)](https://github.com/gazprom-neft/consta-uikit/commit/af8ae24da9c0795b0abb284062548ff435fd6f02) - [@arhayka](https://github.com/arhayka)
- [feat(Layout): add new component (#1554)](https://github.com/gazprom-neft/consta-uikit/commit/4037e2a9204988da215f7a8c65823bf051c84c64) - [@N1MBER](https://github.com/N1MBER)
- [feat(Text): added prop ellipsis and update docs (#1566)](https://github.com/gazprom-neft/consta-uikit/commit/4e2529b81072d23f5a3d88f780c61557e1dcb16c) - [@AntonS86](https://github.com/AntonS86)
- [fix(Theme): Remove css variable --color-nums-shadow (#1590)](https://github.com/gazprom-neft/consta-uikit/commit/b41e8e5c56738058dd62f7474523bda532773682) - [@N1KN](https://github.com/N1KN)
- [test(Table): added test for checking onFiltersUpdated call (#1607)](https://github.com/gazprom-neft/consta-uikit/commit/660765c5699270d43040a8ce0b7726c7b699568a) - [@AntonS86](https://github.com/AntonS86)
- [feat(Sidebar): added property 'size' (#1588)](https://github.com/gazprom-neft/consta-uikit/commit/756fc839009932b5c37d7aadfcae6f40c1090119) - [@AntonS86](https://github.com/AntonS86)
- [feat(Table): Add getTagLabel props (#1531)](https://github.com/gazprom-neft/consta-uikit/commit/2d866722d753740629438391afa23204a2141ace) - [@N1KN](https://github.com/N1KN)
- [feat(Table): Add getComparisonValue function (#1570)](https://github.com/gazprom-neft/consta-uikit/commit/56fc45d253ca79936d5d50d6caae80fd850b3338) - [@N1KN](https://github.com/N1KN)
- [fix(Modal): added nodeRef for CssTransition (#1600)](https://github.com/gazprom-neft/consta-uikit/commit/9ab034375657559c016810962280e0c9f770283f) - [@AntonS86](https://github.com/AntonS86)
- [test(Table): added test for onRowClick (#1602)](https://github.com/gazprom-neft/consta-uikit/commit/31d1d1cd8161b0ada6d322a3ef1e77c88b5ec35b) - [@AntonS86](https://github.com/AntonS86)
- [test(Modal_Sidebar): added tests for events when the escape key is pressed (#1603)](https://github.com/gazprom-neft/consta-uikit/commit/e03b59ce8bed50e5ce76adebb7f08d584fcf9d47) - [@AntonS86](https://github.com/AntonS86)

--------------------

## v3.4.0 (22/09/2021)
- [chore(deps): bump tmpl from 1.0.4 to 1.0.5 (#1583)](https://github.com/gazprom-neft/consta-uikit/commit/c7abe9ee09d845d2d602fe529c9948d6e959df04) - [@dependabot](https://github.com/dependabot[bot])
- [fix(Table): added check for filters and tests (#1561)](https://github.com/gazprom-neft/consta-uikit/commit/8c02bd71a04b24b5df40cdd7508dbd0a50a7311a) - [@AntonS86](https://github.com/AntonS86)
- [docs(common): rewrite main page (#1573)](https://github.com/gazprom-neft/consta-uikit/commit/87fa76085e69700cb35379de7deb13d7c69c121d) - [@arhayka](https://github.com/arhayka)
- [fix(Table): edited appearance TableFilterContainer and TableFilterTooltip (#1550)](https://github.com/gazprom-neft/consta-uikit/commit/22ef3f1d9fc4e6f0e1ad8a9b6f96f47311dc6f64) - [@AntonS86](https://github.com/AntonS86)
- [chore(commitizen): change footer (#1586)](https://github.com/gazprom-neft/consta-uikit/commit/93033456822df519ae9d346607dfbf96b0a03d2d) - [@gizeasy](https://github.com/gizeasy)
- [feat(SnackBar): Add hideTimer props (#1552)](https://github.com/gazprom-neft/consta-uikit/commit/a03df88c26d66f363b0dd8e0d4491d7975380963) - [@N1KN](https://github.com/N1KN)
- [feat(Table): added default sort (#1545)](https://github.com/gazprom-neft/consta-uikit/commit/8126255aa82605c2542fea4e127e77d36cd577e2) - [@AntonS86](https://github.com/AntonS86)
- [feat(Table): added ref to component parameters (#1518)](https://github.com/gazprom-neft/consta-uikit/commit/c87693262ba3e25053c59f88dcece04c821c4145) - [@AntonS86](https://github.com/AntonS86)
- [docs(MixCard): edit docs, add examples (#1562)](https://github.com/gazprom-neft/consta-uikit/commit/4f7a4027b47f9075d4e1b7f97ebd8889b878803b) - [@arhayka](https://github.com/arhayka)

--------------------

## v3.3.0 (15/09/2021)
**Важное из обновления:**
- В компонентах `Modal` и `SideBar` добавлена возможность закрытия по нажатию `Esc`
- Добавлен хук `useGlobalKeys` для подписки на нажатия клавиш
---

- [feat(withTooltip,ContextMenuLevel): Fixed typings & typos (#1549)](https://github.com/gazprom-neft/consta-uikit/commit/4b142d3f593ef2282351a79ef4e383c5e2670888) - [@N1KN](https://github.com/N1KN)
- [fix(TextField): change type of component properties (#1474)](https://github.com/gazprom-neft/consta-uikit/commit/9f4411861b612b1622dffa0d1719040bd8d0811c) - [@N1MBER](https://github.com/N1MBER)
- [docs(Table): updated doc for activeRow props (#1527)](https://github.com/gazprom-neft/consta-uikit/commit/ed41c0ded7dd65bf90989580b69804f6d0530e50) - [@AntonS86](https://github.com/AntonS86)
- [feat(Modal, SideBar): close by esc (#1498)](https://github.com/gazprom-neft/consta-uikit/commit/3888bb602cd1eb505fd81c516327a9febfe7cccb) - [@N1KN](https://github.com/N1KN)

--------------------

## v3.2.0 (08/09/2021)
**Важное из обновления:**
- Добавлен миксин `MixCard`
- Добавлен компонент `Card`
- Переработана документация по тематизации

---

- [docs(MixCard): moved docs to stories.mdx](https://github.com/gazprom-neft/consta-uikit/commit/9a2e042e699f543fc3c6812e22149279bdd2607d) - [@gizeasy](https://github.com/gizeasy)
- [ docs(Mixin): add documentation for MixCard (#1532)](https://github.com/gazprom-neft/consta-uikit/commit/f9bfbf218146605e15c9e0639be7797f19c95cd1) - [@N1MBER](https://github.com/N1MBER)
- [feat(Card): add mixin and component card(#1508)](https://github.com/gazprom-neft/consta-uikit/commit/11737b816db2784ba11e2a5131d1b72fd043dab7) - [@N1MBER](https://github.com/N1MBER)
- [feat(TabsFitModeScrollWrapper): add native scroll (#1528)](https://github.com/gazprom-neft/consta-uikit/commit/bb08d735f9596c18cf36184caa736b6e5864dc32) - [@N1MBER](https://github.com/N1MBER)
- [chore(deps): bump path-parse from 1.0.6 to 1.0.7 (#1418)](https://github.com/gazprom-neft/consta-uikit/commit/bb1c90c552320e844ec837b4ceba702b6f928c2b) - [@dependabot](https://github.com/dependabot)
- [chore(deps): bump tar from 4.4.13 to 4.4.19 (#1471)](https://github.com/gazprom-neft/consta-uikit/commit/00b14353fbad6ac9e4c27047d515d68a16a1e99d) - [@dependabot](https://github.com/dependabot)
- [docs(thematization): rewrite docs about theme (#1454)](https://github.com/gazprom-neft/consta-uikit/commit/f5078d803e574d9a5592f9aacb0aad69129c9286) - [@arhayka](https://github.com/arhayka)
- [docs(Theme): rewrite docs (#1507)](https://github.com/gazprom-neft/consta-uikit/commit/d64e2bfc6aadb74da8ed81a681e82a884b504a74) - [@arhayka](https://github.com/arhayka)
- [docs(BasicSelect): docs review (#1509)](https://github.com/gazprom-neft/consta-uikit/commit/50fedaf120b9b743f4fe31042c29348d57e1b81f) - [@arhayka](https://github.com/arhayka)
- [docs(Button): review docs (#1510)](https://github.com/gazprom-neft/consta-uikit/commit/8a1b02a2b65c2913699f96f774c8e7b7056e0ff6) - [@arhayka](https://github.com/arhayka)
- [docs(Checkbox): docs review (#1511)](https://github.com/gazprom-neft/consta-uikit/commit/4e7e4a55e1a1ade876c3dbec9885e6fba1e7f22f) - [@arhayka](https://github.com/arhayka)
- [docs(ComboboxDeprecated): docs review (#1512)](https://github.com/gazprom-neft/consta-uikit/commit/a32e2dcb0f8d0b87750f015a56423908dea6a9bc) - [@arhayka](https://github.com/arhayka)
- [docs(ChoiceGroup): docs review (#1516)](https://github.com/gazprom-neft/consta-uikit/commit/a51c36be27166507bf4c5749719b9a2243a0d2df) - [@arhayka](https://github.com/arhayka)
- [docs(ContextMenu): docs review (#1517)](https://github.com/gazprom-neft/consta-uikit/commit/c722ac8131756a0f1272076c1b78526616cfd8f5) - [@arhayka](https://github.com/arhayka)
- [docs(FileField): docs review (#1519)](https://github.com/gazprom-neft/consta-uikit/commit/beeb37d572d0bbf954fc7f51b1e5789de37e43b9) - [@arhayka](https://github.com/arhayka)
- [docs(MultiComboboxDepecated): docs review (#1520)](https://github.com/gazprom-neft/consta-uikit/commit/f0d9494f47c7fcd5ed512bfa8e27cf8048d1b8a1) - [@arhayka](https://github.com/arhayka)
- [docs(Select): docs review (#1521)](https://github.com/gazprom-neft/consta-uikit/commit/aadbecf0847672a22f5f9349db4ce6ed5522fc7b) - [@arhayka](https://github.com/arhayka)
- [docs(Switch): docs review (#1522)](https://github.com/gazprom-neft/consta-uikit/commit/c53b08a390e5469cb57d2bc5612113cca22830be) - [@arhayka](https://github.com/arhayka)
- [docs(SwitchGroup): edit docs, add examples (#1529)](https://github.com/gazprom-neft/consta-uikit/commit/edef830232e32fb5e6fe6b6be8d5304948af7418) - [@arhayka](https://github.com/arhayka)
- [fix(components): fix misprint (#1526)](https://github.com/gazprom-neft/consta-uikit/commit/656cedf4b25eeffd7f170daa270bd102a2b19ad3) - [@kolebayev](https://github.com/kolebayev)
- [refactor(Checkbox): refactor ref (#1514)](https://github.com/gazprom-neft/consta-uikit/commit/5e1f48ab70bfb9b3a313c4a7cf4f70f2c0ce3893) - [@gizeasy](https://github.com/gizeasy)
- [feat(Text): Add underline & cursor props (#1513)](https://github.com/gazprom-neft/consta-uikit/commit/ae964fb334536bc86a7c584da5ce90e6d3ec6a57) - [@N1KN](https://github.com/N1KN)
- [fix(Table): setting automatic column width when changing the window width (#1505)](https://github.com/gazprom-neft/consta-uikit/commit/57d05fc1f8a673f3e814f8ecf6fa8d59892e6ea2) - [@AntonS86](https://github.com/AntonS86)
- [feat(TableNumberFilter): added className props (#1502)](https://github.com/gazprom-neft/consta-uikit/commit/3ced9f3a2e8de0de014dadec530996c2e6d345a2) - [@AntonS86](https://github.com/AntonS86)
- [feat(Table): add onRowClick callback (#1489)](https://github.com/gazprom-neft/consta-uikit/commit/69e2059bb9f9582b96442107b384acd5526d8fe9) - [@N1KN](https://github.com/N1KN)
- [fix(Table): added a wrapper for an empty placeholder, if placeholder is a string (#1497)](https://github.com/gazprom-neft/consta-uikit/commit/6044130d3fc5dc614e3defce7527c62d18cfee5f) - [@AntonS86](https://github.com/AntonS86)
- [refactor(Attach, Attachment): rename Attach to Attachment (#1500)](https://github.com/gazprom-neft/consta-uikit/commit/c72d379b6d10b8808f223f00d7b51f05efbc178f) - [@N1KN](https://github.com/N1KN)
- [fix(Table): fixed onFiltersUpdated not called on removeAllSelectedFilters (#1493)](https://github.com/gazprom-neft/consta-uikit/commit/07a1cf5cd7414a54b3007cc54658142bc2bb5a7a) - [@N1KN](https://github.com/N1KN)
- [chore(gh-actions): add action for automatic test](https://github.com/gazprom-neft/consta-uikit/commit/5e6cd1e7ed99047a8c214877542ce20b17ce0962) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v3.1.0 (01/09/2021)
- [chore(yarn.lock): fixed deps](https://github.com/gazprom-neft/consta-uikit/commit/07d3039d29fd3fa175e8083444d96a066939e77a) - [@gizeasy](https://github.com/gizeasy)
- [docs(common): add how to docs, edit common docs (#1470)](https://github.com/gazprom-neft/consta-uikit/commit/e7787ab396d931c620f62cd959c448340842023a) - [@arhayka](https://github.com/arhayka)
- [fix(useSelect): fixed clear button on empty select  (#1473)](https://github.com/gazprom-neft/consta-uikit/commit/b918af45477a969b0a6b0273c1b8de414298ccfb) - [@N1KN](https://github.com/N1KN)
- [feat(RadioGroup): add new property for RadioGroup (align) (#1465)](https://github.com/gazprom-neft/consta-uikit/commit/ce4efd071dd761d8d0da4bbe3746f2585fecc717) - [@N1MBER](https://github.com/N1MBER)
- [fix(cn fuction): fix bug with cn fuction](https://github.com/gazprom-neft/consta-uikit/commit/8c33625c46810cb4170b15d40620568e339157ca) - [@N1MBER](https://github.com/N1MBER)
- [refactor(SnackBar): change description of props types](https://github.com/gazprom-neft/consta-uikit/commit/4f486dc1aca18219f986e9d49c2b4e6b90286666) - [@N1MBER](https://github.com/N1MBER)
- [refactor(Tooltip): delete preview container from tooltip documentation](https://github.com/gazprom-neft/consta-uikit/commit/4651448dadd54721f7528ab91a4da022856925df) - [@N1MBER](https://github.com/N1MBER)

--------------------

## v3.0.1 (25/08/2021)
- [fix(Tabs): active tab was not calculated properly for unmemoized items](https://github.com/gazprom-neft/consta-uikit/commit/66c1f4aeab84a0e227641a5c7aea5b104bea8595) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): open "more tabs" popup to the right if there's no space to open it fully](https://github.com/gazprom-neft/consta-uikit/commit/f9f777bbcb1f2e629b844b09356bfadfa55656a6) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): updated list offset in vertical orientation according to design](https://github.com/gazprom-neft/consta-uikit/commit/5077a743932219c1caaea11b5aa0fe5596a1c971) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): incorrect line size after changing tabs direction](https://github.com/gazprom-neft/consta-uikit/commit/ee6616d24c11db0b074d19537c304aa5e1978f41) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): tabs don't break on new line in vertical orientation](https://github.com/gazprom-neft/consta-uikit/commit/10539c33a5c798d2c3e884443d4419aa3346c17c) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): "more items" dropdown doesn't appear in Safari](https://github.com/gazprom-neft/consta-uikit/commit/443c4562ae5dc5fbfc6c7861ef21bde43b48868d) - [@nekitk](https://github.com/nekitk)
- [fix(Tabs): tabs doesn't change on small screen in scroll mode](https://github.com/gazprom-neft/consta-uikit/commit/fde863b183a0a2579fce0b00bbfe5b5abecca1f1) - [@nekitk](https://github.com/nekitk)

--------------------

## v3.0.0 (18/08/2021)
**Важное из обновления:**

Переработали компонент `Tabs`, добавили новые возможности (горизонтальная прокрутка, возможность отображать Badge и другие). Вертикальные `Tabs` теперь не только в Figma, но и в коде!

**Внимание**: свойство `renderItem` обратно не совместимо.

---

- [docs(readme): edit readme (#1433)](https://github.com/gazprom-neft/consta-uikit/commit/9d5c28b594a1afebf2000637457301ccbfcb90dd) - [@arhayka](https://github.com/arhayka)
- [docs(Tabs): edit docs, add examples (#1421)](https://github.com/gazprom-neft/consta-uikit/commit/3aa860e8229578876c68311b48a0c7c59459c071) - [@arhayka](https://github.com/arhayka)
- [chore(gren): edit config](https://github.com/gazprom-neft/consta-uikit/commit/e83d823e2d82cf7a09a430fc1fa1b12ae1cecd51) - [@gizeasy](https://github.com/gizeasy)
- [fix(DragNDropField): show custom view while dragging files (#1378)](https://github.com/gazprom-neft/consta-uikit/commit/1ce1fb0b6661e43e080cbd8e719b5ae238f5cf66) - [@nekitk](https://github.com/nekitk)
- [feat(Tabs): added new items fit mode - scroll](https://github.com/gazprom-neft/consta-uikit/commit/408c7d7cc03803603cb2bc0bd4102a69c8b049cf) - [@nekitk](https://github.com/nekitk)
- [feat(Tabs): adapt tabs to available width by hiding unfitting tabs in dropdown](https://github.com/gazprom-neft/consta-uikit/commit/874087f0504b751c775a50fc84be59bc03072eca) - [@nekitk](https://github.com/nekitk)
- [feat(Tabs): added line position variants](https://github.com/gazprom-neft/consta-uikit/commit/d4fa13f4dbcec6764b5249a65cca8f7d1b8091a0) - [@nekitk](https://github.com/nekitk)

--------------------

## v2.2.1 (11/08/2021)
- [test(DragNDropField): fix tests](https://github.com/gazprom-neft/consta-uikit/commit/1a1283319db53c9b8361bab9977ddceb347b756a) - [@gizeasy](https://github.com/gizeasy)
- [docs(DragNDropField): edit docs, examples and error texts (#1393)](https://github.com/gazprom-neft/consta-uikit/commit/6a7b35309317a91d489b02881863c9e2359ab7f2) - [@arhayka](https://github.com/arhayka)
- [docs(Skeleton): edit docs (#1385)](https://github.com/gazprom-neft/consta-uikit/commit/c16db37a063233b88b24fa7549a523d9306a7a1f) - [@arhayka](https://github.com/arhayka)
- [docs(CollapseGroup): edit docs & examples (#1384)](https://github.com/gazprom-neft/consta-uikit/commit/4e393bfcaf10dfbcf1fdb7b9457fef47cf3b87e6) - [@arhayka](https://github.com/arhayka)
- [docs(combobox): edit docs & example (#1376)](https://github.com/gazprom-neft/consta-uikit/commit/292f6ea92968e87ffbefb50a414175226488ccdf) - [@arhayka](https://github.com/arhayka)
- [docs(Header): added a closing tag into the Header story (#1398)](https://github.com/gazprom-neft/consta-uikit/commit/0ae8199a38608e53a4b47b59226d8991f629d5cb) - [@monolithed](https://github.com/monolithed)
- [fix(CollapseGroup): fixed accordion behavior (#1412)](https://github.com/gazprom-neft/consta-uikit/commit/dda555447b785295b573b3dd4b5f6e7bad566012) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v2.2.0 (23/07/2021)
- [docs(Storybook): add thematization chapter (#1372)](https://github.com/gazprom-neft/consta-uikit/commit/55120c57be5a660ba7cdb04fe4cae35fc57c4ecc) - [@gizeasy](https://github.com/gizeasy)
- [fix(DepricatedComponents): fix export](https://github.com/gazprom-neft/consta-uikit/commit/332b44f130d374add0e95bc6e849c7e161cebe7f) - [@gizeasy](https://github.com/gizeasy)
- [chore(Storybook): edit addons structure](https://github.com/gazprom-neft/consta-uikit/commit/c09c89cf55b7dca2b16aa8c2e5d2c76ffce40937) - [@gizeasy](https://github.com/gizeasy)
- [refactor(Tabs): used ResizeObserver to detect tab width changes (#1366)](https://github.com/gazprom-neft/consta-uikit/commit/edbb7284bed8f1b4256613b1ad8f4af04ff21afe) - [@nekitk](https://github.com/nekitk)
- [feat(CollapseGroup): added CollapseGroup (#1306)](https://github.com/gazprom-neft/consta-uikit/commit/1aeee779f511b7ead84942070d8085357eef65fe) - [@Bright-Burn](https://github.com/Bright-Burn)
- [docs(Selects): added information about ref (#1364)](https://github.com/gazprom-neft/consta-uikit/commit/b6bda3ed36c12f2b23778fb1d8b929e0c5274a4e) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v2.1.0 (21/07/2021)

**Важное из обновления:**

* У нас появился компонент `Skeleton` для составления экранов загрузки
* Добавили компонент `DragNDropField` — файловое поле ввода с возможностью перетаскивания файлов курсором мыши
* А ещё мы временно вернули старые селекты (`BasicSelect`,`Combobox`,`MultiCombobox`,`UserSelect`) под флагом `Deprecated` для более плавного перехода на новые
-----

- [feat(Theme): add font-weight variables (#1360)](https://github.com/gazprom-neft/consta-uikit/commit/3bd47d55270aac7eafb5c77220a907f49c29fc19) - [@gizeasy](https://github.com/gizeasy)
- [feat(Skeleton): added new component (#1354)](https://github.com/gazprom-neft/consta-uikit/commit/040c9be1c5b6b400e092bcf6a6cf60b905242c7f) - [@nekitk](https://github.com/nekitk)
- [refactor(Components): refactor types in RadioGroup, SwitchGroup, CheckboxGroup](https://github.com/gazprom-neft/consta-uikit/commit/5248652d1836c13b79e57efcfaf9c22ae7c2677b) - [@gizeasy](https://github.com/gizeasy)
- [docs(UserSelect): edit docs and examples (#1349)](https://github.com/gazprom-neft/consta-uikit/commit/437c2a12e45e4986395e16bc9e258b84c1bd4762) - [@arhayka](https://github.com/arhayka)
- [feat(SelectDeprecated): returned the old components (#1350)](https://github.com/gazprom-neft/consta-uikit/commit/6eb72fce6e913b075a96977051f7c55212844cee) - [@gizeasy](https://github.com/gizeasy)
- [docs(Select): edit docs (#1347)](https://github.com/gazprom-neft/consta-uikit/commit/a48a65d76b12325c8d8d31af1e3a9c41fbcf9dd7) - [@arhayka](https://github.com/arhayka)
- [fix(UserSelect): fixed disable state of item (#1353)](https://github.com/gazprom-neft/consta-uikit/commit/35d25f9ffa2da0ecc67a6ca5b618e17a1237f515) - [@gizeasy](https://github.com/gizeasy)
- [docs(common): add all components description (#1344)](https://github.com/gazprom-neft/consta-uikit/commit/0dabcd1775fc7fcc5a3f3558ceac4b646b004f83) - [@arhayka](https://github.com/arhayka)
- [fix(Table): fixed filter portals (#1342)](https://github.com/gazprom-neft/consta-uikit/commit/a4510f8d802ff1f6ff37bc751bd2d5ab08672bdc) - [@gizeasy](https://github.com/gizeasy)
- [feat(Select): added ref (#1341)](https://github.com/gazprom-neft/consta-uikit/commit/00d1abd1a8ba64441741ee6b5bd8deedd5f42cb7) - [@gizeasy](https://github.com/gizeasy)
- [feat(DragNDropField): more informative error messages (#1345)](https://github.com/gazprom-neft/consta-uikit/commit/0b4e8f0dbfcf1f7c3512eb911f2ff5c107931889) - [@nekitk](https://github.com/nekitk)
- [feat(DragNDropField): added new component and examples (#1329)](https://github.com/gazprom-neft/consta-uikit/commit/a3bdf53a03a9322bb21b8b2f0dbb3cd7feaa9938) - [@nekitk](https://github.com/nekitk)

--------------------

## v2.0.0 (14/07/2021)

---
Встречайте новую версию!

В ней мы переработали `BasicSelect`, `Combobox`, `MultiCombobox`, `UserSelect`, теперь кода стало меньше, а возможностей больше. 

- `BasicSelect` переработали и переименовали в `Select`
- `Combobox`, `MultiCombobox` объединили в один компонент `Combobox`
- `UserSelect` переработали

_Обращаем внимание_: *версии компонентов обратно не совместимы.*

---
- [docs(Checkbox): edit docs (#1320)](https://github.com/gazprom-neft/consta-uikit/commit/c465ecc1ed79b53b74aeb79577e61ce2690b4f44) - [@arhayka](https://github.com/arhayka)
- [docs(Calendar): add docs & examples (#1311)](https://github.com/gazprom-neft/consta-uikit/commit/151de5620be588d8061b8e3379493fe689e7fb08) - [@arhayka](https://github.com/arhayka)
- [docs(Radio): edit docs, move part to RadioGroup (#1314)](https://github.com/gazprom-neft/consta-uikit/commit/95f722861a0138fb28ac1d2acf6d9e42be963a0f) - [@arhayka](https://github.com/arhayka)
- [docs(Checkbox): edit docs, move to CheckboxGroup (#1318)](https://github.com/gazprom-neft/consta-uikit/commit/48a79c27940492c4cacc51a2948fd1e8dfa8da77) - [@arhayka](https://github.com/arhayka)
- [docs(RadioGroup): edit docs, move docs from Radio (#1313)](https://github.com/gazprom-neft/consta-uikit/commit/964927ad1e0ff515f4e36385bdf3f86b859a9f4f) - [@arhayka](https://github.com/arhayka)
- [docs(Grid): edit docs (#1310)](https://github.com/gazprom-neft/consta-uikit/commit/bba313e9faa00b92c1742434300211b58be0e44a) - [@arhayka](https://github.com/arhayka)
- [docs(Selects): added docs for Select, Combobox, UserSelect (#1322)](https://github.com/gazprom-neft/consta-uikit/commit/eba1580dfff23c6682f40a43b2ad3ef763aa96e2) - [@gizeasy](https://github.com/gizeasy)
- [test(Selects): added tests for Select, Combobox, UserSelect](https://github.com/gazprom-neft/consta-uikit/commit/b9a76f6a7e81f3e3436cc6eef2ce5fef91b675b4) - [@gizeasy](https://github.com/gizeasy)
- [test(getGroups): edit tests (#1301)](https://github.com/gazprom-neft/consta-uikit/commit/e44922ec90435b4580f16a6af99b1a5e7d32dc8f) - [@gizeasy](https://github.com/gizeasy)
- [feat(Components): refactoring Select, Combobox, UserSelect (#1280)](https://github.com/gazprom-neft/consta-uikit/commit/936176366cf178a09f4dc1a885c428a3db17cc94) - [@gizeasy](https://github.com/gizeasy)

--------------------

## v1.12.4 (23/06/2021)
- [docs(sla): add sla (#1302)](https://github.com/gazprom-neft/consta-uikit/commit/09477d001b5b392d568ae61cb6e72a1159c5dfd9) - [@kolebayev](https://github.com/kolebayev)
- [docs(Informer): add size description in documentation (#1287)](https://github.com/gazprom-neft/consta-uikit/commit/b508853dbc8deea503b7b019c4a3f0823c7a90fd) - [@arhayka](https://github.com/arhayka)
- [docs(Text): remove width description (#1288)](https://github.com/gazprom-neft/consta-uikit/commit/6bb5a935c97d6dd051c8ea08fa59e703134c39b1) - [@arhayka](https://github.com/arhayka)
- [docs(Collapse): add docs (#1291)](https://github.com/gazprom-neft/consta-uikit/commit/cc673f53eb1b352ee586a8dffa8c01b2ca63acac) - [@arhayka](https://github.com/arhayka)

--------------------

## v1.12.3 (09/06/2021)
- [docs(useThemeVars): edit docs (#1251)](https://github.com/gazprom-neft/consta-uikit/commit/7981b101e88ccd96533f866143d4fbfbeaabfbc8) - [@arhayka](https://github.com/arhayka)
- [docs(useForkRef): edit docs (#1250)](https://github.com/gazprom-neft/consta-uikit/commit/172d5a71b93ddc30ac88f0357f1d589c81fcb8e1) - [@arhayka](https://github.com/arhayka)
- [docs(UseDebounce): edit docs (#1249)](https://github.com/gazprom-neft/consta-uikit/commit/6d66b465ce51e2effcee2ea238f510f5f693f0b2) - [@arhayka](https://github.com/arhayka)
- [docs(useClickOutside): edit docs (#1248)](https://github.com/gazprom-neft/consta-uikit/commit/356d70f3d67b6b59ac1100af741362767189168e) - [@arhayka](https://github.com/arhayka)
- [docs(useChoiceGroup): edit docs (#1247)](https://github.com/gazprom-neft/consta-uikit/commit/716c416bf357d983173f65b8e82df613e5f2e36f) - [@arhayka](https://github.com/arhayka)
- [feat(Table): add the ability to collapse table rows (#1199)](https://github.com/gazprom-neft/consta-uikit/commit/5639d8239eb1c67b47e98300b1af6a9b4403603c) - [@DmitriyKaurov](https://github.com/DmitriyKaurov)
- [fix(Theme): fix color calculation parameter (#1254)](https://github.com/gazprom-neft/consta-uikit/commit/0fa0abaabd40e7a5b7e0f428ed6a343cee36a5bc) - [@kolebayev](https://github.com/kolebayev)
- [docs(icons): add docs for new icons (#1252)](https://github.com/gazprom-neft/consta-uikit/commit/8a7f4a7f84439e5fd018d9f95ce7d3ad185b58a9) - [@kolebayev](https://github.com/kolebayev)
