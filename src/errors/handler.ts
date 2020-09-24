import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

function getErrorMessage(err: Error, defaultMessage?: string): string {
  if ((err as AxiosError).response?.data?.message) {
    return (err as AxiosError).response?.data?.message;
  }
  return defaultMessage || err.message || 'Неизвестная ошибка';
}

export function handleError(err: Error, defaultMessage?: string): void {
  const message = getErrorMessage(err, defaultMessage);
  console.error(err);
  console.warn('Handled error:', message);
  toast.error(message);
}
