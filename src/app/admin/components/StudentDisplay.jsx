"use client";

import { PiEye } from "react-icons/pi";
import { CiEdit, CiTrash } from "react-icons/ci";
import Link from 'next/link';
import Button from '@/app/components/ButtonComponent/Button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDisplay = ({ students }) => {

  const data = [
    { id: 1, name: 'John Doe', age: 30, location: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, location: 'Los Angeles' },
    // Add more data here
  ];


  return (
    <>
      <AnimatePresence>
        <motion.div className="overflow-x-auto mx-auto">
          {
            students?.length <= 0 ? "No data Available"
              :
              <motion.table className="min-w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <thead>
                  <tr className="bg-gray-50 dark:bg-neutral-800">                    
                    <th className="py-3 px-4 text-left uppercase">student id</th>
                    <th className="py-3 px-4 text-left uppercase">name & email</th>
                    <th className="py-3 px-4 text-left uppercase">mobile</th>
                    <th className="py-3 px-4 text-left uppercase">course</th>
                    <th className="py-3 px-4 text-left uppercase">status</th>
                    <th className="py-3 px-4 text-left uppercase">action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students?.map((student, index) => (
                      <motion.tr key={index}
                        className="border-t border-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="py-2 px-4 uppercase">{student.enrol_num}</td>
                        <td className="py-2 px-4 capitalize">
                          <p className='text-md font-medium capitalize'>{student.name}</p>
                          <p className='text-sm font-normal lowercase text-gray-600 dark:text-gray-300'>{student.email}</p>
                        </td>
                        <td className="py-2 px-4">+91 {student.mobile}</td>
                        <td className="py-2 px-4 uppercase">{student.course}</td>
                        <td className="py-2 px-4">
                          {
                            student?.status == true ? <p className="dark:bg-[#183B2A] w-[140px] text-center bg-[#D1F4E0] text-green-600 px-4 py-1 rounded-full">Active</p> : <p className="dark:bg-[#441729] bg-[#FDD0DF] w-[140px] text-center px-4 py-1 rounded-full text-rose-700">Not Active</p>
                          }
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center justify-center gap-x-3">
                            <Link title="Visit" href="#!"><PiEye size={24} /></Link>
                            <Link title="Edit" href="#!"><CiEdit size={24} /></Link>
                            <Button title="Delete" className="rounded-full p-2"><CiTrash size={24} className='text-rose-800 dark:text-rose-500' /></Button>
                          </div>

                        </td>
                      </motion.tr>
                    ))
                  }
                </tbody>
              </motion.table>
          }
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default StudentDisplay