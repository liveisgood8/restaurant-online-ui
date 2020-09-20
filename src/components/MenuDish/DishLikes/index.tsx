import './styles.css';

import React from 'react';
import cn from 'classnames';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDishLikes } from '../../../api/dishes';

interface IDishLikesProps {
  likes: IDishLikes;
  disabled?: boolean;

  onLike?: () => void;
  onDislike?: () => void;
}

export const DishLikes: React.FC<IDishLikesProps> = ({ likes, disabled, onLike, onDislike }) => {
  return (
    <div className="m-3 likes-container text-secondary">
      <FontAwesomeIcon
        size="lg"
        icon={faThumbsUp}
        className={cn('cursor-pointer', 'like-icon', { 'like-icon__positive': !disabled })}
        onClick={disabled ? undefined : onLike}
      />
      <span className="ml-1">{likes.likeCount}</span>
      <FontAwesomeIcon
        size="lg"
        icon={faThumbsDown}
        className={cn('cursor-pointer', 'like-icon', 'ml-3', { 'like-icon__negative': !disabled })}
        onClick={disabled ? undefined : onDislike}
      />
      <span className="ml-1">{likes.dislikeCount}</span>
    </div>
  );
};
