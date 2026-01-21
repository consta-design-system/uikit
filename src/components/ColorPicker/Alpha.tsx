import React from 'react';

import { Interaction, Interactive } from './Interactive';
import { Pointer } from './Pointer';
import { HsvaColor } from './types';
import { clamp } from './utils/clamp';
import { hsvaToHslaString } from './utils/convert';
import { formatClassName } from './utils/format';
import { round } from './utils/round';

interface Props {
  className?: string;
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = ({ className, hsva, onChange }: Props): JSX.Element => {
  const handleMove = (interaction: Interaction) => {
    onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    onChange({ a: clamp(hsva.a + offset.left) });
  };

  // We use `Object.assign` instead of the spread operator
  // to prevent adding the polyfill (about 150 bytes gzipped)
  const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
  const colorTo = hsvaToHslaString({ ...hsva, a: 1 });

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
  };

  const nodeClassName = formatClassName(['react-colorful__alpha', className]);
  const ariaValue = round(hsva.a * 100);

  return (
    <div className={nodeClassName}>
      <div className="react-colorful__alpha-gradient" style={gradientStyle} />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${ariaValue}%`}
        aria-valuenow={ariaValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Pointer
          className="react-colorful__alpha-pointer"
          left={hsva.a}
          color={hsvaToHslaString(hsva)}
        />
      </Interactive>
    </div>
  );
};
