"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ButtonComponent/Button';
import { RiUser3Fill } from "react-icons/ri";
import Link from 'next/link';
import ButtonGroup from '../ButtonComponent/ButtonGroup';


const Dropdown = ({ handleSignout, userName, profileLink}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        type="button"
        className="flex p-2 w-50 h-50 justify-center rounded-full shadow bg-[#F2F2F2] dark:bg-[#16181A]"
      >
        <RiUser3Fill size={22} strokeWidth={0.1} className='text-neutral-700 dark:text-neutral-300' />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, originX: 1, originY: 0 }}
            animate={{ opacity: 1, scale: 1, originX: 1, originY: 0 }}
            exit={{ opacity: 0, scale: 0, originX: 1, originY: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 500, damping: 30 }}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-[#18191C] overflow-auto"
          >
            <div className="p-3 flex flex-col gap-y-2 rounded-xl" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

              <div className="flex flex-col p-2 rounded-lg gap-y-1 dark:bg-neutral-950 bg-slate-100">
                <span className='text-[12px] font-normal uppercase text-gray-400'>welcome</span>
                <h1 className='text-sm uppercase'>{userName}</h1>
              </div>
              <div className="flex flex-col p-2 rounded-lg gap-y-1 dark:bg-neutral-950 bg-slate-100">
                <span className='text-[12px] font-normal uppercase text-gray-400'>Theme</span>
                <ButtonGroup className="flex flex-row rounded-full justify-center items-center" />
              </div>
              <Link href={profileLink} role="menuitem" onClick={closeDropdown} className='bg-slate-100 dark:bg-neutral-950 font-medium text-sm uppercase py-2 px-4 rounded-lg hover:bg-neutral-200 text-gray-900 dark:text-gray-300'>Profile</Link>

              <Button
                className="text-left bg-rose-100 dark:bg-neutral-950 dark:hover:bg-rose-700 font-medium rounded-lg py-2 px-4 text-sm uppercase text-danger hover:bg-rose-600 hover:text-rose-200"
                onClick={() => { handleSignout(); closeDropdown(); }}
              >
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;