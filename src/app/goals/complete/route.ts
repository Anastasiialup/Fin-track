import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '../../../../database/drizzle';
import { goals } from '../../../../database/schema';

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID цілі не вказано' }, { status: 400 });
  }

  try {
    await db.update(goals).set({ status: 'achieved' }).where(eq(goals.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Помилка при оновленні статусу' }, { status: 500 });
  }
}
