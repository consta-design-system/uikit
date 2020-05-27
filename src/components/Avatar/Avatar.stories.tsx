import { withKnobs, text, select } from '@storybook/addon-knobs';
import { Avatar } from './Avatar';

const defaultKnobs = () => ({
  url: text('url', 'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png'),
  name: text('name', 'Вадим Матвеев'),
  size: select('size', ['s', 'm'], 'm'),
  form: select('form', ['round', 'brick', 'default'], 'round'),
});

export default {
  title: 'UI-KIT|/Avatar',
  component: Avatar,
  props: { ...defaultKnobs() },
  decorators: [withKnobs],
};
