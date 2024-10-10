import React from 'react';
import { useTheme } from 'next-themes';
import FloatingDock from './FloatingDock';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { title: 'Home', icon: <FaHome />, href: '/' },
  { title: 'About', icon: <FaUser />, href: '/about' },
  { title: 'Projects', icon: <FaProjectDiagram />, href: '/projects' },
  { title: 'Contact', icon: <FaEnvelope />, href: '/contact' },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-black`}>
      {/* FloatingDock moved to the top */}
      <div className="absolute left-1/2 top-4 transform -translate-x-1/2 flex items-center">
        <FloatingDock items={navItems} />
      </div>

      <main className="flex-grow p-4">
        {children}
      </main>

      <footer className="p-4">
        <p className="text-center text-sm text-white">© 2024 Numan's Portfolio</p>
      </footer>
    </div>
  );
};

export default MainLayout;
