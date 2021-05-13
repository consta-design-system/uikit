import './useThemeVarsStories.css';

import React from 'react';

import { Text } from '../../../components/Text/Text';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { useThemeVars } from '../useThemeVars';

import mdx from './useThemeVars.mdx';

const cnUseThemeVars = cn('useThemeVars');

const Vars = (props: { vars: { [key: string]: string }; title: string }) => {
  const { vars, title } = props;
  return (
    <div className={cnUseThemeVars('Section')}>
      <Text size="3xl" className={cnUseThemeVars('Title')}>
        {title}
      </Text>
      {Object.keys(vars).map((index) => (
        <Text>
          {index}: {vars[index]}
        </Text>
      ))}
    </div>
  );
};

const Default = () => {
  const vars = useThemeVars();

  return (
    <>
      <Vars vars={vars.color.primary} title="Color" />
      <Vars vars={vars.control} title="Control" />
      <Vars vars={vars.font} title="Font" />
      <Vars vars={vars.size} title="Size" />
      <Vars vars={vars.space} title="Space" />
    </>
  );
};

export function Playground() {
  return <Default />;
}

export default createMetadata({
  title: 'Hooks|/useThemeVars',
  id: 'Hooks|/useThemeVars',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
