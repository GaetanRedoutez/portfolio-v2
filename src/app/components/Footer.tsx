import { UserStar } from "iconoir-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full bg-common-2 text-neutral-2 h-20">
      <div className="flex flex-col justify-center items-center h-full">
        Gaëtan Redoutez | @2025 - All rights reserved
        <div className="w-full flex justify-end">
          <Link href={"/admin"}>
            {" "}
            <UserStar width={16} height={16} />{" "}
          </Link>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};
