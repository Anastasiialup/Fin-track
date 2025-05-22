import { NextResponse } from 'next/server';
import { db } from '../../../../database/drizzle';
import { goals } from '../../../../database/schema';

export async function POST(req: Request) {
  const userId = 1; // TODO: замінити на авторизованого

  try {
    const body = await req.json();
    const { name, description, price, currency } = body;

    const [newGoal] = await db
      .insert(goals)
      .values({
        name,
        description,
        price,
        currency,
        status: 'not_completed',
        userId,
      })
      .returning();

    return NextResponse.json(newGoal);
  } catch (e) {
    return NextResponse.json({ error: 'Помилка при створенні цілі' }, { status: 500 });
  }
}
