export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.company.findMany({ orderBy: { CompanyName: 'asc' } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const data: any = { ...body };
  if (data.CompanyRegistrationDate) {
    data.CompanyRegistrationDate = new Date(data.CompanyRegistrationDate);
  }

  try {
    const created = await prisma.company.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    // P2002 — unique constraint failed (CompanyVat)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return NextResponse.json(
        { message: 'Firma z takim NIP‑em już istnieje' },
        { status: 409 },
      );
    }
    console.error('POST /api/contractors error', e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
