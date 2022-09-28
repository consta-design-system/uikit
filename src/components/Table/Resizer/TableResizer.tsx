import './TableResizer.css';

import React from 'react';

import { cn } from '../../../utils/bem';

const cnTableResizer = cn('TableResizer');

type Props = {
  height: number;
  top: number;
  isVisible?: boolean;
  onResize: (delta: number) => void;
  onDoubleClick: () => void;
};

/* Сделано классом, чтобы хэндлеры событий на document могли иметь доступ к актуальному стэйту/пропсам без пересоздания подписок */
export class TableResizer extends React.Component<
  Props,
  { isDragging: boolean }
> {
  state = {
    isDragging: false,
  };

  componentWillUnmount(): void {
    this.removeListeners();
  }

  onMouseDown = (): void => {
    this.setState({ isDragging: true });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (e: MouseEvent): void => {
    if (e.movementX) {
      this.props.onResize(e.movementX);
    }
  };

  onMouseUp = (): void => {
    this.setState({ isDragging: false });

    this.removeListeners();
  };

  removeListeners = (): void => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  render(): JSX.Element {
    return (
      <div
        className={cnTableResizer({
          isDragging: this.state.isDragging,
          isVisible: this.props.isVisible,
        })}
        aria-hidden
        style={{ height: this.props.height, top: this.props.top }}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  }
}
