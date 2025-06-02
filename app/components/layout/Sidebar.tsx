'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  ChartBarIcon,
  CreditCardIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-brand-navy text-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Hypersense</h1>
        </div>
        
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  {
                    'bg-brand-blue text-white': isActive,
                    'text-white hover:bg-white/10': !isActive,
                  }
                )}
              >
                <item.icon
                  className={clsx('mr-3 h-6 w-6 flex-shrink-0', {
                    'text-white': isActive,
                    'text-white/70 group-hover:text-white': !isActive,
                  })}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 py-4">
          <Link
            href="/profile"
            className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            <UserCircleIcon className="mr-3 h-6 w-6 text-white/70 group-hover:text-white" />
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 