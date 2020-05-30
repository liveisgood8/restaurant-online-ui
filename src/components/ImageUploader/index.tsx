import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
  initialFiles?: File[];
}

const makePreviewUrlForFiles = (files: File[]): IFileWithPreviewUrl[] => {
  return files.map((file) => Object.assign(file, {
    preview: URL.createObjectURL(file)
  }));
};

export const ImageUploader: React.SFC<IImageUploaderProps> = (props) => {
  const [files, setFiles] = useState<File[]>(props.initialFiles ?
    makePreviewUrlForFiles(props.initialFiles) : []);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const imagesWithPreview = makePreviewUrlForFiles(acceptedFiles);
      setFiles(imagesWithPreview);
      props.onDropFiles?.(imagesWithPreview);
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={(file as any).preview}
          style={img}
          alt="Загруженное изображение"
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL((file as any).preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style: baseStyle })}>
        <input {...getInputProps()} required={props.required} />
        <p>Перетащите картинки или выберите вручную</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
};