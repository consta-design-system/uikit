import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M2 14h2V6.09H2V14zm13-6.72c0-.7-.573-1.28-1.273-1.28H9.712l.604-3.454.02-.203a.958.958 0 00-.28-.675L9.38 1 5.37 5.74c-.235.23-.37.55-.37.9v6.08c0 .7.57 1.28 1.27 1.28h5.548c.528 0 .98-.322 1.171-.78l1.922-4.21c.057-.146.089-.295.089-.46V7.33h-.006L15 7.28z"/></svg>
      );
  }
};
export default SVG;
