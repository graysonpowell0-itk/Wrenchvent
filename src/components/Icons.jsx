import React from 'react';

function createSvg(children, size, color) {
  return (
    <svg
      width={size || 20}
      height={size || 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const Mic = ({ size, color }) => createSvg(
  <>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1={12} y1={19} x2={12} y2={23} />
    <line x1={8} y1={23} x2={16} y2={23} />
  </>,
  size, color
);

export const Cam = ({ size, color }) => createSvg(
  <>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx={12} cy={13} r={4} />
  </>,
  size, color
);

export const Vid = ({ size, color }) => createSvg(
  <>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
  </>,
  size, color
);

export const HomI = ({ size, color }) => createSvg(
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </>,
  size, color
);

export const Wre = ({ size, color }) => createSvg(
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  size, color
);

export const Bra = ({ size, color }) => createSvg(
  <>
    <path d="M12 2a4 4 0 0 0-4 4c0 1.1.45 2.1 1.17 2.83A4 4 0 0 0 7 13a4 4 0 0 0 2 3.46V20h6v-3.54A4 4 0 0 0 17 13a4 4 0 0 0-2.17-3.54A4 4 0 0 0 16 6a4 4 0 0 0-4-4z" />
    <line x1={10} y1={20} x2={10} y2={22} />
    <line x1={14} y1={20} x2={14} y2={22} />
  </>,
  size, color
);

export const Usr = ({ size, color }) => createSvg(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx={12} cy={7} r={4} />
  </>,
  size, color
);

export const XI = ({ size, color }) => createSvg(
  <>
    <line x1={18} y1={6} x2={6} y2={18} />
    <line x1={6} y1={6} x2={18} y2={18} />
  </>,
  size || 18, color
);

export const Snd = ({ size, color }) => createSvg(
  <>
    <line x1={22} y1={2} x2={11} y2={13} />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </>,
  size || 18, color
);

export const ChR = ({ size, color }) => createSvg(
  <polyline points="9 18 15 12 9 6" />,
  size || 16, color
);

export const ChL = ({ size, color }) => createSvg(
  <polyline points="15 18 9 12 15 6" />,
  size || 18, color
);

export const Chk = ({ size, color }) => (
  <svg
    width={size || 15}
    height={size || 15}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Shd = ({ size, color }) => createSvg(
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  size || 18, color
);

export const Zap = ({ size, color }) => createSvg(
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  size || 18, color
);

export const Img = ({ size, color }) => createSvg(
  <>
    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <circle cx={8.5} cy={8.5} r={1.5} />
    <polyline points="21 15 16 10 5 21" />
  </>,
  size, color
);

export const Clock = ({ size, color }) => createSvg(
  <>
    <circle cx={12} cy={12} r={10} />
    <polyline points="12 6 12 12 16 14" />
  </>,
  size || 15, color
);
