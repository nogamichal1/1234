
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

const links = [
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/kontrahenci', label: 'KONTRAHENCI' },
  { href: '/ferry', label: 'FERRY' },
  { href: '/rozliczenia', label: 'ROZLICZENIA' },
  { href: '/ustawienia', label: 'USTAWIENIA' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Ukryj pasek, jeśli użytkownik nie jest zalogowany (np. /login)
  if (!user) return null;

  const handleSignOut = () => {
    if (!auth) return;
    signOut(auth);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-brand-dark bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-semibold">HOGS CRM</div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        >
          ☰
        </button>
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname.startsWith(l.href) ? 'text-brand-primary' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleSignOut} className="ml-4 underline">
              Wyloguj
            </button>
          </li>
        </ul>
      </div>
      {open && (
        <ul className="md:hidden bg-brand-dark px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={pathname.startsWith(l.href) ? 'text-brand-primary' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleSignOut} className="underline">
              Wyloguj
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
