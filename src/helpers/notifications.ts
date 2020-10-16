import { toast } from 'react-toastify';

interface INotificationOptions {
  autoClose?: number | false;
}

class Notifications {
  info(text: string, options?: INotificationOptions) {
    toast.info(text, {
      autoClose: options?.autoClose != null ? options.autoClose : 1500,
    });
  }

  success(text: string, options?: INotificationOptions) {
    toast.success(text, {
      autoClose: options?.autoClose != null ? options.autoClose : 1500,
    });
  }

  warning(text: string, options?: INotificationOptions) {
    toast.warning(text, {
      autoClose: options?.autoClose != null ? options.autoClose : 1500,
    });
  }
}

export const notifications = new Notifications();

