import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const usePortalNode = () => {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(() => {
    const rootNode = rootElemRef.current;
    const appElement = document.getElementById('app');

    if (appElement) {
      appElement.appendChild(rootNode);
    } else {
      document.body.appendChild(rootNode);
    }

    return function removeElement() {
      rootNode.remove();
    };
  }, []);

  return rootElemRef.current;
};

const Portal: React.FC<{}> = ({ children }) => {
  const portalNode = usePortalNode();

  if (portalNode) {
    return ReactDOM.createPortal(children, portalNode);
  }

  return null;
};

export default Portal;
