
'use client';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

const tabs = [
  { slug: '', label: 'Dane kontrahenta' },
  { slug: 'uzytkownicy', label: 'Użytkownicy' },
  { slug: 'limit', label: 'Limit' },
  { slug: 'aitms', label: 'aiTMS' },
  { slug: 'freight', label: 'Freight Automation' },
  { slug: 'ferry', label: 'Ferry' },
  { slug: 'insurance', label: 'Insurance' },
  { slug: 'zamowienia', label: 'Zamówienia' },
  { slug: 'licencje', label: 'Licencje' },
  { slug: 'ustawienia', label: 'Ustawienia' },
];

export default function ContractorNav() {
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <nav className="border-b mb-6 overflow-x-auto">
      <ul className="flex gap-6 whitespace-nowrap text-sm">
        {tabs.map((t) => {
          const href = `/kontrahenci/${id}` + (t.slug ? `/${t.slug}` : '');
          const active = pathname === href;
          return (
            <li key={t.slug}>
              <Link
                href={href}
                className={active ? 'font-semibold text-brand-primary' : 'text-gray-600 hover:text-brand-primary'}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
