import React from "react";
import { twMerge } from "tailwind-merge";

export const SectionWrapper = ({
  children,
  id,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <section
      className={twMerge("bg-neutral-10 text-accent-1", className)}
      id={id}
    >
      <div
        className={twMerge(
          "container mx-auto  place-items-center gap-8 px-4",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
