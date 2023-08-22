import Link from "next/link";
import React from "react";

const Drawer = ({handleLinkClick}) => {
  return (
    <div className="border h-auto border-red-400 p-3">
      <ul className="border flex flex-col gap-3 w-full">
        <li className="border flex">
          <Link onClick={handleLinkClick} href={"/"} className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg">
            Home
          </Link>
        </li>
        <li className="border flex">
          <Link onClick={handleLinkClick} href={"/admin"} className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg">
            Admin
          </Link>
        </li>
        <li className="border flex">
          <Link onClick={handleLinkClick} href={"/faculty"} className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg">
            Faculty
          </Link>
        </li>
        <li className="border flex">
          <Link onClick={handleLinkClick} href={"/student"} className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg">
            Student
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
