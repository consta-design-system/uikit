import React from 'react';
import { cn } from '##/utils/bem';
import { Loader } from '@consta/uikit/Loader';
import { useFlag } from '@consta/uikit/useFlag';

import './StandPageSandbox.css';

type Props = {
  link?: string;
  className?: string;
};

const cnStandPageSandbox = cn('StandPageSandbox');

export const StandPageSandbox = (props: Props) => {
  const { link, className } = props;
  const [isLoading, setIsLoading] = useFlag(true);

  if (!link) {
    return <>раздел в разработке</>;
  }

  return (
    <div className={cnStandPageSandbox(null, [className])}>
      <iframe
        onLoad={setIsLoading.off}
        className={cnStandPageSandbox('Frame')}
        src={link}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
      {isLoading && <Loader className={cnStandPageSandbox('Loader')} />}
    </div>
  );
};
