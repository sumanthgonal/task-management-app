import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const now = new Date();

    // Get total tasks
    const allTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));

    // Get completed tasks
    const completedTasks = allTasks.filter(task => task.status === 'completed');

    // Get in-progress tasks
    const inProgressTasks = allTasks.filter(task => task.status === 'in-progress');

    // Get upcoming tasks (due in the next 7 days)
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingTasks = allTasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) > now && 
      new Date(task.dueDate) <= sevenDaysFromNow
    );

    return NextResponse.json({
      total: allTasks.length,
      completed: completedTasks.length,
      inProgress: inProgressTasks.length,
      upcoming: upcomingTasks.length,
    });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 