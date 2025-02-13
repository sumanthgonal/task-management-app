import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects, tasks } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
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

    // Get all projects for the user
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId));

    // Get tasks for each project
    const projectsWithProgress = await Promise.all(
      userProjects.map(async (project) => {
        const projectTasks = await db
          .select()
          .from(tasks)
          .where(
            and(
              eq(tasks.projectId, project.id),
              eq(tasks.userId, userId)
            )
          );

        const completedTasks = projectTasks.filter(
          (task) => task.status === 'completed'
        );

        return {
          ...project,
          totalTasks: projectTasks.length,
          completedTasks: completedTasks.length,
        };
      })
    );

    return NextResponse.json(projectsWithProgress);
  } catch (error) {
    console.error('Error fetching project progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 