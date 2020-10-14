import './styles.scss';

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ImageUpload } from './ImageUpload';
import { LoadingSpinner } from '../LoadingSpinner';

interface IImageProps {
  className?: string;
  enableUploading?: boolean;
  src?: string;
  fallbackSrc?: string;
  isUploading?: boolean;

  onUpload?: (file: File) => void;
}

export const ImageContainer: React.FC<IImageProps> = (props) => {
  const [source, setSource] = useState(props.src || props.fallbackSrc);
  const [showNoImage, setShowNoImage] = useState(props.src == null);

  useEffect(() => {
    setShowNoImage(!props.fallbackSrc && props.src == null);
    setSource(props.src || props.fallbackSrc);
  }, [props.src, props.fallbackSrc]);

  return (
    <div className={cn(props.className, 'image-container position-relative',
      { 'image-container-hover': props.enableUploading })}
    >
      {showNoImage ? (
        <div className="image-container__no-image-preview w-100 h-100 d-flex align-items-center justify-content-center">
          <span className="ro-font-light-small no-image-preview__label">Нет изображения</span>
        </div>
      ) : (
        <img onError={() => setSource(props.fallbackSrc)} className="p-1" src={source} alt="" />
      )}
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
