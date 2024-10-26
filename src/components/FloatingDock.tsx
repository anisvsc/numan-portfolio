import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconSun } from "@tabler/icons-react"; 
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const FloatingDock = ({ items, desktopClassName, mobileClassName }: FloatingDockProps) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
      />
    </>
  );
};

interface FloatingDockMobileProps {
  items: FloatingDockItem[];
  className?: string;
}

const FloatingDockMobile = ({ items, className }: FloatingDockMobileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center shadow-lg z-20"
      >
        <IconLayoutNavbarCollapse className="h-6 w-6 text-neutral-400" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-16 right-4 flex flex-col gap-2 bg-gray-800 p-4 rounded-lg shadow-lg" // Ensure dark background
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center shadow-md"
                >
                  <div className="h-6 w-6">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FloatingDockDesktopProps {
  items: FloatingDockItem[];
  className?: string;
}

const FloatingDockDesktop = ({ items, className }: FloatingDockDesktopProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-neutral-900 px-4 pb-3", // Ensure dark background
        className
      )}
    >
      <ProfilePicButton />
      <div className="h-8 border-l border-neutral-700 mx-2" />

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}

    </motion.div>
  );
};

interface IconContainerProps {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}

function IconContainer({ mouseX, title, icon, href }: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 50, 40]), 
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 50, 40]), 
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{
          width,
          height,
          translateY: 0, 
          translateX: 0, 
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-neutral-800 flex items-center justify-center relative mx-2"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 10 }} 
              exit={{ opacity: 0, y: -10 }} 
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-800 border border-neutral-900 text-neutral-400 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width, height }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

const ProfilePicButton = () => {
  return (
    <Link href="/" className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center relative">
      <Image
        alt="Profile"
        src="/pfp.webp" // Replace with your actual image source
        className="rounded-full"
        width={40}
        height={40}
      />
    </Link>
  );
}

export default FloatingDock;
