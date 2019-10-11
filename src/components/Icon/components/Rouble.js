import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1.04-15.126h-1.367v4.412h1.35c1.44 0 2.406-.76 2.406-2.215 0-1.453-.967-2.197-2.39-2.197zM18 9c0 2.857-2.152 4.286-4.571 4.286h-1.756v1.571h4.613v1.429h-4.613v2.857h-2.53v-2.857H7v-1.429h2.143v-1.571H7v-2h2.143V4.857h4.286C15.797 4.857 18 6.143 18 9z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8 15A7 7 0 108 1a7 7 0 000 14zm.728-10.588H7.77V7.5h.945c1.008 0 1.684-.532 1.684-1.55s-.676-1.538-1.672-1.538zM12.2 5.9c0 2-1.507 3-3.2 3H7.771V10H11v1H7.771v2H6v-2H4.5v-1H6V8.9H4.5V7.5H6V3h3c1.658 0 3.2.9 3.2 2.9z"/></svg>
      );
  }
};
export default SVG;
