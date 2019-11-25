const fs = require('fs');
const path = require('path');
const { DEFAULT_THEME } = require('./defaultTheme');

const DEFAULT_COLOR = '#aaaaaa';
const COLOR_THEME_MOD = 'color';
const THEME_COLOR_REGEXP = /\$color-base-essential: (.+);/;
const THEMES_PATH = __dirname;

const getThemeProps = filename => {
  const [, className, themeMod, themeName] = filename.match(/(theme_(.+)_(.+)).css/);
  return {
    className,
    themeMod,
    themeName,
  };
};

const getThemeColorFromFile = filename => {
  const absolutePath = path.join(THEMES_PATH, filename);
  const themeColorFileContent = fs.readFileSync(absolutePath, 'utf8');
  const matches = themeColorFileContent.match(THEME_COLOR_REGEXP);
  if (!matches) {
    throw new Error(
      `Цвет темы не найден в файле ${absolutePath} используя regexp ${THEME_COLOR_REGEXP.toString()}`,
    );
  }
  const [, themeColor] = matches;
  return themeColor;
};

const getWhitepaperThemes = () => {
  const files = fs.readdirSync(THEMES_PATH);

  return Object.values(
    files
      .filter(filename => /\.css$/.test(filename))
      .reduce((acc, filename) => {
        const { className, themeMod, themeName } = getThemeProps(filename);

        if (!acc[themeName]) {
          acc[themeName] = {
            name: themeName,
            default: themeName === DEFAULT_THEME,
            color: DEFAULT_COLOR,
            class: {
              breakpoint: 'theme_breakpoint_default',
              control: 'theme_control_gpn-default',
              color: 'theme_color_default',
              font: 'theme_font_gpn-default',
              gap: 'theme_gap_medium',
              size: 'theme_size_gpn-default',
              space: 'theme_space_gpn-default',
            },
          };
        }

        acc[themeName].class[themeMod] = className;

        if (themeMod === COLOR_THEME_MOD) {
          acc[themeName].color = getThemeColorFromFile(filename);
        }

        return acc;
      }, {}),
  ).map(themeConfig => {
    // Сортируем классы здесь, чтобы снапшот тесты работали предсказуемо
    const classes = ['theme'].concat(Object.values(themeConfig.class).sort());
    return {
      ...themeConfig,
      class: classes,
    };
  });
};

module.exports = getWhitepaperThemes;
