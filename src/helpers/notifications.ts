import { toast } from 'react-toastify';

export function showInfoNotification(text: string): void {
  toast.info(text, {
    autoClose: 1500,
  });
}
