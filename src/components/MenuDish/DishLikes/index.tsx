import './styles.scss';
import { ReactComponent as LikeIcon } from './thumbs-up.svg';
import { ReactComponent as DislikeIcon } from './thumbs-down.svg';

import React from 'react';
import cn from 'classnames';
import { IDishLikes } from '../../../api/dishes';

interface IDishLikesProps {
  className?: string;
  likes: IDishLikes;
  disabled?: boolean;

  onLike?: () => void;
  onDislike?: () => void;
}

export const DishLikes: React.FC<IDishLikesProps> = ({ className, likes, disabled, onLike, onDislike }) => {
  return (
    <div className={cn('d-flex align-items-center dish__likes', className)}>
      <div className={cn({ 'dish__like-wrapper': !disabled })}>
        <LikeIcon className={cn({ 'cursor-pointer': !disabled })} onClick={!disabled ? onLike : undefined} />
        <span className="ml-1">{likes.likeCount}</span>
      </div>
      <div className={cn({ 'dish__dislike-wrapper': !disabled }, 'ml-2')}>
        <DislikeIcon className={cn({ 'cursor-pointer': !disabled })} onClick={!disabled ? onDislike : undefined} />
        <span className="ml-1">{likes.dislikeCount}</span>
      </div>
    </div>
  );
};
