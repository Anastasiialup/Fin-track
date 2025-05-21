'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUp } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyAuthForm = async (userData: typeof form) => {
    const result = await signUp(userData);

    if (result.success) {
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);

      successToast('You have successfully signed in');
      router.push('/');
    } else {
      warningToast(result.error || 'Some error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleVerifyAuthForm(form);
    } catch (err) {
      warningToast('Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Реєстрація</h1>
      <form onSubmit={ handleSubmit } className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            value={ form.username }
            onChange={ handleChange }
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={ form.email }
            onChange={ handleChange }
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            value={ form.password }
            onChange={ handleChange }
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            name="profileImage"
            type="text"
            required
            value={ form.profileImage }
            onChange={ handleChange }
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={ loading }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50"
        >
          { loading ? 'Реєстрація...' : 'Зареєструватися' }
        </button>
      </form>
    </div>
  );
}
