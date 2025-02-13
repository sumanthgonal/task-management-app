import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(req.url);
    
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    
    let query = db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));

    if (projectId) {
      query = query.where(eq(tasks.projectId, parseInt(projectId)));
    }

    if (status) {
      query = query.where(eq(tasks.status, status));
    }

    const userTasks = await query;
    return NextResponse.json(userTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const data = await req.json();

    const [newTask] = await db
      .insert(tasks)
      .values({
        ...data,
        userId,
      })
      .returning();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 