import React from 'react';

//TODO: импорт всех стилевых файлов и навешивание классов а-ля public/index.html
import '../../themes/theme_color_gpn-dark.css';
import '../../themes/theme_color_gpn-default.css';
import '../../themes/theme_control_gpn-dark.css';
import '../../themes/theme_control_gpn-default.css';
import '../../themes/theme_size_gpn-default.css';

const ThemeProvider = props => {
  const { children } = props;

  return <div>{children}</div>;
};

export default ThemeProvider;
