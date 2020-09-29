import { toast } from 'react-toastify';

export function showInfoNotification(text: string): void {
  toast.info(text, {
    autoClose: 1500,
  });
}

export function showSuccessNotification(text: string): void {
  toast.success(text, {
    autoClose: 1500,
  });
}

