
'use client';
import { createContext, useContext } from 'react';
import useSWR, { mutate } from 'swr';

export type ContractorDB = {
  CompanyId: number;
  CompanyName: string;
  CompanyVat: string;
  CompanyCountry: string;
  CompanyZip: string;
  CompanyCity: string;
  CompanyAddress: string;
  CompanyRegistrationDate: string;
  Users: number;
};

type ContractorsContextType = {
  contractors: ContractorDB[];
  addContractor: (data: Partial<ContractorDB>) => Promise<ContractorDB>;
  updateContractor: (id: number, data: Partial<ContractorDB>) => Promise<void>;
};

const ContractorsContext = createContext<ContractorsContextType>({
  contractors: [],
  addContractor: async () => ({ } as any),
  updateContractor: async () => {},
});

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function ContractorsProvider({ children }: { children: React.ReactNode }) {
  const { data: contractors = [] } = useSWR<ContractorDB[]>('/api/contractors', fetcher);

  const addContractor = async (payload: Partial<ContractorDB>) => {
    try {          const res = await fetch('/api/contractors', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
  const text = await res.text();
  const err: any = new Error(text || 'Request failed');
  err.status = res.status;
  throw err;
}
const created = await res.json();
    await mutate('/api/contractors'); // re-fetch list after create
          return created;
    } catch (e) {
      console.error('Add contractor failed', e);
      throw e;
    }
  };

  const updateContractor = async (id: number, payload: Partial<ContractorDB>) => {
    await fetch('/api/contractors/' + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    mutate('/api/contractors');
  };

  return (
    <ContractorsContext.Provider value={{ contractors, addContractor, updateContractor }}>
      {children}
    </ContractorsContext.Provider>
  );
}

export function useContractors() {
  return useContext(ContractorsContext);
}
