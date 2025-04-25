'use client';

import { auth } from '@/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null | undefined;
};

const AuthContext = createContext<AuthContextType>({ user: undefined });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (!auth) return; // Skip on server
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
