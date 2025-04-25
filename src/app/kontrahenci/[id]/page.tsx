
'use client';
import { useParams } from 'next/navigation';
import { useContractors } from '@/context/ContractorsContext';
import { useState, useEffect } from 'react';

export default function ContractorDetails() {
  const { id } = useParams();
  const { contractors, updateContractor } = useContractors();
  const numericId = parseInt(Array.isArray(id)? id[0] : id, 10);
  const contractor = contractors.find((c) => c.CompanyId === numericId) ?? null;

  const [form, setForm] = useState({
    CompanyName: '',
    CompanyVat: '',
    CompanyCountry: '',
    CompanyZip: '',
    CompanyCity: '',
    CompanyAddress: '',
  });

  useEffect(() => {
    if (contractor) {
      const { CompanyName, CompanyVat, CompanyCountry, CompanyZip, CompanyCity, CompanyAddress } = contractor;
      setForm({ CompanyName, CompanyVat, CompanyCountry, CompanyZip, CompanyCity, CompanyAddress });
    }
  }, [contractor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isDirty = contractor
    ? Object.keys(form).some((k) => form[k as keyof typeof form] !== (contractor as any)[k])
    : false;

  const handleSave = () => {
    if (!contractor) return;
    updateContractor(numericId, form);
  };

  if (!contractor) {
    return <p className="text-red-600">Kontrahent nie znaleziony</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Dane kontrahenta – {contractor.CompanyId}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {([
          { label: 'Nazwa firmy', name: 'CompanyName' },
          { label: 'VAT', name: 'CompanyVat' },
          { label: 'Kraj', name: 'CompanyCountry' },
          { label: 'Kod pocztowy', name: 'CompanyZip' },
          { label: 'Miasto', name: 'CompanyCity' },
          { label: 'Ulica i numer', name: 'CompanyAddress' },
        ] as const).map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium mb-1">{f.label}</label>
            <input
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className={`py-2 px-6 rounded text-white font-semibold transition ${
            isDirty ? 'bg-brand-primary hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
}
