"use client"

import Button from '@/app/components/ButtonComponent/Button';
import SubjectCard from '@/app/components/CardComponent/SubjectCard';
import Loading from '@/app/components/LoadingComponent/Loading';
import StudentDrawer from '@/app/components/NavbarComponent/StudentDrawer';
import Spinner from '@/app/components/SpinnerComponent/Spinner';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const StudentCourseRegistration = () => {

  const mm = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const { data: session } = useSession({
    onUnauthenticated() {
      redirect("/student");
    }
  });

  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

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

  const subjects = [
    { id: 1, subjectName: 'Mathematices', subjectCode: '21MCA364', subjectType: "elective", credits: 3 },
    { id: 2, subjectName: 'Physics', subjectCode: '21MCA745', subjectType: "core", credits: 3 },
    { id: 3, subjectName: 'Chemistry', subjectCode: '21MCA128', subjectType: "core", credits: 3 },
    { id: 4, subjectName: 'Computer Science', subjectCode: '21MCA685', subjectType: "elective", credits: 3 },
    { id: 5, subjectName: 'English Litrature', subjectCode: '21MCA478', subjectType: "core", credits: 3 },
    { id: 6, subjectName: 'Home Science', subjectCode: '21MCA749', subjectType: "elective", credits: 3 },
    { id: 7, subjectName: 'Physical Education', subjectCode: '21MCA445', subjectType: "elective", credits: 3 },
    { id: 8, subjectName: 'Biology', subjectCode: '21MCA7589', subjectType: "elective", credits: 3 },
  ];

  const coreSubjects = subjects.filter((subject) => subject.subjectType === 'core');
  const electiveSubjects = subjects.filter((subject) => subject.subjectType === 'elective');

  const [selectedSubjects, setSelectedSubjects] = useState(coreSubjects); // Initialize with 5 core subjects
  const [selectedElectives, setSelectedElectives] = useState([]);
  const maxElectiveSelection = 2;

  const toggleSubject = (subject) => {
    if (subject.subjectType === 'core') {
      // Core subjects should always remain selected
      return;
    }

    const isAlreadySelected = selectedElectives.some((elec) => elec.id === subject.id);

    if (isAlreadySelected) {
      // Deselect the elective if it's already selected
      setSelectedElectives((prev) => prev.filter((elec) => elec.id !== subject.id));
    } else if (selectedElectives.length < maxElectiveSelection) {
      // Select the elective if less than 2 electives are selected
      setSelectedElectives((prev) => [...prev, subject]);
    } else if (selectedElectives.length === maxElectiveSelection) {
      // Deselect one of the selected electives and select the new one
      setSelectedElectives((prev) => [...prev.slice(1), subject]);
    }
  };

  // console.log(selectedSubjects);
  // console.log(selectedElectives);

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
  const resetElectives = ()=>{
    setSelectedElectives([]);
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
                <h2 className='px-3 py-2 rounded-lg shadow text-lg font-semibold'>Core Subjects</h2>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 border">
                  {coreSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      isSelected={
                        selectedSubjects.some((selectedSubject) => selectedSubject.id === subject.id) ||
                        selectedElectives.some((elec) => elec.id === subject.id)
                      }
                      onSelect={() => toggleSubject(subject)}
                    />
                  ))}
                </div>
                <p className='text-gray-500 dark:text-gray-300 text-sm mt-1'>Note: These are the core subjects that is mandatory.</p>

                <h2 className='px-3 py-2 rounded-lg shadow text-lg font-semibold'>Select any 2 Electives</h2>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 border">
                  {electiveSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      isSelected={
                        selectedSubjects.some((selectedSubject) => selectedSubject.id === subject.id) ||
                        selectedElectives.some((elec) => elec.id === subject.id)
                      }
                      onSelect={() => toggleSubject(subject)}
                    />
                  ))}
                </div>
                <p className='text-gray-500 dark:text-gray-300 text-sm mt-1'>Note: Only 2 electives must be selected.</p>
              </div>
              <div className="mt-4 flex gap-4">
                <Button type='reset' onClick={resetElectives} className="text-primary border-2 border-blue-500">Reset</Button>
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