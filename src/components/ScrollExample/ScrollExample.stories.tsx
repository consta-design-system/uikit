import './styles.css';

import React from 'react';

import { Text } from '../Text/Text';

export const Playground = () => {
  return (
    <div className="Container">
      <Text as="p" view="primary" size="l">
        :horizontal – The horizontal pseudo-class applies to any scrollbar
        pieces that have a horizontal orientation.
      </Text>
      <Text as="p" view="primary" size="l">
        :vertical – The vertical pseudo-class applies to any scrollbar pieces
        that have a vertical orientation.
      </Text>
      <Text as="p" view="primary" size="l">
        :decrement – The decrement pseudo-class applies to buttons and track
        pieces. It indicates whether or not the button or track piece will
        decrement the view’s position when used (e.g., up on a vertical
        scrollbar, left on a horizontal scrollbar).
      </Text>
      <Text as="p" view="primary" size="l">
        :increment – The increment pseudo-class applies to buttons and track
        pieces. It indicates whether or not a button or track piece will
        increment the view’s position when used (e.g., down on a vertical
        scrollbar, right on a horizontal scrollbar).
      </Text>
      <Text as="p" view="primary" size="l">
        :start – The start pseudo-class applies to buttons and track pieces. It
        indicates whether the object is placed before the thumb.
      </Text>
      <Text as="p" view="primary" size="l">
        :end – The end pseudo-class applies to buttons and track pieces. It
        indicates whether the object is placed after the thumb.
      </Text>
      <Text as="p" view="primary" size="l">
        :double-button – The double-button pseudo-class applies to buttons and
        track pieces. It is used to detect whether a button is part of a pair of
        buttons that are together at the same end of a scrollbar. For track
        pieces it indicates whether the track piece abuts a pair of buttons.
      </Text>
      <Text as="p" view="primary" size="l">
        :single-button – The single-button pseudo-class applies to buttons and
        track pieces. It is used to detect whether a button is by itself at the
        end of a scrollbar. For track pieces it indicates whether the track
        piece abuts a singleton button.
      </Text>
      <Text as="p" view="primary" size="l">
        :no-button – Applies to track pieces and indicates whether or not the
        track piece runs to the edge of the scrollbar, i.e., there is no button
        at that end of the track.
      </Text>
      <Text as="p" view="primary" size="l">
        :corner-present – Applies to all scrollbar pieces and indicates whether
        or not a scrollbar corner is present.
      </Text>
      <Text as="p" view="primary" size="l">
        :window-inactive – Applies to all scrollbar pieces and indicates whether
        or not the window containing the scrollbar is currently active. (In
        recent nightlies, this pseudo-class now applies to ::selection as well.
        We plan to extend it to work with any content and to propose it as a new
        standard pseudo-class.)
      </Text>
    </div>
  );
};

// TODO: пока убрали, в дальнейшем когда будет выделенно место под такие строи опубликуем.

// export default {
//   title: 'Компоненты|/Radio',
//   component: Playground,
// };
