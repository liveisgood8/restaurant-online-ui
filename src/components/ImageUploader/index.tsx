import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export interface IFileWithPreviewUrl extends File {
  preview: string;
}

interface IImageUploaderProps {
  required?: boolean;
  onDropFiles?: (file: IFileWithPreviewUrl[]) => void;
  initialFilesOrImageUrls?: File[] | string[] | string;
}

const makePreviewUrlForFiles = (files: File[]): IFileWithPreviewUrl[] => {
  return files.map((file) => Object.assign(file, {
    preview: URL.createObjectURL(file)
  }));
};

const getImageUrlsIfAvailable = (initialFilesOrImageUrls?: File[] | string[] | string) => {
  if (typeof initialFilesOrImageUrls === 'string') {
    return [initialFilesOrImageUrls];
  } else if (
    initialFilesOrImageUrls?.length &&
    typeof initialFilesOrImageUrls[0] === 'string'
  ) {
    return initialFilesOrImageUrls as string[];
  }
  return [];
}

const getFilesIfAvailable = (initialFilesOrImageUrls?: File[] | string[] | string) => {
  if (Array.isArray(initialFilesOrImageUrls) &&
      initialFilesOrImageUrls?.length &&
      typeof initialFilesOrImageUrls[0] === 'object') {
      return makePreviewUrlForFiles(initialFilesOrImageUrls as File[]);
  }
  return [];
}

export const ImageUploader: React.SFC<IImageUploaderProps> = (props) => {
  const [files, setFiles] = useState<File[]>(getFilesIfAvailable(props.initialFilesOrImageUrls));
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const imagesWithPreview = makePreviewUrlForFiles(acceptedFiles);
      setFiles(imagesWithPreview);
      props.onDropFiles?.(imagesWithPreview);
    }
  });
  
  const getThumbs = useCallback(() => {
    let imageSrcUrls = [];

    if (!files.length) {
      imageSrcUrls = getImageUrlsIfAvailable(props.initialFilesOrImageUrls);
    } else {
      imageSrcUrls = files.map((file) => (file as IFileWithPreviewUrl).preview);
    }

    return (
      imageSrcUrls.map((imageUrl, i) => (
        <div style={thumb} key={i}>
          <div style={thumbInner}>
            <img
              src={imageUrl}
              style={img}
              alt="Загруженное изображение"
            />
          </div>
        </div>
    )));
  }, [files, props.initialFilesOrImageUrls])

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL((file as any).preview));
  }, [files]);

  const onInvalidFileInput = () => {
    if (props.required) {
      toast.error('Необходимо выбрать изображение!', {
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style: baseStyle })}>
        <input
          {...getInputProps()}
          name="image"
          onInvalid={onInvalidFileInput}
          required={props.required} />
        <p>Перетащите картинки или выберите вручную</p>
      </div>
      <aside style={thumbsContainer}>
        {getThumbs()}
      </aside>
    </section>
  );
};