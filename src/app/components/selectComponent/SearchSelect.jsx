"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillCloseCircle } from "react-icons/ai";
import Input from '../InputComponent/Input';

function SearchSelect({ options, placeholder, clear, onSelect, value }) {

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div className="relative">
        <div
          onClick={toggleSelect}
          className="bg-[#eaeef0] dark:bg-[#141417] px-[12px] py-[10px] min-w-40 rounded-xl cursor-pointer"
        >
          {value != "" ? value : placeholder}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-40 mt-2 z-30 bg-[#eaeef0] dark:bg-[#141417] rounded-xl p-2 shadow-md"
            >
              <div className="mb-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 outline-none rounded-xl bg-white dark:bg-neutral-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="overflow-y-auto">
                {options
                  .filter((option) =>
                    option.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((option, index) => (
                    <motion.div
                      key={index}
                      onClick={()=>{
                        handleOptionSelect(option)
                      }}
                      className="w-full p-2 text-left hover:bg-gray-400 rounded-lg dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      {option}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {value && clear == true ? (
        <div
          className="absolute flex justify-center items-center h-full px-1 top-0 right-0"
        >
          <AiFillCloseCircle size={18} onClick={handleClear} className='text-neutral-800 cursor-pointer'/>
        </div> 
      ): null}
    </div>
  );
}

export default SearchSelect;
