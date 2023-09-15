"use client";

import Loading from '@/app/components/LoadingComponent/Loading';
import StudentDrawer from '@/app/components/NavbarComponent/StudentDrawer'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const StudentRegistrationTracking = () => {

  const months = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [studentInfo, setStudentInfo] = useState(null);
  const { data: session } = useSession({
    onUnauthenticated() {
      redirect("/student");
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

  if (!session) {
    return <Loading />
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
              <h2 className='uppercase'><strong>Batch:</strong> {months[new Date(studentInfo?.batch).getMonth()]}_{new Date(studentInfo?.batch).getFullYear()}</h2>
            </div>
            <div className="mt-6">
              <h1 className='text-xl border p-2 rounded-md bg-red-50 dark:bg-[#310413] text-rose-500 dark:text-rose-700'>
                {studentInfo?.isCourseRegistered == "No" ? "You have not registered yet !" : studentInfo?.isCourseRegistered == "Yes" ? "You are already Registered !" : studentInfo?.isCourseRegistered == "Pending" ? "Registration is in Verification !" : null}
              </h1>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default StudentRegistrationTracking