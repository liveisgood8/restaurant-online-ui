import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { ImageUpload } from './ImageUpload';
import { LoadingSpinner } from '../LoadingSpinner';

interface IImageProps {
  className?: string;
  enableUploading?: boolean;
  src?: string;
  alt?: string;
  isUploading?: boolean;

  onUpload?: (file: File) => void;
}

export const ImageContainer: React.FC<IImageProps> = (props) => {
  return (
    <div className={cn('image-container position-relative p-1',
      { 'image-container-hover': props.enableUploading },
      props.className)}
    >
      <img className="w-100" src={props.src} alt={props.alt} />
      {props.isUploading && (
        <div className="loading-spinner-wrapper">
          <LoadingSpinner />
        </div>
      )}
      {!props.isUploading && props.enableUploading ? (
        <ImageUpload
          className="image-upload"
          isUploading={props.isUploading}
          onUpload={props.onUpload}
        />
      ) : null}
    </div>
  );
};
