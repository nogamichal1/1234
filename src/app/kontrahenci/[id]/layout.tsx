
import ContractorNav from '@/components/ContractorNav';
import { ReactNode } from 'react';

export default function ContractorLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <ContractorNav />
      {children}
    </section>
  );
}
