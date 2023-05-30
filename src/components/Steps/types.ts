import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const stepsSizes = ['m', 's', 'l'] as const;
export type StepsPropSize = typeof stepsSizes[number];
export const stepsDefaultSize: StepsPropSize = stepsSizes[0];

export type StepsPropOnChange<ITEM> = (props: {
  e: React.MouseEvent;
  value: ITEM;
}) => void;

export type StepsPropGetLabel<ITEM> = (item: ITEM) => string;
export type StepsPropGetDisabled<ITEM> = (item: ITEM) => boolean | undefined;
export type StepsPropGetSkipped<ITEM> = (item: ITEM) => boolean | undefined;
export type StepsPropGetCompleted<ITEM> = (item: ITEM) => boolean | undefined;

export type StepsItemDefault = {
  label: string;
  disabled?: boolean;
  skipped?: boolean;
  completed?: boolean;
};

export type StepsProps<ITEM = StepsItemDefault> = PropsWithHTMLAttributesAndRef<
  {
    size?: StepsPropSize;
    items: ITEM[];
    value: ITEM;
    getItemLabel?: StepsPropGetLabel<ITEM>;
    getItemDisabled?: StepsPropGetDisabled<ITEM>;
    getItemCompleted?: StepsPropGetCompleted<ITEM>;
    getItemSkipped?: StepsPropGetSkipped<ITEM>;
    onChange: StepsPropOnChange<ITEM>;
    className?: string;
  },
  HTMLDivElement
> &
  (ITEM extends { label: StepsItemDefault['label'] }
    ? {}
    : {
        getItemLabel: StepsPropGetLabel<ITEM>;
      });

export type StepsCompnent = <ITEM>(
  props: StepsProps<ITEM>,
) => React.ReactElement | null;
