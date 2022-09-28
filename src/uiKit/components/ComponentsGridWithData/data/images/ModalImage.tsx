import * as React from 'react';

const ModalImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <rect x={28} y={25} width={144} height={71} rx={4} fill="#fff" />
      <rect x={142} y={79} width={22} height={9} rx={2} fill="#0078D2" />
      <rect
        x={115}
        y={79}
        width={23}
        height={9}
        rx={2}
        fill="#004269"
        fillOpacity={0.07}
      />
      <path
        d="M158.011 38.46l.534.54L161 36.548l2.454 2.451.001.001.545-.545-2.455-2.452L164 33.55l-.551-.55L161 35.458l-2.454-2.452-.546.544 2.456 2.455-2.445 2.455zM36 33h59v6H36z"
        fill="#002033"
        fillOpacity={0.35}
      />
    </svg>
  );
};

export default ModalImage;
