import * as React from 'react';
import { withKnobs, select, boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withDocs } from '@storybook-addons/docs';
import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';
import { IconTrash } from '../../icons/IconTrash/IconTrash';
import { Attach } from './Attach';

function Stories({
  loading,
  loadingText,
  fileName,
  loadingProgress,
  errorText,
  fileDescription,
  withButtonAction,
  fileExtension,
}) {
  return (
    <div style={{ maxWidth: 320 }}>
      <Attach
        loading={loading}
        loadingText={loadingText}
        fileName={fileName}
        loadingProgress={loadingProgress}
        errorText={errorText}
        fileDescription={fileDescription}
        buttonIcon={IconTrash}
        buttonTitle="Удалить"
        fileExtension={fileExtension}
        {...(withButtonAction && {
          onButtonClick: (e) => {
            e.stopPropagation();
            console.log('onButtonClick');
          },
        })}
        onClick={() => console.log('onClick')}
      />
    </div>
  );
}

const defaultKnobs = () => ({
  fileName: text('fileName', 'Приложенный документ'),
  fileDescription: text('fileDescription', '1,5 Mб 21.02.2019, 14:12'),
  fileExtension: text('fileExtension', 'doc'),
  errorText: text('errorText', ''),
  loading: boolean('loading', false),
  loadingProgress: number('loadingProgress', 70),
  loadingText: text('loadingText', 'Загрузка'),
  withButtonAction: boolean('withButtonAction', false),
});

storiesOf('UI-KIT|/Attach', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./Attach.md')['default'],
      },
    })
  )
  .add('playground', () => <Stories {...defaultKnobs()} />);

storiesOf('UI-KIT|/Examples/Attach', module)
  .add('_loading', () => (
    <StoryBookExample style={{ maxWidth: 360 }}>
      <Attach
        fileName="Документация"
        fileExtension="docx"
        fileDescription="1,5 Mб • 21.02.2019, 14:12"
        loadingText="Загрузка"
        loading
        loadingProgress={70}
      />
    </StoryBookExample>
  ))
  .add('_error', () => (
    <StoryBookExample style={{ maxWidth: 360 }}>
      <Attach
        fileName="Документация"
        fileExtension="docx"
        errorText="Ошибка: Файл не возможно загрузить"
      />
    </StoryBookExample>
  ))
  .add('_event', () => (
    <StoryBookExample style={{ maxWidth: 360 }}>
      <Attach
        fileName="Документация"
        fileExtension="docx"
        fileDescription="1,5 Mб 21.02.2020, 14:12"
        loadingText="Загрузка"
        buttonIcon={IconTrash}
        buttonTitle="Удалить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </StoryBookExample>
  ));
