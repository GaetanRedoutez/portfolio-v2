import { UserStar } from "iconoir-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full bg-common-2 text-neutral-2 h-20">
      <div className="flex justify-center items-center h-full">
        @2025 - All rights reserved
        <Link href={"/admin"} className="fixed bottom-0 right-0">
          {" "}
          <UserStar width={16} height={16} />{" "}
        </Link>
      </div>
    </div>
  );
};
