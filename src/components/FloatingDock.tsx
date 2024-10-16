import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconSun, IconMoon } from "@tabler/icons-react"; 
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes"; 

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
  const { theme, setTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </>
  );
};

interface FloatingDockMobileProps {
  items: FloatingDockItem[];
  className?: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const FloatingDockMobile = ({ items, className, isDarkMode, toggleTheme }: FloatingDockMobileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center ml-2"
      >
        {isDarkMode ? (
          <IconSun className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        ) : (
          <IconMoon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        )}
      </button>
    </div>
  );
};

interface FloatingDockDesktopProps {
  items: FloatingDockItem[];
  className?: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const FloatingDockDesktop = ({ items, className, isDarkMode, toggleTheme }: FloatingDockDesktopProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      <ProfilePicButton />

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}

      {/* Partition before Dark Mode Toggle Button */}
      <div className="h-8 border-l border-gray-300 dark:border-neutral-700 mx-2" />

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center ml-2"
      >
        {isDarkMode ? (
          <IconSun className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        ) : (
          <IconMoon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        )}
      </button>
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

  // Adjust width and height ranges for hover effect
  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 50, 40]), // Width effect on hover
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 50, 40]), // Height effect on hover
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 30, 20]), // Change to 30 on hover
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 30, 20]), // Change to 30 on hover
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
          translateY: 0, // No vertical movement
          translateX: 0, // Keep X translation at 0
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative mx-2" // Added margin for spacing
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} // Change y to -10 to move the tooltip upwards
              animate={{ opacity: 1, y: 10 }} // Maintain Y position
              exit={{ opacity: 0, y: -10 }} // Change exit animation
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

const ProfilePicButton = () => {
  return (
    <Link href="/" className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative">
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
