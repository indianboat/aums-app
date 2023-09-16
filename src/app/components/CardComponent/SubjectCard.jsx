import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";


const SubjectCard = ({ subject, isSelected, onSelect }) => {

  const handleSelect = () => {
    if (!isSelected) {
      onSelect(subject);
    }
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={handleSelect}
        className={`p-4 border rounded-2xl shadow-md overflow-hidden ${isSelected ? 'bg-green-200 dark:bg-green-900' : 'bg-slate-300 dark:bg-neutral-800'} select-none cursor-pointer flex flex-row justify-between`}>
        <div className="">
          <p className='text-lg font-semibold'>{subject.subjectName}</p>
          <p className='text-sm'>Subject code: {subject.subjectCode}</p>
          <p className='text-sm'>Subject type: {subject.subjectType}</p>
          <p className='text-sm'>Credits: {subject.credits}</p>
        </div>
        <div className="flex justify-center items-start border rounded-e-xl">
          {/* <span className='text-lg text-center font-semibold uppercase border' style={{textOrientation:"mixed", writingMode:"vertical-rl"}}>{subject.subjectType}</span> */}
          {isSelected ? <ImCheckboxChecked size={20}/> : <ImCheckboxUnchecked size={20}/>}
        </div>
      </motion.div>
    </>
  )
}

export default SubjectCard