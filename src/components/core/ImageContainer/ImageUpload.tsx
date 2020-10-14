import React from 'react';

interface IImageUploadProps {
  className?: string;
  isUploading?: boolean;

  onUpload?: (file: File) => void;
}

export const ImageUpload: React.FC<IImageUploadProps> = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.onUpload && e.currentTarget.files?.length) {
      props.onUpload(e.currentTarget.files[0]);
    }
  };

  return (
    <label className={props.className}>
      <span
        className="text-center text-white"
      >
        Выбрать<br />изображение
      </span>
      <input
        type="file"
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png,.svg"
        onChange={onChange}
      />
    </label>
  );
};
