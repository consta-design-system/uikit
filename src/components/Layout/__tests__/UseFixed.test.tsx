import * as mockData from '../__mocks__/mock.data';
import { positioningElement, UseFixedData } from '../useFixed';

type ComparePositions = (
  position1: UseFixedData,
  position2: UseFixedData,
) => boolean;

const comparePositions: ComparePositions = (position1, position2) =>
  position1.top === position2.top &&
  position1.height === position2.height &&
  position1.left === position2.left &&
  position1.width === position2.width &&
  position1.maxHeight === position2.maxHeight &&
  position1.maxWidth === position2.maxWidth &&
  position1.position === position2.position;

describe('Функция позиционирования в useFixed', () => {
  describe("Позиционирование 'top' в контейнере без скрола", () => {
    it('позиция элемента не должна измениться', () => {
      expect(() =>
        comparePositions(
          mockData.layoutTopWithoutScroll,
          positioningElement(
            mockData.scrollContainerWithoutScroll.offsetTop -
              mockData.layoutTopFixed.offsetTop,
            mockData.layoutTopFixed,
            mockData.scrollContainerWithoutScroll,
            undefined,
            'top',
            'left',
          ),
        ),
      );
    });
  });

  describe("Позиционирование 'bottom' в контейнере без скрола", () => {
    it('позиция элемента должна измениться', () => {
      expect(() =>
        comparePositions(
          mockData.layoutBottomWithoutScroll,
          positioningElement(
            mockData.scrollContainerWithoutScroll.offsetTop -
              mockData.layoutBottomFixed.offsetTop,
            mockData.layoutBottomFixed,
            mockData.scrollContainerWithoutScroll,
            undefined,
            'top',
            'left',
          ),
        ),
      );
    });
  });

  describe("Позиционирование 'top' в контейнере со скролом", () => {
    it('позиция элемента должна измениться', () => {
      expect(() =>
        comparePositions(
          mockData.layoutTopWithScroll,
          positioningElement(
            mockData.scrollContainerWithScroll.offsetTop -
              mockData.layoutTopFixed.offsetTop,
            mockData.layoutTopFixed,
            mockData.scrollContainerWithScroll,
            undefined,
            'top',
            'left',
          ),
        ),
      );
    });

    describe("Позиционирование 'bottom' в контейнере со скролом", () => {
      it('позиция элемента должна измениться', () => {
        expect(() =>
          comparePositions(
            mockData.layoutBottomWithScroll,
            positioningElement(
              mockData.scrollContainerWithScroll.offsetTop -
                mockData.layoutBottomFixed.offsetTop,
              mockData.layoutBottomFixed,
              mockData.scrollContainerWithScroll,
              undefined,
              'top',
              'left',
            ),
          ),
        );
      });
    });

    describe("Позиционирование 'top' к якорю", () => {
      it('позиция элемента должна измениться', () => {
        expect(() =>
          comparePositions(
            mockData.layoutTopAnchor,
            positioningElement(
              mockData.scrollContainerWithScroll.offsetTop -
                mockData.layoutTopFixed.offsetTop,
              mockData.layoutTopFixed,
              mockData.scrollContainerWithScroll,
              mockData.anchor,
              'top',
              'left',
            ),
          ),
        );
      });
    });

    describe("Позиционирование 'bottom' к якорю", () => {
      it('позиция элемента должна измениться', () => {
        expect(() =>
          comparePositions(
            mockData.layoutBottomAnchor,
            positioningElement(
              mockData.scrollContainerWithScroll.offsetTop -
                mockData.layoutBottomFixed.offsetTop,
              mockData.layoutBottomFixed,
              mockData.scrollContainerWithScroll,
              mockData.anchor,
              'top',
              'left',
            ),
          ),
        );
      });
    });
  });
});
