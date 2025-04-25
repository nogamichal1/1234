
'use client';
import { useState } from 'react';
import ContractorsTable from '@/components/ContractorsTable';
import AddContractorModal from '@/components/AddContractorModal';

export default function ContractorsPage() {
  const [show, setShow] = useState(false);
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Kontrahenci</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShow(true)}
          className="bg-brand-primary text-white py-2 px-4 rounded shadow hover:opacity-90 transition"
        >
          Dodaj kontrahenta
        </button>
      </div>
      <ContractorsTable />
      {show && <AddContractorModal onClose={() => setShow(false)} />}
    </section>
  );
}
