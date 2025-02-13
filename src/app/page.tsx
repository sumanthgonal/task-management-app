import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import MobileMenu from '@/components/landing/MobileMenu';

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  // Redirect to dashboard if user is already logged in
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">TaskManager</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </a>
                <a
                  href="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </a>
              </div>
            </div>
            <MobileMenu />
          </div>
        </nav>
      </header>

      <main>
        {/* Add padding-top to account for fixed header */}
        <div className="pt-16">
          <Hero />
          <Features />
          <CTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
