import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CompanyUpdateSchema = z
  .object({
    name: z.string().min(1).optional(),
    domain: z.string().trim().nullable().optional(),
    subscriptionPlan: z.string().trim().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, { message: 'No fields to update' });

function parseId(param: string) {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid id');
  return id;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        projects: true,
        users: true,
        teams: true,
      },
    });
    if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(company);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    const json = await request.json();
    const parsed = CompanyUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.company.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (e) {
    if ((e as any)?.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    await prisma.company.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if ((e as any)?.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
