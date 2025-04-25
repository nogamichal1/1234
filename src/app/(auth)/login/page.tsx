
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const allowedDomain = '@hogs.live';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith(allowedDomain)) {
      setError(`Dozwolone są wyłącznie adresy ${allowedDomain}`);
      return;
    }
    try {
      if (!auth) throw new Error('Brak połączenia z Firebase');
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Nieprawidłowy email lub hasło');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">HOGS CRM – Logowanie</h1>
        <input
          type="email"
          placeholder="Adres e-mail"
          className="border w-full p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className="border w-full p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-lime-400 to-brand-primary text-white font-semibold py-2 rounded hover:opacity-90 transition"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}
