"use client";

import { motion } from 'framer-motion';
import { PiDesktopFill } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";
import { TbSunFilled } from "react-icons/tb";
import { useTheme } from 'next-themes';

const ButtonGroup = ({className}) => {
  const { theme, setTheme } = useTheme("system");

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className={`rounded-full w-full p-1 ${className}`}>
      <motion.button
        onClick={() => handleThemeChange('system')}
        type="button"
        className={`${theme === 'system' ? 'bg-slate-600 text-white' : 'text-gray-700'
          } p-2 rounded-full focus:outline-none w-full flex justify-center`}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        title='system'
      >
        <PiDesktopFill size={20} />
      </motion.button>
      <motion.button
        onClick={() => handleThemeChange('dark')}
        type="button"
        className={`${theme === 'dark' ? 'bg-slate-600 text-white' : ' text-gray-700'
          } p-2 rounded-full  focus:outline-none w-full flex justify-center`}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        title='dark'
      >
        <PiMoonFill size={20} />
      </motion.button>
      <motion.button
        onClick={() => handleThemeChange('light')}
        type="button"
        className={`${theme === 'light' ? 'bg-slate-600 text-white' : ' text-gray-700'
          } p-2 rounded-full focus:outline-none w-full flex justify-center`}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        title='light'
      >
        <TbSunFilled size={20} />
      </motion.button>
    </div>
  );
};

export default ButtonGroup;
