const fs = require('fs');
const path = require('path');
const { DEFAULT_THEME } = require('./defaultTheme');

const DEFAULT_COLOR = '#aaaaaa';
const COLOR_THEME_MOD = 'color';
const THEME_COLOR_REGEXP = /\$color-base-essential: (.+);/;
const THEMES_PATH = __dirname + '/../components/Theme/_color';
const REGEXP_THEME_FILE_NAME = /(Theme_(.+)_(.+)).css/;

const getThemeProps = (filename) => {
  const [, className, themeMod, themeName] = filename.match(REGEXP_THEME_FILE_NAME);

  return {
    className,
    themeMod,
    themeName,
  };
};

const getThemeColorFromFile = (filename) => {
  const absolutePath = path.join(THEMES_PATH, filename);
  const themeColorFileContent = fs.readFileSync(absolutePath, 'utf8');
  const matches = themeColorFileContent.match(THEME_COLOR_REGEXP);
  if (!matches) {
    throw new Error(
      `Цвет темы не найден в файле ${absolutePath} используя regexp ${THEME_COLOR_REGEXP.toString()}`
    );
  }
  const [, themeColor] = matches;
  return themeColor;
};

const getWhitepaperThemes = () => {
  const files = fs.readdirSync(THEMES_PATH);

  return Object.values(
    files
      .filter((filename) => REGEXP_THEME_FILE_NAME.test(filename))
      .reduce((acc, filename) => {
        const { className, themeMod, themeName } = getThemeProps(filename);

        if (!acc[themeName]) {
          acc[themeName] = {
            name: themeName,
            default: themeName === DEFAULT_THEME,
            color: DEFAULT_COLOR,
            class: {
              breakpoint: 'Theme_breakpoint_default',
              control: 'Theme_control_gpnDefault',
              color: 'Theme_colorDefault',
              font: 'Theme_font_gpnDefault',
              gap: 'Theme_gap_m',
              size: 'Theme_size_gpnDefault',
              space: 'Theme_space_gpnDefault',
            },
          };
        }

        acc[themeName].class[themeMod] = className;

        if (themeMod === COLOR_THEME_MOD) {
          acc[themeName].color = getThemeColorFromFile(filename);
        }

        return acc;
      }, {})
  ).map((themeConfig) => {
    // Сортируем классы здесь, чтобы снапшот тесты работали предсказуемо
    const classes = ['theme'].concat(Object.values(themeConfig.class).sort());
    return {
      ...themeConfig,
      class: classes,
    };
  });
};

module.exports = getWhitepaperThemes;
