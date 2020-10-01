import { EmojiType } from './emoji-type';

function getEmoji(emojiType: EmojiType): string {
  switch (emojiType) {
    case EmojiType.SMILE:
      return '🙂';
    case EmojiType.SAD:
      return '😞';
    case EmojiType.OK:
      return '👌';
  }
}

export function emojify(text: string, emojiType: EmojiType): string {
  return text + ' ' + getEmoji(emojiType);
}

