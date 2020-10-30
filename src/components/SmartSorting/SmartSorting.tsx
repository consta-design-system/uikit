import './SmartSorting.css';

import React from 'react';

import { IconAdd } from '../../icons/IconAdd/IconAdd';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconTrash } from '../../icons/IconTrash/IconTrash';
import { cn } from '../../utils/bem';
import { BasicSelect } from '../BasicSelect';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Text } from '../Text/Text';

const cnSmartSorting = cn('SmartSorting');

export const orders = ['asc', 'desc'] as const;
type Order = typeof orders[number];

type Option = {
  optionLabel: string;
  optionValue: string;
};

type OrderOption = {
  orderLabel: string;
  orderValue: Order;
};

export type OrderedOption = Option & OrderOption;

type SmartSortingProps = {
  isOpen: boolean;
  options: Array<Option>;
  value: Array<OrderedOption>;
  onChange: (o: Array<OrderedOption>) => void;
  onClose: () => void;
  title?: string;
  sortLabel?: string;
  sortParametersLabel?: string;
  orderParameters?: Array<OrderOption>;
  className?: string;
};

const orderParametersDefault: Array<OrderOption> = [
  { orderLabel: 'По возрастанию', orderValue: 'asc' },
  { orderLabel: 'По убыванию', orderValue: 'desc' },
];

export const smartSort = (fields: Array<string>) => {
  const dir: Array<number> = [];
  const unsignedSorters = fields.map((o: string, i: number) => {
    if (o[0] === '-') {
      dir[i] = -1;

      return o.substring(1);
    }
    dir[i] = 1;

    return o;
  });

  return (a: { [key: string]: string | number }, b: { [key: string]: string | number }) => {
    for (let i = 0; i < fields.length; i++) {
      const o = unsignedSorters[i];
      if (a[o] > b[o]) return dir[i];
      if (a[o] < b[o]) return -dir[i];
    }

    return 0;
  };
};

export const SmartSorting: React.FC<SmartSortingProps> = ({
  isOpen,
  options,
  value,
  onChange,
  onClose,
  title = 'Умная сортировка',
  sortLabel = 'Сортировать по',
  sortParametersLabel = 'Порядок',
  orderParameters = orderParametersDefault,
  className,
}) => {
  const [sortedOptions, setSortedOptions] = React.useState<OrderedOption[]>([]);

  React.useEffect(() => {
    setSortedOptions(value);
  }, [value]);

  const availableOptions = options.filter(
    (option) => !sortedOptions.some((opt) => option.optionValue === opt.optionValue),
  );

  const handleAdd = () =>
    setSortedOptions((prevState) => [
      ...prevState,
      {
        optionLabel: '',
        optionValue: '',
        orderLabel: 'По возрастанию',
        orderValue: 'asc',
      },
    ]);

  const handleRemove = (index: number) => {
    const options = [...sortedOptions];
    options.splice(index, 1);
    setSortedOptions(options);
  };

  const handleOptionChange = (
    option: OrderedOption,
    value: Option | OrderOption,
    index: number,
  ) => {
    const options = [...sortedOptions];
    options[index] = {
      ...option,
      ...value,
    };
    setSortedOptions(options);
  };

  const handleCancel = () => {
    setSortedOptions(value);
    onClose();
  };

  const handleApply = () => {
    onChange(sortedOptions);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} className={cnSmartSorting(null, [className])} hasOverlay={false}>
      <Button
        size="m"
        view="clear"
        onlyIcon
        iconLeft={IconClose}
        width="default"
        className={cnSmartSorting('ButtonClose')}
        onClick={handleCancel}
      />
      <Text as="div" size="l" view="primary" className={cnSmartSorting('Title')}>
        {title}
      </Text>
      <div className={cnSmartSorting('Body')}>
        <div className={cnSmartSorting('Labels')}>
          <Text as="div" size="s" view="secondary" className={cnSmartSorting('Label')}>
            {sortLabel}
          </Text>
          <Text as="div" size="s" view="secondary" className={cnSmartSorting('Label')}>
            {sortParametersLabel}
          </Text>
        </div>
        {sortedOptions.map((option, index) => (
          <div key={index + option.optionLabel} className={cnSmartSorting('OptionRow')}>
            <div className={cnSmartSorting('Option', { value: true })}>
              <BasicSelect
                className={cnSmartSorting('Select')}
                placeholder="Сортировать по"
                options={availableOptions}
                value={option}
                id={`option_${index}`}
                getOptionLabel={(option) => option.optionLabel}
                onChange={(value) => handleOptionChange(option, value as Option, index)}
              />
            </div>
            <div className={cnSmartSorting('Option', { withRemove: true })}>
              <BasicSelect
                className={cnSmartSorting('Select')}
                placeholder="Порядок"
                options={orderParameters}
                value={option}
                id={`option_${index}_order`}
                getOptionLabel={(option) => option.orderLabel}
                onChange={(value) => handleOptionChange(option, value as OrderOption, index)}
              />
              <Button
                size="m"
                view="clear"
                onlyIcon
                iconLeft={IconTrash}
                width="default"
                className={cnSmartSorting('ButtonRemove')}
                onClick={() => handleRemove(index)}
              />
            </div>
          </div>
        ))}
        {availableOptions.length > 0 && (
          <Button
            size="m"
            view="ghost"
            label="Добавить уровень"
            iconLeft={IconAdd}
            width="full"
            className={cnSmartSorting('ButtonAdd')}
            onClick={handleAdd}
          />
        )}
      </div>
      <div className={cnSmartSorting('Actions')}>
        <Button size="m" view="ghost" label="Отмена" width="default" onClick={handleCancel} />
        <Button size="m" view="primary" label="Применить" width="default" onClick={handleApply} />
      </div>
    </Modal>
  );
};
