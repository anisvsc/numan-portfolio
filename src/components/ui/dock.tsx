"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Define props for the Dock component
export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode; // Accept children
}

// Default values for distance
const DEFAULT_DISTANCE = 140;

// Define the variants for the dock
const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

// Dock component definition
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            distance: distance,
            direction: direction, // Pass direction to DockIcon
          });
        }
        return child; // Return child as is if it's not a DockIcon
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

// Define props for the DockIcon component
export interface DockIconProps {
  size?: number;
  distance?: number;
  mouseX?: number; // Use specific type for mouseX
  className?: string;
  children?: React.ReactNode;
  direction?: "top" | "middle" | "bottom"; // Add direction prop here
}

// DockIcon component definition
const DockIcon = ({
  size,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  direction = "bottom", // Default direction
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2; // Calculate the distance
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, 0, 40], // Use fixed width for hover
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
        {
          // Adjust positioning based on direction
          "self-start": direction === "top",
          "self-center": direction === "middle",
          "self-end": direction === "bottom",
        }
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

// Export both Dock and DockIcon components
export { Dock, DockIcon, dockVariants };
