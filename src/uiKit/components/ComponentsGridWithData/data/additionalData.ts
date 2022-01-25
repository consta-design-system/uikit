import AreaImage from './imagesForAdditionalData/AreaImage';
import BarImage from './imagesForAdditionalData/BarImage';
import BulletImage from './imagesForAdditionalData/BulletImage';
import ColumnImage from './imagesForAdditionalData/ColumnImage';
import DualAxesImage from './imagesForAdditionalData/DualAxesImage';
import FeedbackFormImage from './imagesForAdditionalData/FeedbackFormImage';
import GaugeImage from './imagesForAdditionalData/GaugeImage';
import HistogramImage from './imagesForAdditionalData/HistogramImage';
import LineImage from './imagesForAdditionalData/LineImage';
import PieImage from './imagesForAdditionalData/PieImage';
import RadarImage from './imagesForAdditionalData/RadarImage';
import ScatterImage from './imagesForAdditionalData/ScatterImage';
import StatsImage from './imagesForAdditionalData/StatsImage';
import WaterfallImage from './imagesForAdditionalData/WaterfallImage';
import { Data } from './types';

export const additionalData: Data = [
  {
    title: 'Графики',
    items: [
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-area--playground',
        name: 'Area',
        description: 'Линейная диаграмма с областями.',
        image: AreaImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-bar--playground',
        name: 'Bar',
        description: 'Горизонтальная столбчатая диаграмма.',
        image: BarImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-bullet--playground',
        name: 'Bullet',
        description: 'Диаграмма-термометр (она же — диаграмма-шкала).',
        image: BulletImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-column--playground',
        name: 'Column',
        description: 'Вертикальная столбчатая диаграмма.',
        image: ColumnImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-dualaxes--playground',
        name: 'DualAxes',
        description: 'Сочетание нескольких линейных или столбчатых диаграмм.',
        image: DualAxesImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-gauge--playground',
        name: 'Gauge',
        description: 'Круговая шкала',
        image: GaugeImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-histogram--playground',
        name: 'Histogram',
        description: 'Гистограмма. Показывает количественное распределение данных.',
        image: HistogramImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-line--playground',
        name: 'Line',
        description: 'Линейный график',
        image: LineImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-pie--playground',
        name: 'Pie',
        description: 'Круговая диаграмма с областями.',
        image: PieImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-radar--playground',
        name: 'Radar',
        description: 'Диаграмма-радар.',
        image: RadarImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-scatter--playground',
        name: 'Scatter',
        description: 'Диаграмма рассеяния, она же — точечная диаграмма.',
        image: ScatterImage,
      },
      {
        url: 'https://consta-charts.vercel.app/?path=/docs/components-waterfall--playground',
        name: 'Waterfall',
        description: 'Каскадная диаграмма.',
        image: WaterfallImage,
      },
    ],
  },
  {
    title: 'Отдельные компоненты',
    items: [
      {
        url: 'https://stats-consta.vercel.app/?path=/docs/components-stats--interactive',
        name: 'Stats',
        description:
          'Компонент для отображения чисел, с заголовком, единицами измерения, иконками и другими настройками.',
        image: StatsImage,
      },
      {
        url: 'https://analytic-ui.vercel.app/?path=/docs/feedbackform--playground',
        name: 'FeedbackForm',
        description: 'Виджет обратной связи. Можно ставить оценки и писать отзывы.',
        image: FeedbackFormImage,
      },
      {
        url: 'https://gpn-responses.vercel.app/?path=/docs/components-responses--playground',
        name: 'GPN-Responses',
        description: 'Заглушки с сообщениями об ошибках и важных статусах в стиле «Газпром нефти».',
      },
    ],
  },
  {
    title: 'Адаптеры',
    items: [
      {
        url: 'https://consta-table.vercel.app/?path=/story/common-start--page',
        name: 'rcTableAdapter',
        description: 'Адаптер для rc-table. Таблица со множеством настроек.',
      },
      {
        url: 'https://consta-tree.vercel.app/',
        name: 'rcTreeAdapter',
        description: 'Адаптер для rc-tree. Дерево, подходит для создания иерархических структур.',
      },
    ],
  },
];
