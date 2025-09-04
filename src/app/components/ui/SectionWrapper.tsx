import React from "react";
import clsx from "clsx";

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
      className={clsx("bg-neutral-10 min-h-screen text-accent-1", className)}
      id={id}
    >
      <div
        className={clsx(
          "container mx-auto grid h-screen place-items-center grid-cols-1 md:grid-cols-2 gap-8 px-4",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
