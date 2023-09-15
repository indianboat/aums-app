import { motion } from 'framer-motion';
import React, { useState } from 'react';


const SubjectCard = ({cardData, isSelected, onToggle, disabled}) => {

  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  const toggleCard = () => {
    if (!disabled) {
      setIsCardSelected(!isCardSelected);
      onToggle(cardData, !isCardSelected);
    }
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={toggleCard}
        className={`p-4 border rounded-2xl bg-slate-300 ${isCardSelected ? 'bg-green-200 dark:bg-green-900' : 'bg-slate-300 dark:bg-neutral-800'} select-none cursor-pointer`}>
        <p className='text-lg font-semibold'>{cardData.subjectName}</p>
        <p className='text-sm'>Subject code: {cardData.subjectCode}</p>
        <p className='text-sm'>Subject type: {cardData.subjectType}</p>
        <p className='text-sm'>Credits: {cardData.credits}</p>
      </motion.div>
    </>
  )
}

export default SubjectCard