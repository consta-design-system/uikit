import * as React from 'react';

const FieldGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <rect x={20} y={28} width={160} height={22} rx={4} fill="#fff" />
      <g clipPath="url(#SvgFieldGroupImage__clip0_2425_26122)">
        <path
          d="M20.5 32a3.5 3.5 0 013.5-3.5h82.5v21H24a3.5 3.5 0 01-3.5-3.5V32z"
          stroke="#004166"
          strokeOpacity={0.2}
        />
        <path d="M49 37l4.5 5 4.5-5h-9z" fill="#002033" fillOpacity={0.35} />
      </g>
      <path stroke="#004166" strokeOpacity={0.2} d="M67.5 28.5h91v21h-91z" />
      <path
        d="M79.059 36.74h-2.022V43h-.82v-6.26H74.2v-.742h4.859v.742zm7.758 3.96h-3.53c.013.557.163.986.45 1.29.286.302.68.453 1.181.453.563 0 1.08-.185 1.553-.556v.752c-.44.319-1.02.478-1.743.478-.707 0-1.262-.226-1.665-.678-.404-.456-.606-1.096-.606-1.92 0-.777.22-1.41.66-1.899a2.126 2.126 0 011.645-.737c.654 0 1.16.211 1.518.635.358.423.537 1.01.537 1.762v.42zm-.82-.678c-.003-.463-.115-.822-.337-1.08-.218-.257-.522-.385-.913-.385-.377 0-.698.135-.962.405-.263.27-.426.623-.488 1.06h2.7zM94.43 38l-1.68 2.53L94.4 43h-.932l-.982-1.621c-.062-.101-.135-.228-.22-.381h-.019c-.016.03-.093.156-.23.38l-1 1.622h-.923l1.704-2.451L90.167 38h.933l.966 1.709c.072.127.142.257.21.39h.02L93.546 38h.884zm6.001 4.951c-.189.104-.438.156-.747.156-.876 0-1.314-.488-1.314-1.464v-2.96h-.86V38h.86v-1.22l.8-.26V38h1.261v.684h-1.26V41.5c0 .335.057.575.17.718.115.143.303.215.567.215a.844.844 0 00.523-.166v.683z"
        fill="#002033"
        fillOpacity={0.35}
      />
      <path d="M158 28h18a4 4 0 014 4v14a4 4 0 01-4 4h-18V28z" fill="#0078D2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M170.453 41.16a4 4 0 11.707-.707l2.844 2.844-.707.707-2.844-2.844zM171 38a3 3 0 11-6 0 3 3 0 016 0z"
        fill="#fff"
      />
      <rect x={20} y={70} width={160} height={22} rx={4} fill="#fff" />
      <path
        d="M32 77a1 1 0 11-2 0 1 1 0 012 0zM32 81a1 1 0 11-2 0 1 1 0 012 0zM31 86a1 1 0 100-2 1 1 0 000 2z"
        fill="#00395C"
        fillOpacity={0.8}
      />
      <g clipPath="url(#SvgFieldGroupImage__clip1_2425_26122)">
        <path
          stroke="#004166"
          strokeOpacity={0.2}
          d="M42.5 69.5h115v23h-115z"
        />
        <path d="M140 79l4.5 5 4.5-5h-9z" fill="#002033" fillOpacity={0.35} />
      </g>
      <path
        d="M158 70h18a4 4 0 014 4v14a4 4 0 01-4 4h-18V70z"
        fill="#004269"
        fillOpacity={0.05}
      />
      <path
        d="M164 79l1 5h8l1-5-3 1-2-4-2 4-3-1zM173 85.007h-8v1h8v-1z"
        fill="#00395C"
        fillOpacity={0.8}
      />
      <rect
        x={20.5}
        y={70.5}
        width={159}
        height={21}
        rx={3.5}
        stroke="#004166"
        strokeOpacity={0.2}
      />
      <defs>
        <clipPath id="SvgFieldGroupImage__clip0_2425_26122">
          <path fill="#fff" transform="translate(20 28)" d="M0 0h47v22H0z" />
        </clipPath>
        <clipPath id="SvgFieldGroupImage__clip1_2425_26122">
          <path fill="#fff" transform="translate(42 70)" d="M0 0h116v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FieldGroupImage;
