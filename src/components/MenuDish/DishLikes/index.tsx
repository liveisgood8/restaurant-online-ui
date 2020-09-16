import './styles.css';

import React from 'react';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDishLikes } from '../../../api/dishes';

interface IDishLikesProps {
  likes: IDishLikes,

  onLike?: () => void;
  onDislike?: () => void;
}

export const DishLikes: React.FC<IDishLikesProps> = ({ likes, onLike, onDislike }) => {
  return (
    <div className="m-3 likes-container text-secondary">
      <FontAwesomeIcon
        size="lg"
        icon={faThumbsUp}
        className="cursor-pointer like-icon like-icon__positive"
        onClick={onLike}
      />
      <span className="ml-1">{likes.likeCount}</span>
      <FontAwesomeIcon
        size="lg"
        icon={faThumbsDown}
        className="cursor-pointer like-icon like-icon__negative ml-3"
        onClick={onDislike}
      />
      <span className="ml-1">{likes.dislikeCount}</span>
    </div>
  );
};
