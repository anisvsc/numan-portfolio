import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Link as IconLink } from 'lucide-react';

type CustomLinkProps = {
  className?: string;
  children: React.ReactNode;
  withIcon?: boolean;
  href: string;
  target?: string;
};

const CustomLink = ({ className, children, withIcon, href, target }: CustomLinkProps) => {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-1 transition-all hover:text-pink-400', className)} // Added hover color
      target={target}
    >
      <div className="linkIcon flex justify-center items-center transition-all">
        {withIcon ? <IconLink size={16} className="text-gray-800 dark:text-gray-300" /> : ''} {/* Adjusted icon color */}
      </div>
      <div className="relative prose dark:prose-invert text-gray-800 dark:text-gray-300 group"> {/* Adjusted text colors */}
        {children}
        <div className="absolute left-0 bottom-0 w-full h-[2px] bg-pink-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
      </div>
    </Link>
  );
};

export default CustomLink;
