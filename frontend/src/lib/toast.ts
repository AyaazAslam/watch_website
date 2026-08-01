import { toast, type ToastOptions } from 'react-toastify';

const defaults: ToastOptions = {
  position: 'top-right',
  autoClose: 2800,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notify = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaults, ...options }),
  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaults, ...options }),
  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaults, ...options }),
  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaults, ...options }),
};
