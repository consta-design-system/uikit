import React from 'react';
import { storiesOf } from '@storybook/react';

import IconLeaf from '../Icon/icons/Leaf';
import Button from '../Button';

import SnackbarItem from './SnackbarItem';

storiesOf('Snackbar', module).add('Снекбар', () => (
  <div className="theme_color_gpn-dark" style={{ width: 400 }}>
    <SnackbarItem
      timer={10}
      icon={<IconLeaf size="m" />}
      button={
        <Button wpSize="s" form="default" view="ghost">
          Кнопка
        </Button>
      }
      view="system"
      text="Нейтральное сообщение о событии, которое не несет статусного смысла"
    />
  </div>
));

// import { Slide, ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Msg = props => {
//   console.log(props);

//   return (
//     <div>
//       Lorem ipsum dolor
//       <button>Retry</button>
//       {/* <button onClick={closeToast}>Close</button> */}
//     </div>
//   );
// };

// storiesOf('Snackbar', module)
//   // .addDecorator(withKnobs)
//   .add('Снекбар', () => {
//     return (
//       <div>
//         <button
//           onClick={() => {
//             toast(<Msg test="1" />, {
//               closeButton: false,
//             });
//           }}
//         >
//           Notify !
//         </button>
//         <ToastContainer
//           className="mycontainer"
//           transition={Slide}
//           hideProgressBar={true}
//           autoClose={false}
//           position={toast.POSITION.BOTTOM_CENTER}
//         />
//       </div>
//     );
//   });
