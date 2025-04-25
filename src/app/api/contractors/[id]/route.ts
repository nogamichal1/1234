export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await prisma.company.update({
    where: { CompanyId: Number(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}
