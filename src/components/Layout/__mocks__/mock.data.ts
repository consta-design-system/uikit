import { UseFixedData } from '../useFixed';

export const scrollContainerWithoutScroll = {
  offsetTop: 20,
  offsetHeight: 600,
  offsetLeft: 50,
  offsetWidth: 200,
  clientHeight: 600,
  clientWidth: 200,
  scrollTop: 0,
  scrollHeight: 400,
};

export const scrollContainerWithScroll = {
  offsetTop: 20,
  offsetHeight: 600,
  offsetLeft: 50,
  offsetWidth: 200,
  clientHeight: 600,
  clientWidth: 200,
  scrollTop: 120,
  scrollHeight: 400,
};

export const layoutTopFixed = {
  offsetTop: 20,
  offsetHeight: 50,
  offsetLeft: 50,
  offsetWidth: 200,
  clientHeight: 50,
  clientWidth: 200,
  scrollTop: 0,
  scrollHeight: 50,
};
export const layoutBottomFixed = {
  offsetTop: 570,
  offsetHeight: 50,
  offsetLeft: 50,
  offsetWidth: 200,
  clientHeight: 50,
  clientWidth: 200,
  scrollTop: 0,
  scrollHeight: 50,
};

export const anchor = {
  offsetTop: 20,
  offsetHeight: 50,
  offsetLeft: 50,
  offsetWidth: 200,
  clientHeight: 50,
  clientWidth: 200,
  scrollTop: 0,
  scrollHeight: 50,
};

export const layoutTopWithoutScroll: UseFixedData = {
  top: 20,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'unset',
};

export const layoutBottomWithoutScroll: UseFixedData = {
  top: 370,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'fixed',
};

export const layoutTopWithScroll: UseFixedData = {
  top: 20,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'fixed',
};

export const layoutBottomWithScroll: UseFixedData = {
  top: 370,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'fixed',
};

export const layoutTopAnchor: UseFixedData = {
  top: 20,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'fixed',
};

export const layoutBottomAnchor: UseFixedData = {
  top: 70,
  left: 50,
  width: 200,
  height: 50,
  maxWidth: 200,
  maxHeight: 400,
  position: 'fixed',
};
