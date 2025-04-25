
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractors } from '@/context/ContractorsContext';

export default function AddContractorModal({ onClose }: { onClose: () => void }) {
  const { addContractor } = useContractors();
  const router = useRouter();
  const [form, setForm] = useState({
    CompanyName: '',
    CompanyVat: '',
    CompanyCountry: '',
    CompanyZip: '',
    CompanyCity: '',
    CompanyAddress: '',
    CompanyRegistrationDate: '2025-04-25',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [loading,setLoading]=useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const canSave = Object.values(form).every((v) => v);

  
  const handleSave = async () => {
  if (loading || !canSave) return;
  setLoading(true);
  try {
    const created = await addContractor({ ...form, Users: 0 });
    onClose();
    if (created?.CompanyId) router.push(`/kontrahenci/${created.CompanyId}`);
  } catch (e: any) {
    if (e?.status === 409) setErrorMsg('Firma z takim NIP‑em już istnieje');
    else setErrorMsg('Wystąpił błąd – spróbuj ponownie');
  } finally {
    setLoading(false);
  }
};

  const fieldList = [
    ['Nazwa firmy', 'CompanyName'],
    ['VAT', 'CompanyVat'],
    ['Kraj', 'CompanyCountry'],
    ['Kod pocztowy', 'CompanyZip'],
    ['Miasto', 'CompanyCity'],
    ['Ulica i numer', 'CompanyAddress'],
    ['Data rejestracji (YYYY-MM-DD)', 'CompanyRegistrationDate'],
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow max-w-xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">Nowy kontrahent</h2>
        <div className="grid md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {fieldList.map(([label, name]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={onChange}
                className="border rounded p-2 w-full"
              />
            </div>
          ))}
        </div>
        {errorMsg && <p className="text-red-600 text-sm mt-4" role="alert">{errorMsg}</p>}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="py-2 px-6 rounded border border-gray-300 hover:bg-gray-100"
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave || loading}
            className={`py-2 px-6 rounded text-white font-semibold ${
              canSave ? 'bg-brand-primary hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Zapisywanie...' : 'Zapisz'}
          </button>
        </div>
      </div>
    </div>
  );
}
