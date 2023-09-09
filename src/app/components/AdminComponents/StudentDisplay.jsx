"use client";

import { CiEdit, CiTrash } from "react-icons/ci";
import Button from '@/app/components/ButtonComponent/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/app/components/ModalComponent/Modal';
import { useState } from "react";
import Spinner from "../SpinnerComponent/Spinner";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";

const StudentDisplay = ({ students }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const openDeleteModal = (ind) => {
    setIsDeleteModalOpen(true);
    setId(ind);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteStudent = async () => {
    setLoading(true);

    const res = await fetch(`/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (res.status == 200 & res.ok) {
      closeModal();
      setLoading(false);
      toast.success("Student Deleted !");
      router.refresh();

    }
    else {
      toast.error(res.error, { duration: 2500 });
      setLoading(false);
    }

    closeModal();
  }

  return (
    <>
      <Toaster />
      <AnimatePresence>
        <motion.div className="overflow-auto mx-auto">
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
                    students?.map((student, index) => {
                      return (
                        <motion.tr key={index}
                          className="border-t border-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="py-2 px-4 uppercase">{student.enrol_num}</td>
                          <td className="py-2 px-4 capitalize">
                            <p className='text-md font-medium capitalize'>{student.fname} {student.lname}</p>
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
                            <div className="flex items-center gap-x-3">
                              <Link href={`/admin/student/manage-student/${student._id}`} className="rounded-full p-2" title="Edit">
                                <CiEdit className="text-gray-800 dark:text-gray-200" size={24} />
                              </Link>
                              <Button onClick={() => { openDeleteModal(student._id) }} title="Delete" className="rounded-full p-2">
                                <CiTrash size={24} className='text-rose-800 dark:text-rose-500' />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })
                  }
                </tbody>
              </motion.table>
          }
          {/* DELETE MODAL */}
          <Modal isOpen={isDeleteModalOpen}>
            <h2 className="text-lg font-semibold mb-4">Are you sure ?</h2>
            <p>Do you want to delete this student?</p>
            <div className="flex items-center gap-x-4 justify-end">
              <Button
                className="mt-4 px-4 py-2 border-2 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-500 text-gray-700 dark:text-gray-300 rounded-full"
                onClick={closeDeleteModal}
              >
                Cancel
              </Button>
              <Button
                className="mt-4 px-4 py-2 bg-rose-700 text-white rounded-full"
                onClick={deleteStudent}
                disabled={loading ? true : false}
              >
                {loading ? <Spinner /> : "Delete"}
              </Button>
            </div>
          </Modal>

        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default StudentDisplay