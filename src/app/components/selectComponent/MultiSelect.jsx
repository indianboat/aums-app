import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MultiSelect = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const containerRef = useRef(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedSelection);
    onSelect(updatedSelection); // Trigger your custom onSelect function
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={`cursor-pointer p-2 rounded-md ${
          selectedOptions.length > 0 ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={toggleSelect}
      >
        {selectedOptions.length === 0 ? placeholder : selectedOptions.join(', ')}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 bg-white border border-gray-300 w-48 py-2 rounded-md shadow-lg"
          >
            {options.map((option) => (
              <li
                key={option}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  selectedOptions.includes(option) ? 'bg-gray-200' : ''
                }`}
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

export default MultiSelect;
