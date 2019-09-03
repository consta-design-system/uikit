// TODO package.json тоже нужно по чистить
// TODO описание нужно будет поправить

# Запуск проекта

Мы используем yarn, а не npm. [Инструкция по установке yarn](https://yarnpkg.com/en/docs/install)

Установка зависимостей `yarn install`

Запуск storybook `yarn start`

Запуск тестов `yarn run test`

# Хитрости

Движение по схеме возможно через скролл и через space + движение с зажатой левой клавишой мыши.

С помощью cmd+ и cmd- можно скейлить схему – перехватываем стандартное поведение браузера.

esc при разработке позволяет скрыть панель с ошибкой ReactError.

# Разработка

### Хуки

В проекте настроены git-хуки. На precommit выполняется линтинг с автофиксом.
На prepush собирается проект и запускаются тесты.

### Ревью

Сейчас создан шаблон для ревью, который подставит нужных ревьеров. После получения апрува исполнитель задачи сам мерджит её.

### Merge

Не используем squash, чтобы сохранялась вся история коммитов.
При подтягивания изменений из master'а в локальную ветку используем `git rebase`.
Для слияния изменений в master используем `git merge`.

### Прочее

При переименовании файлов проверяйте, что в git'е не удалился и создался заново файл.

Перед коммитом всегда проверяйте все изменения во всех файлах.

Иногда необходимо закоммитить и запушить без прогона хуков/линтеров/тестов.
Например, когда вы хотите показать проблему другому разработчику.
В таких случаях можно использовать `git commit --no-verify` и `git push --no-verify`

## Технические решения

За основу проекта взят [CRA](https://github.com/facebook/create-react-app)

### Typescript

Весь новый код пишем на Typescript.

### CSS

На проекте глобально подключён [whitepaper](https://whitepaper.tools/)

Дизайнеры работают с нами через storybook, оформляют pr'ы с изменениями, могут вносить правки в существующие компоненты.

Для удобства дизайнеров мы отказались от css-in-js решений и используем БЭМ именование классов.

Можно использовать утилиту src/utils/bem для удобства именования по БЭМ методологии.

### Storybook

Помимо обычных функций, storybook является основной площадкой для взаимодействия с дизайнерами.
В storybook подключены темы из whitepaper'а.
В storybook'е могут быть прототипы или компоненты, которые не используются на проекте.

Из компонентов, используемых на проекте, в storybook'е обязательно должны быть:

- В storybook должны быть базовые компоненты ui – кнопки, инпуты и т.д.;
- карточки фактора риска, барьера, последствия;
- более продвинутые элементы интерфейса, которые реиспользуются внутри проекта – полоска статуса у карточек, grid опасностей, поповер/тултипы, модальники.

### Тесты

По stories storybook'а автоматом генерятся snapshot/screenshot тесты. Также, мы пишем unit-тесты на утилиты.

Планируем писать Enzyme тесты для React компонентов и e2e тесты, когда будем подключать бекенд.

Рекомендуется запускать тесты в watch режиме при разработке командой `yarn run test`.

Все снапшоты по всем storybook stories записываются в один файл.
Если снапшоты обновились, то надо перед коммитом проверить всё ли правильно в файле `src/components/__snapshots__/storyshots.test.js.snap`

По всем stories так же генерятся скриншоты.
Если скриншот-тесты падают, то надо посмотреть в папке `src/components/__image_snapshots__/__diff_output__` в чём именно проблема и пофиксить.
Возможны ложные срабатывания скриншот-тестов связанные с разницей рендеринга шрифтов на разных машинах.
Создана задача, чтобы это победить https://jira.csssr.io/browse/GMPSS-139
Пока можно тюнить настройки срабатывания скриншот тестов в файле `src/components/storyshotsPuppeteer.test.js`

Чтобы обновить скриншот и снапшот тесты надо в интерактивном режиме запущенном командой `yarn run test` нажать клавишу `u` (update).

Относитесь к скриншот и снапшот тестам, как к обычным тестам. Если они падают, надо разобраться в чём причина и поправить.

## Список используемых пакетов

lorem-ipsum - генерация lorem-ipsum текста для использования в названиях барьеров/факторов риска/последствий

Линтеры / форматирование кода

prettier - Автоматическое форматирование кода
husky - Запуск скриптов перед коммитом
lint-staged - Run linters against staged git files

eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues
eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier

Typescript

typescript
@types/node
@types/react
@types/react-dom
@types/jest

@typescript-eslint/parser - is an alternative parser that can read Typescript code
@typescript-eslint/eslint-plugin - list of rules

eslint-config-react-app - установка @typescript-eslint/parser и @typescript-eslint/eslint-plugin приводит к тому, что eslint "теряет" eslint-config-react-app установленный в CRA

Тему storybook можно редактировать здесь `.storybook/whitepaperStorybookTheme.js`

@babel/core и babel-loader требуются storybook'ом как peer dependency https://storybook.js.org/docs/guides/guide-react/
