"use client";

import Loading from '@/app/components/LoadingComponent/Loading';
import StudentDrawer from '@/app/components/NavbarComponent/StudentDrawer'
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const StudentRegistrationTracking = () => {

  const router = useRouter();

  const months = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [studentInfo, setStudentInfo] = useState(null);

  const { data: session, status} = useSession({
    onUnauthenticated() {
      router.push("/student");
    }
  });

  useEffect(() => {
    async function getStudent(id) {
      const getStud = await fetch(`/api/students/${id}`);
      const data = await getStud.json();
      setStudentInfo(data);
    }

    if (session) {
      getStudent(session?.user?.id);
    }
  }, [session]);

  if(!session){
    redirect("/student");
  }

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <StudentDrawer />
        </aside>
        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className="text-lg mb-4 text-neutral-700 dark:text-neutral-300 font-bold">Course Registration Tracking</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
              <h2 className='uppercase'><strong>Roll No:</strong> {studentInfo?.enrol_num}</h2>
              <h2 className='uppercase'><strong>Name:</strong> {studentInfo?.fname} {studentInfo?.lname}</h2>
              <h2 className='lowercase'><strong className='uppercase'>Email Id:</strong> {studentInfo?.email}</h2>
              <h2 className='uppercase'><strong>Course:</strong> {studentInfo?.course}</h2>
              <h2 className='uppercase'><strong>Semester:</strong> {studentInfo?.currentSemester}</h2>
              <h2 className='uppercase'><strong>Batch:</strong> {months[new Date(studentInfo?.batch).getMonth()]}_{new Date(studentInfo?.batch).getFullYear()}</h2>
            </div>
            <div className="mt-6">
    
                {
                studentInfo?.semesterData[studentInfo?.currentSemester - 1]?.isCourseRegistered == false ? 
                <p className='text-xl border p-2 rounded-md bg-red-50 dark:bg-[#310413] text-rose-500 dark:text-rose-700'>You have not registered yet !</p>

                : 
                studentInfo?.semesterData[studentInfo?.currentSemester - 1]?.isCourseRegistered == true ? 
                <>
                  <p className='text-xl border p-2 rounded-md text-rose-500 dark:text-rose-700'>Registration is in Verification !</p>
                  <div className="overflow-auto mx-auto mt-4">
                  <motion.table className="min-w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <thead>
                      <tr className='bg-gray-50 dark:bg-neutral-800'>
                        <th className="py-3 px-4 text-left uppercase">Subject Code</th>
                        <th className="py-3 px-4 text-left uppercase">Subject Name</th>
                        <th className="py-3 px-4 text-left uppercase">Subject Type</th>
                        <th className="py-3 px-4 text-left uppercase">Credits</th>
                        <th className="py-3 px-4 text-left uppercase">Admin Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        studentInfo?.semesterData[studentInfo?.currentSemester - 1].subjects.map((subject, index)=>{
                          return (
                            <motion.tr key={index} 
                            className="border-t border-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}>
                              <td className="py-2 px-4 uppercase">{subject.subjectCode}</td>
                              <td className="py-2 px-4 uppercase">{subject.subjectName}</td>
                              <td className="py-2 px-4 uppercase">{subject.subjectType}</td>
                              <td className="py-2 px-4 uppercase">{subject.credits}</td>
                              <td className="py-2 text-sm px-4 uppercase bg-[#F5F2E2] text-[#CC9501] dark:bg-[#2D2819] dark:text:[#9B7408] rounded-full text-center">Verifying</td>
                            </motion.tr>
                          )
                        })
                      }
                    </tbody>
                  </motion.table>
                  <p className='text-gray-400 dark:text-gray-300 text-sm mt-2'># These above courses are selected by you.</p>
                  </div>
                </>
                : null}

            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default StudentRegistrationTracking