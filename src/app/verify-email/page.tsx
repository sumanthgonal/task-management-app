import { redirect } from 'next/navigation';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;

  if (!token) {
    redirect('/login');
  }

  try {
    const res = await fetch(`/api/auth/verify-email?token=${token}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to verify email');
    }

    redirect('/login?verified=true');
  } catch (error) {
    redirect('/login?error=verification-failed');
  }
} 