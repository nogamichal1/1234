
'use client';

import { useState, useMemo } from 'react';
import { useContractors } from '@/context/ContractorsContext';
import Link from 'next/link';

type Contractor = {
  id: string;
  company: string;
  vat: string;
  users: number;
  created: string; // ISO date
};


type SortState = {
  key: keyof Contractor;
  direction: 'asc' | 'desc';
};

export default function ContractorsTable() {
  const { contractors } = useContractors();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState>({ key: 'company', direction: 'asc' });

  const filtered = useMemo(() => {
    return contractors.filter((c) =>
      [c.CompanyId.toString(), c.CompanyName, c.CompanyVat, c.Users.toString(), c.CompanyRegistrationDate]
        .some((field) => field.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const sorted = useMemo(() => {
    const sortedData = [...filtered].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sort.direction === 'asc'
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });
    return sortedData;
  }, [filtered, sort]);

  const handleSort = (key: keyof Contractor) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortIcon = (key: keyof Contractor) => {
    if (sort.key !== key) return '↕︎';
    return sort.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Szukaj..."
          className="border p-2 rounded w-full max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="ml-4 bg-brand-primary text-white py-2 px-4 rounded shadow hover:opacity-90 transition"
          disabled
        >
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-brand-dark text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('id')}>
                C-ID {sortIcon('id')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('company')}>
                NAZWA FIRMY {sortIcon('company')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('vat')}>
                VAT {sortIcon('vat')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('users')}>
                USERS {sortIcon('users')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('created')}>
                REGISTRATION DATE {sortIcon('created')}
              </th>
              <th className="px-4 py-3">OPTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((c) => (
              <tr key={c.CompanyId.toString()} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.CompanyId.toString()}</td>
                <td className="px-4 py-2">{c.CompanyName}</td>
                <td className="px-4 py-2">{c.CompanyVat}</td>
                <td className="px-4 py-2 text-center">{c.Users}</td>
                <td className="px-4 py-2">{new Date(c.CompanyRegistrationDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <Link href={`/kontrahenci/${c.CompanyId.toString()}`}
                    className="text-brand-primary underline hover:no-underline">
                    Folder
                  </Link>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Brak wyników
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
