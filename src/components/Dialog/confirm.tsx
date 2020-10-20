import React from 'react';
import ReactDOM from 'react-dom';

import { MODAL_TIMEOUT } from '../Modal/Modal';

import { Dialog, DialogProps } from './Dialog';

export type ConfirmFunc = (
  props: Omit<DialogProps, 'close'>,
) => {
  destroy: () => void;
  update: (newProps: Partial<DialogProps>) => void;
};

export const confirm: ConfirmFunc = (config) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig: DialogProps = { ...config, close, isOpen: true };

  function render(config: DialogProps) {
    ReactDOM.render(<Dialog {...config} />, div);
  }
  render(currentConfig);

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      isOpen: false,
      onClose: () => setTimeout(destroy, MODAL_TIMEOUT),
    };

    render(currentConfig);
  }

  function update(newConfig: Partial<DialogProps>) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };

    render(currentConfig);
  }

  return {
    destroy: close,
    update,
  };
};
