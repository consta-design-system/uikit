import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const componentsWithAnimation = ['Tooltip', 'Popover'];

const getMatchOptions = () => ({
  failureThreshold: 0.6,
  // Возможные значения pixel и percent.
  // Для percent failureThreshold 10 для percent означает 10%.
  // Для pixel failureThreshold 10 для percent означает 10 пикселей.
  failureThresholdType: 'percent',
});
const beforeScreenshot = (page, { context: { kind } }) => {
  if (componentsWithAnimation.includes(kind)) {
    return new Promise(resolve =>
      // Ждем пока анимация отработает
      setTimeout(() => {
        resolve();
      }, 300),
    );
  }
};
const config = { getMatchOptions, beforeScreenshot };
if (process.env.CI === 'true') {
  const storybookStaticBuildPath = path.join(__dirname, '../../build/storybook');
  config.storybookUrl = `file://${storybookStaticBuildPath}`;
}

initStoryshots({ test: imageSnapshot(config) });
