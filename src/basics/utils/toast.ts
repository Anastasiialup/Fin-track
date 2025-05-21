import { toast } from 'react-toastify';

export const successToast = (text: string) => {
  toast.success(text, { autoClose: 5000 });
};

export const warningToast = (text: string) => {
  toast.warning(text, { autoClose: 7500 });
};

export const errorToast = (text: string) => {
  toast.error(text, { autoClose: 10000 });
};
