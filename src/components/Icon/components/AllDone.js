import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path d="M18.471 6.856l-6.5 6.5-1.974-1.973 6.5-6.5 1.974 1.973zm3.214-1.012l1.985 1.97-11.7 11.7-5.812-5.812 1.973-1.973 3.839 3.83 9.715-9.715zM0 13.7l1.985-1.971 5.801 5.811-1.973 1.973L0 13.701z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M0 0h16v16H0z"/><path d="M12 4.667l-.94-.94-4.227 4.226.94.94L12 4.667zm2.827-.94L7.773 10.78 4.987 8l-.94.94 3.726 3.727 8-8-.946-.94zM.273 8.94L4 12.667l.94-.94L1.22 8l-.947.94z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M0 0h12v12H0z"/><path d="M9 3.5l-.705-.705-3.17 3.17.705.705L9 3.5zm2.12-.705l-5.29 5.29L3.74 6l-.705.705L5.83 9.5l6-6-.71-.705zM.205 6.705L3 9.5l.705-.705L.915 6l-.71.705z"/></svg>
      );
  }
};
export default SVG;
