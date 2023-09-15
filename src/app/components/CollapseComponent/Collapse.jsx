"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


const Collapse = ({children, list=[], onClick}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
  <>
  <div className="w-full">
    <button onClick={toggleCollapse} className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex justify-between items-center gap-x-4 w-full px-4 py-2 rounded-lg"><span className="flex gap-x-4 items-center">{children}</span> {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
    <AnimatePresence>
      {
        isOpen && (
          <motion.div  
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration:0.2 }}
          className="border"
          >
            <div className="px-4 py-2 bg-slate-50 rounded-xl dark:bg-neutral-900 mt-1">
              <ul className="flex flex-col gap-y-2">
                {
                  list.map((item, index)=>{
                    return (
                     <li key={index} className="flex w-full">
                        <Link className="text-sm font-normal hover:text-primary px-4 py-1" href={`${item.link}`} onClick={onClick}>{item.name}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>

  </div>
  </>
  )
}

export default Collapse;