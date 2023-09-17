import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Select = ({ options, onSelect, className, placeholder, id, value  }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const containerRef = useRef(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Trigger your custom onSelect function
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
    <div className="relative" ref={containerRef}>
      <div
        className="cursor-pointer bg-[#eaeef0] dark:bg-[#141417] px-[10px] py-[10px] rounded-xl"
        onClick={toggleSelect}
        id={id}
      >
        {selectedOption || placeholder}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute mt-2 p-3 overflow-auto bg-[#eaeef0] dark:bg-[#141417] w-48 lg:h-fit md:h-44 sm:40 h-36 z-30 rounded-xl shadow-lg ${className}`}
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-400 select-none rounded-md dark:hover:bg-neutral-700"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;



