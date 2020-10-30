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

const cnSmartSortingWindow = cn('SmartSortingWindow');

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

type SmartSortingWindowProps = {
  isOpen: boolean;
  options: Array<Option>;
  initialValues: Array<OrderedOption>;
  onUpdate: (o: Array<OrderedOption>) => void;
  onClose: () => void;
  className?: string;
};

const orderOptions = [
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

export const SmartSortingWindow: React.FC<SmartSortingWindowProps> = ({
  isOpen,
  options,
  initialValues,
  onUpdate,
  onClose,
  className,
}) => {
  const [sortedOptions, setSortedOptions] = React.useState<OrderedOption[]>(initialValues);

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
    setSortedOptions(initialValues);
    onClose();
  };

  const handleApply = () => {
    onUpdate(sortedOptions);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} className={cnSmartSortingWindow(null, [className])} hasOverlay={false}>
      <Button
        size="m"
        view="clear"
        onlyIcon
        iconLeft={IconClose}
        width="default"
        className={cnSmartSortingWindow('ButtonClose')}
        onClick={handleCancel}
      />
      <Text as="div" size="l" view="primary" className={cnSmartSortingWindow('Title')}>
        Умная сортировка
      </Text>
      <div className={cnSmartSortingWindow('Body')}>
        <div className={cnSmartSortingWindow('Labels')}>
          <Text as="div" size="s" view="secondary" className={cnSmartSortingWindow('Label')}>
            Сортировать по
          </Text>
          <Text as="div" size="s" view="secondary" className={cnSmartSortingWindow('Label')}>
            Порядок
          </Text>
        </div>
        {sortedOptions.map((option, index) => (
          <div key={index + option.optionLabel} className={cnSmartSortingWindow('OptionRow')}>
            <div className={cnSmartSortingWindow('Option', { value: true })}>
              <BasicSelect
                className={cnSmartSortingWindow('Select')}
                placeholder="Сортировать по"
                options={availableOptions}
                value={option}
                id={`option_${index}`}
                getOptionLabel={(option) => option.optionLabel}
                onChange={(value) => handleOptionChange(option, value as Option, index)}
              />
            </div>
            <div className={cnSmartSortingWindow('Option', { withRemove: true })}>
              <BasicSelect
                className={cnSmartSortingWindow('Select')}
                placeholder="Порядок"
                options={orderOptions}
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
                className={cnSmartSortingWindow('ButtonRemove')}
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
            className={cnSmartSortingWindow('ButtonAdd')}
            onClick={handleAdd}
          />
        )}
      </div>
      <div className={cnSmartSortingWindow('Actions')}>
        <Button size="m" view="ghost" label="Отмена" width="default" onClick={handleCancel} />
        <Button size="m" view="primary" label="Применить" width="default" onClick={handleApply} />
      </div>
    </Modal>
  );
};
