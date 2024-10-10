import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconSun, IconMoon } from "@tabler/icons-react"; // Import the icons for light/dark mode
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes"; // Import useTheme for theme toggling

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  const { theme, setTheme } = useTheme(); // Access theme and setTheme
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering to avoid hydration mismatch
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

const FloatingDockMobile = ({
  items,
  className,
  isDarkMode,
  toggleTheme,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => {
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

const FloatingDockDesktop = ({
  items,
  className,
  isDarkMode,
  toggleTheme,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => {
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
      <ProfilePicButton mouseX={mouseX} />

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}

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

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
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
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

function ProfilePicButton({ mouseX }: { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(true);

  const size = 42;

  return (
    <Link href="/">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center"
      >
        {imageLoaded && (
          <Image
            src="/pfp.webp"
            alt="User profile"
            width={size}
            height={size}
            className="rounded-full object-cover"
            onError={() => setImageLoaded(false)}
          />
        )}
      </motion.div>
    </Link>
  );
}


export default FloatingDock;