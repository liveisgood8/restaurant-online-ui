import { toast } from 'react-toastify';

interface INotificationOptions {
  autoClose?: number | false;
}

export function showInfoNotification(text: string, options?: INotificationOptions): void {
  toast.info(text, {
    autoClose: options?.autoClose != null ? options.autoClose : 1500,
  });
}

export function showSuccessNotification(text: string, options?: INotificationOptions): void {
  toast.success(text, {
    autoClose: options?.autoClose != null ? options.autoClose : 1500,
  });
}

