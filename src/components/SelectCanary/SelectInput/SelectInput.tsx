import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { isString } from '##/utils/type-guards';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { FieldInput } from '../../FieldComponents/FieldInput';
import { cnSelectInput } from './cnSelectInput';

type FieldInputProps = PropsWithJsxAttributes<
  {
    children?: React.ReactNode;
  },
  'input'
>;

export const SelectInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cnSelectInput({ withValue: !!children }, [className])}>
        {children && (
          <div className={cnSelectInput('Value')}>
            {isString(children) ? (
              <Text truncate className={cnSelectInput('ValueText')}>
                {children}
              </Text>
            ) : (
              children
            )}
          </div>
        )}
        <FieldInput className={cnSelectInput('Input')} {...props} ref={ref} />
      </div>
    );
  },
);
