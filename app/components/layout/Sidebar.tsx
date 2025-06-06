'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Overview', href: '/', icon: HomeIcon },
  { name: 'Observe', href: '/observe', icon: ChartPieIcon },
  { name: 'Deviations', href: '/deviations', icon: DocumentMagnifyingGlassIcon },
  { name: 'Audit', href: '/audit', icon: DocumentMagnifyingGlassIcon },
  { name: 'Forecast', href: '/forecast', icon: ArrowTrendingUpIcon },
  { name: 'Contact us', href: '/contact', icon: ChatBubbleLeftIcon },
  { name: 'Share feedback', href: '/feedback', icon: ShareIcon },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-[240px] bg-[#0D1F40] text-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">H</span>
            </div>
            <h1 className="text-xl font-semibold">Hypersense</h1>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  {
                    'bg-blue-600 text-white': isActive,
                    'text-gray-300 hover:bg-blue-600/10 hover:text-white': !isActive,
                  }
                )}
              >
                <item.icon
                  className={clsx('mr-3 h-5 w-5 flex-shrink-0', {
                    'text-white': isActive,
                    'text-gray-400 group-hover:text-white': !isActive,
                  })}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4">
          <div className="flex items-center gap-3 px-3">
            <div className="h-8 w-8 rounded-full bg-gray-700">
              <img
                src="https://ui-avatars.com/api/?name=Akhil+M&background=random"
                alt="Profile"
                className="h-full w-full rounded-full"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Akhil.M</div>
              <button className="text-xs text-orange-400 hover:text-orange-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 