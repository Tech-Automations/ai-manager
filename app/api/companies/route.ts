import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CompanyCreateSchema = z.object({
  name: z.string().min(1, 'name is required'),
  domain: z.string().trim().optional().nullable(),
  subscriptionPlan: z.string().trim().default('free'),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const take = Math.min(parseInt(url.searchParams.get('take') ?? '50', 10), 100);
  const skip = parseInt(url.searchParams.get('skip') ?? '0', 10);
  const q = url.searchParams.get('q') ?? undefined;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { domain: { contains: q, mode: 'insensitive' } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.company.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.company.count({ where }),
  ]);

  return NextResponse.json({ data, paging: { total, skip, take } });
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = CompanyCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, domain, subscriptionPlan } = parsed.data;

    const created = await prisma.company.create({
      data: {
        name,
        domain: domain ?? null,
        subscriptionPlan,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
