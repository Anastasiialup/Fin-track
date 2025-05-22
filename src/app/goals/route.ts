import { NextResponse } from 'next/server';
import { db } from '../../../database/drizzle';
import { goals } from '../../../database/schema';
import { auth } from '../../lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const userGoals = await db.select().from(goals).where(goals.userId.eq(userId));

  return NextResponse.json(userGoals);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const { title, description } = data;

  if (!title) {
    return NextResponse.json({ message: 'Title is required' }, { status: 400 });
  }

  const newGoal = await db.insert(goals).values({
    userId: session.user.id,
    title,
    description,
    status: 'active', // або ваш дефолтний статус
  }).returning();

  return NextResponse.json(newGoal[0]);
}
