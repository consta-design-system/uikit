import * as React from 'react';

const TableImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <path fill="#fff" d="M29 18h142v88H29z" />
      <path fill="#DEE4E8" d="M37 48h24v5H37z" />
      <path fill="#002033" fillOpacity={0.3} d="M37 26h24v5H37z" />
      <path fill="#DEE4E8" d="M37 70h24v5H37zM37 92h24v5H37zM88 48h24v5H88z" />
      <path fill="#002033" fillOpacity={0.3} d="M88 26h24v5H88z" />
      <path
        fill="#DEE4E8"
        d="M88 70h24v5H88zM88 92h24v5H88zM139 48h24v5h-24z"
      />
      <path fill="#002033" fillOpacity={0.3} d="M139 26h24v5h-24z" />
      <path fill="#DEE4E8" d="M139 70h24v5h-24zM139 92h24v5h-24z" />
      <path
        fill="#004166"
        fillOpacity={0.2}
        d="M29 61h142v1H29zM29 39h142v1H29zM29 83h142v1H29z"
      />
    </svg>
  );
};

export default TableImage;
