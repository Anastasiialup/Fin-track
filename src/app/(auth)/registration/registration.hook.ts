'use client';

import { useRouter } from 'next/navigation';
import { signInWithCredentials } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';

type AuthFormData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const router = useRouter();

  const handleCancelAuthForm = () => {
    router.push('/');
  };

  const handleLoginAuthForm = async (userData: AuthFormData) => {
    const result = await signInWithCredentials(userData);
    if (result.success) {
      document.dispatchEvent(new Event('visibilitychange'));
      successToast('You have successfully signed in');
      router.push('/');
    } else {
      warningToast('Login or password are not valid');
    }
  };

  return {
    handleCancelAuthForm,
    handleLoginAuthForm,
  };
};

export default useLogin;
