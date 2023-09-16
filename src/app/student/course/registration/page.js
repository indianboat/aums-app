"use client"

import Button from '@/app/components/ButtonComponent/Button';
import SubjectCard from '@/app/components/CardComponent/SubjectCard';
import Loading from '@/app/components/LoadingComponent/Loading';
import StudentDrawer from '@/app/components/NavbarComponent/StudentDrawer';
import Spinner from '@/app/components/SpinnerComponent/Spinner';
import Table from '@/app/components/TableComponent/Table';
import Select from '@/app/components/selectComponent/Select';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const StudentCourseRegistration = () => {

  const mm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const { data: session } = useSession({
    onUnauthenticated() {
      redirect("/student");
    }
  });

  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      subjects: [{
        subjectName: "",
        subjectCode: "",
        subjectType: "",
        credits: 0
      }],
      semester: 1
    },
    onSubmit
  });

  const maxSubjects = 6;
  const cardData = [
    { id: 0, subjectName: 'Mathematices', subjectCode: '21MCA364', subjectType: "core", credits: 3 },
    { id: 1, subjectName: 'Physics', subjectCode: '21MCA745', subjectType: "core", credits: 3 },
    { id: 2, subjectName: 'Chemistry', subjectCode: '21MCA128', subjectType: "core", credits: 3 },
    { id: 3, subjectName: 'Computer Science', subjectCode: '21MCA685', subjectType: "core", credits: 3 },
    { id: 4, subjectName: 'English Litrature', subjectCode: '21MCA478', subjectType: "core", credits: 3 },
    { id: 5, subjectName: 'Home Science', subjectCode: '21MCA749', subjectType: "elective", credits: 3 },
    { id: 6, subjectName: 'Physical Education', subjectCode: '21MCA445', subjectType: "elective", credits: 3 },
  ];

  const handleCardToggle = (card, isSelected) => {
    if (isSelected) {
      if (selectedCards.length < maxSubjects) {
        setSelectedCards([...selectedCards, card]);
      }
    } else {
      setSelectedCards(selectedCards.filter((selectedCard) => selectedCard.id !== card.id));
    }
  }

  console.log(selectedCards);

  async function onSubmit(values) {
    console.log(values);

    // setLoading(true);
    // const res = await fetch(`/api/students/${session?.user?.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(values)
    // });

    // if (res.status == 201) {
    //   setLoading(false);
    //   toast.success("Course Registered !");
    // }
    // else {
    //   setLoading(false);
    // }
  }



  if (!session) {
    return <Loading />
  }

  return (
    <>
      <Toaster />
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <StudentDrawer />
        </aside>
        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className="text-lg mb-4 text-neutral-700 dark:text-neutral-300 font-bold">Course Registration for Semester</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3">
              <h2 className='uppercase'><strong>Roll No:</strong> {studentInfo?.enrol_num}</h2>
              <h2 className='uppercase'><strong>Name:</strong> {studentInfo?.fname} {studentInfo?.lname}</h2>
              <h2 className='uppercase'><strong>Course:</strong> {studentInfo?.course}</h2>
              <h2 className='uppercase'><strong>Semester:</strong> {studentInfo?.semester}</h2>
              <h2 className='uppercase'><strong>Batch:</strong> {mm[new Date(studentInfo?.batch).getMonth()]}_{new Date(studentInfo?.batch).getFullYear()} </h2>
            </div>
            <form method="post" className='mt-4' onSubmit={formik.handleSubmit}>
              <div className='flex flex-col gap-y-4'>
                <h2>Select 6 courses</h2>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 border">
                  {cardData.map((card) => (
                    <SubjectCard
                      key={card.id}
                      cardData={card}
                      isSelected={selectedCards.some((selectedCard) => selectedCard.id === card.id)}
                      onToggle={handleCardToggle}
                      disabled={selectedCards.length >= maxSubjects && !selectedCards.includes(card)}
                    />
                  ))}
                </div>
                <p className='text-gray-500 dark:text-gray-300 text-sm mt-1'>Note: Students have to select only 6 subjects including core subjects</p>
              </div>
              <div className="mt-4">
                <Button type='submit' className="bg-primary">{loading ? <Spinner /> : "Register"}</Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default StudentCourseRegistration