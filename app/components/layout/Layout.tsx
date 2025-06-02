import { FC, ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-light">
      <Sidebar />
      <main className="ml-60 p-6">
        <div className="mx-auto max-w-[1440px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 