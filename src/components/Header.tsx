import { useStore } from '@/store/useStore';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { session, logout } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <input
                type="search"
                placeholder="Search tasks..."
                className={`${
                  isSearchOpen ? 'w-64' : 'w-0'
                } transition-all duration-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700"
              >
                🔍
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              🔔
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {session?.user?.name?.[0] || '👤'}
                  </div>
                </button>
              </div>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      {session?.user?.name}
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 