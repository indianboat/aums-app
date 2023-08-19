"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PiMoonFill, PiSunFill } from "react-icons/pi";
import { TbSunFilled } from "react-icons/tb";
import Skeleton from "../Skeleton";
// import Skeleton,  { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex items-center h-full justify-center">
        {mounted == false ? (
          <Skeleton width="28px" height="28px" circle />
        ) : (
          <button
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
            className="border p-2 rounded-xl bg-[#F2F2F2] dark:bg-[#16181A] shadow-lg duration-[0.3s] transition-all relative hover:shadow-none hover:translate-y-[1px]"
            aria-label="theme-icon"
            title={theme=== "dark"? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? (
              <TbSunFilled size={20} className="text-gray-300" />
            ) : (
              <PiMoonFill size={20} className="text-gray-700" />
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeSwitch;
