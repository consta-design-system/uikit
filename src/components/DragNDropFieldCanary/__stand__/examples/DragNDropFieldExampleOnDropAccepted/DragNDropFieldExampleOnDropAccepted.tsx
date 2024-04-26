import './DragNDropFieldExampleOnDropAccepted.css';

import { IconCheck } from '@consta/icons/IconCheck';
import { IconRevert } from '@consta/icons/IconRevert';
import { Example } from '@consta/stand';
import React, { useEffect, useState } from 'react';

import { Attachment } from '##/components/Attachment';
import {
  DragNDropField,
  DragNDropFieldInformer,
} from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';
import { cn } from '##/utils/bem';

const cnDragNDropFieldExampleOnDropAccepted = cn(
  'DragNDropFieldExampleOnDropAccepted',
);

export const DragNDropFieldExampleOnDropAccepted = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <Example col={1}>
      <>
        <DragNDropField multiple onDropAccepted={setFiles}>
          <Text>Перетяните файлы сюда</Text>
        </DragNDropField>
        {files.length > 0 && (
          <div
            className={cnDragNDropFieldExampleOnDropAccepted('AttachmentList')}
          >
            {files.map((file, index) => (
              <Attachment
                key={index}
                fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
                fileName={file.name}
                fileDescription={file.type}
                withPictogram
              />
            ))}
          </div>
        )}
      </>
    </Example>
  );
};

export const DragNDropFieldExampleOnDropAcceptedWithInformer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean | number>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (files.length > 0 && !isLoaded) {
      const interval = setInterval(() => {
        setLoading((loading as number) + 1);
      }, 20);

      if (loading > 100) {
        setIsLoaded(true);
        setLoading(false);
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [loading, files, isLoaded]);

  return (
    <Example col={1}>
      <div>
        <DragNDropField
          multiple
          onDropAccepted={(files) => {
            setFiles(files);
            setLoading(1);
          }}
        >
          <Text view="primary" size="m" lineHeight="m">
            Перетяните файлы сюда, чтобы увидеть &quot;загрузку&quot;
          </Text>
        </DragNDropField>
        <DragNDropFieldInformer
          status="default"
          icon={isLoaded ? IconCheck : undefined}
          loading={loading}
          text={
            isLoaded || !loading
              ? `Загружено файлов: ${files.length}`
              : 'Загрузка...'
          }
          withButton
          buttonLabel="Заново"
          buttonIcon={IconRevert}
          onButtonClick={() => {
            setIsLoaded(false);
            setFiles([]);
          }}
        />
        {isLoaded && (
          <div
            className={cnDragNDropFieldExampleOnDropAccepted('AttachmentList')}
          >
            {files.map((file, index) => (
              <Attachment
                key={index}
                fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
                fileName={file.name}
                fileDescription={file.type}
                withPictogram
              />
            ))}
          </div>
        )}
      </div>
    </Example>
  );
};
