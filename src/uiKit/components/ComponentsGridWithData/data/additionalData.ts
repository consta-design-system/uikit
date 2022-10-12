import AreaImage from './imagesForAdditionalData/AreaImage';
import BarImage from './imagesForAdditionalData/BarImage';
import BulletImage from './imagesForAdditionalData/BulletImage';
import ColumnImage from './imagesForAdditionalData/ColumnImage';
import DualAxesImage from './imagesForAdditionalData/DualAxesImage';
import FeedbackFormImage from './imagesForAdditionalData/FeedbackFormImage';
import GanttImage from './imagesForAdditionalData/GanttImage';
import GaugeImage from './imagesForAdditionalData/GaugeImage';
import GpnResponsesImage from './imagesForAdditionalData/GpnResponsesImage';
import HeaderUmdImage from './imagesForAdditionalData/HeaderUmdImage';
import HistogramImage from './imagesForAdditionalData/HistogramImage';
import LineImage from './imagesForAdditionalData/LineImage';
import MixPlotImage from './imagesForAdditionalData/MixPlotImage';
import PieImage from './imagesForAdditionalData/PieImage';
import RadarImage from './imagesForAdditionalData/RadarImage';
import RcTableAdapterImage from './imagesForAdditionalData/RcTableAdapterImage';
import RcTreeAdapterImage from './imagesForAdditionalData/RcTreeAdapterImage';
import ReactBigCalendarImage from './imagesForAdditionalData/ReactBigCalendarImage';
import ScatterImage from './imagesForAdditionalData/ScatterImage';
import StatsImage from './imagesForAdditionalData/StatsImage';
import WaterfallImage from './imagesForAdditionalData/WaterfallImage';
import { Data } from './types';

export const additionalData: Data = [
  {
    title: 'Графики',
    items: [
      {
        url: 'http://charts.consta.design?path=/docs/components-area--playground',
        name: 'Area',
        description: 'Линейная диаграмма с областями.',
        image: AreaImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-bar--playground',
        name: 'Bar',
        description: 'Горизонтальная столбчатая диаграмма.',
        image: BarImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-bullet--playground',
        name: 'Bullet',
        description: 'Диаграмма-термометр (она же — диаграмма-шкала).',
        image: BulletImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-column--playground',
        name: 'Column',
        description: 'Вертикальная столбчатая диаграмма.',
        image: ColumnImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-dualaxes--playground',
        name: 'DualAxes',
        description: 'Сочетание нескольких линейных или столбчатых диаграмм.',
        image: DualAxesImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-gauge--playground',
        name: 'Gauge',
        description: 'Круговая шкала',
        image: GaugeImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-histogram--playground',
        name: 'Histogram',
        description:
          'Гистограмма. Показывает количественное распределение данных.',
        image: HistogramImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-line--playground',
        name: 'Line',
        description: 'Линейный график.',
        image: LineImage,
      },
      {
        url: 'http://charts.consta.design/?path=/docs/components-mixplot--playground',
        name: 'MixPlot',
        description:
          'Позволяет построить несколько графиков на основе одних данных.',
        image: MixPlotImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-pie--playground',
        name: 'Pie',
        description: 'Круговая диаграмма с областями.',
        image: PieImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-radar--playground',
        name: 'Radar',
        description: 'Диаграмма-радар.',
        image: RadarImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-scatter--playground',
        name: 'Scatter',
        description: 'Диаграмма рассеяния, она же — точечная диаграмма.',
        image: ScatterImage,
      },
      {
        url: 'http://charts.consta.design?path=/docs/components-waterfall--playground',
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
        url: 'http://header.consta.design/',
        name: 'Header',
        description:
          'Шапка  @consta/header. Настраивается, много компонентов: 4 меню, бейджики, уведомления, логин, логотип и не только.',
      },
      {
        url: 'https://github.com/consta-design-system/header-umd',
        name: 'Header-umd',
        description:
          'Для проектов без React. Прикручивается скриптом, есть настройки.',
        image: HeaderUmdImage,
      },
      {
        url: 'http://stats.consta.design/',
        name: 'Stats',
        description:
          'Компонент для отображения чисел, с заголовком, единицами измерения, иконками и другими настройками.',
        image: StatsImage,
      },
      {
        url: 'http://analytic-ui.consta.design/?path=/docs/feedbackform--playground',
        name: 'FeedbackForm',
        description:
          'Виджет обратной связи. Можно ставить оценки и писать отзывы.',
        image: FeedbackFormImage,
      },
      {
        url: 'http://gpn-responses.consta.design/',
        name: 'GPN-Responses',
        description:
          'Заглушки с сообщениями об ошибках и важных статусах с промышленными иллюстрациями.',
        image: GpnResponsesImage,
      },
    ],
  },
  {
    title: 'Адаптеры',
    items: [
      {
        url: 'http://ag-grid-adapter.consta.design/',
        name: 'agGridAdapter',
        description: 'Адаптер для таблицы ag-grid-react.',
        image: RcTableAdapterImage,
      },
      {
        url: 'http://rc-table-adapter.consta.design/?path=/story/common-start--page',
        name: 'rcTableAdapter',
        description: 'Адаптер для rc-table. Таблица со множеством настроек.',
        image: RcTableAdapterImage,
      },
      {
        url: 'http://rc-tree-adapter.consta.design/',
        name: 'rcTreeAdapter',
        description:
          'Адаптер для rc-tree. Дерево, подходит для создания иерархических структур.',
        image: RcTreeAdapterImage,
      },
      {
        url: 'http://gantt-task-react-adapter.consta.design/',
        name: 'gantt-task-react-adapter',
        description: 'Адаптер для gantt-task-react. Диаграмма Ганта.',
        image: GanttImage,
      },
      {
        url: 'http://react-big-calendar-adapter.consta.design/',
        name: 'react-big-calendar-adapter',
        description: 'Адаптер для календаря react-big-calendar.',
        image: ReactBigCalendarImage,
      },
    ],
  },
];
