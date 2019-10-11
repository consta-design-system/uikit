import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8 11.448L12.326 14l-1.148-4.81L15 5.954l-5.033-.418L8 1 6.033 5.536 1 5.954 4.822 9.19 3.674 14 8 11.448z"/></svg>
      );
  }
};
export default SVG;
