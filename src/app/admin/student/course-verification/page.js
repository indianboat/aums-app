"use client";

import Button from '@/app/components/ButtonComponent/Button';
import AdminDrawer from '@/app/components/NavbarComponent/AdminDrawer'
import Spinner from '@/app/components/SpinnerComponent/Spinner';
import SearchSelect from '@/app/components/selectComponent/SearchSelect';
import Select from '@/app/components/selectComponent/Select';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AdminStudentCourseVerification = () => {

  const { data: session } = useSession();
  if(session == undefined){
    redirect("/admin", "replace");
  }

  const [allStudents, setAllStudents] = useState([]);
  const [displayStudents, setDisplayStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatchOption, setSelectedBatchOption] = useState("");

  const formik = useFormik({
    initialValues: {
      course: "",
      batch: ""
    },
    onSubmit
  });

  const handleCourse = (selectedOption) => {
    formik.values.course = selectedOption;
    if (selectedOption === "MCA") {
      setBatchOptions(["2021-23", "2022-24", "2023-25"]);
    }
    else if (selectedOption === "BCA") {
      setBatchOptions(["2021-24", "2022-25", "2023-26"]);
    }

    if (formik.values.course === "MCA") {
      handleReset();
    }
    else if (formik.values.course === "BCA") {
      handleReset();
    }
  }

  const handleBatch = (selectedOption) => {
    setSelectedBatchOption(selectedOption);
    formik.values.batch = selectedOption;
  }

  const handleReset = () => {
    formik.values.batch = "";
    setSelectedBatchOption("");
  }

  async function onSubmit(values) {
    setLoading(true);
    setDisplayStudents([]);

    let url = '';

    if (values.course === "" && values.batch === "") {
      url = `/api/students`;
    }
    else if (values.course !== "" && values.batch === "") {
      url = `/api/students?course=${values.course}`;
    }
    else if (values.course === "" && values.batch !== "") {
      url = `/api/students?batch=${values.batch}`;
    }
    else if (values.course !== "" && values.batch !== "") {
      url = `/api/students?course=${values.course}&batch=${values.batch}`;
    }
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    setLoading(false);

    if (data.length <= 0) {
      setMsg("No data found !");
    }
    else {
      setAllStudents(data);
      setMsg("");
    }
  };


  const handleVerification = async (id, semData) => {
    // console.log(id);
    // console.log(semesterData);
    // console.log(semesterData.semester);

    const newSemesterData = {...semData, semesterStatus: "on-going"};
    // console.log(newSemesterData);

    const res = await fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({semesterData:newSemesterData})
    });

    console.log(res);

  }

  return (
    <>
      <Toaster />
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <AdminDrawer />
        </aside>

        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className='text-gray-700 dark:text-gray-300 uppercase font-semibold text-lg'>Course Verification</h1>
          </div>
          <div className="flex border">
            <form method='GET' onSubmit={formik.handleSubmit}>
              <div className='flex flex-row gap-4'>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor='course'>Select Degree</label>
                  <Select placeholder="Select degree" onSelect={handleCourse} options={["MCA", "BCA"]} id="course" name="course" {...formik.getFieldProps("course")} />
                </div>

                {/* <div className="flex flex-col gap-y-1">
                  <label htmlFor='course'>Select Batch</label>
                  <Select placeholder="Select batch" onSelect={handleBatch} options={batchOptions} id="batch" name="batch" {...formik.getFieldProps("batch")} />
                </div>  */}

                <div className="flex flex-col gap-y-1">
                  <label htmlFor='course'>Select Batch</label>
                  <SearchSelect options={batchOptions} onSelect={handleBatch} value={selectedBatchOption} placeholder="Select batch" name="batch" {...formik.getFieldProps("batch")} />
                </div>
              </div>

              <div className="mt-4">
                <Button type='submit' className="bg-primary">{loading ? <Spinner /> : "Search"}</Button>
                <Button type='reset' onClick={() => handleReset()} className="border">Reset</Button>
              </div>
            </form>
          </div>

          <div className="border mt-6 overflow-auto">
            {
              allStudents.length > 0 ?
                <>
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-neutral-800">
                        <th className='py-3 px-4 text-left uppercase'>student id</th>
                        <th className='py-3 px-4 text-left uppercase'>student name</th>
                        <th className='py-3 px-4 text-left uppercase'>student email</th>
                        <th className='py-3 px-4 text-left uppercase'>course</th>
                        <th className='py-3 px-4 text-left uppercase'>current Semester</th>
                        <th className='py-3 px-4 text-left uppercase'>Fees Paid</th>
                        <th className='py-3 px-4 text-left uppercase'>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        allStudents.map((student, index) => {
                          return (
                            <tr key={index} className='border-t border-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition'>
                              <td className='py-2 px-4 capitalize'>{student.enrol_num}</td>
                              <td className='py-2 px-4 capitalize'>{student.fname} {student.lname}</td>
                              <td className='py-2 px-4 lowercase'>{student.email}</td>
                              <td className='py-2 px-4 uppercase'>{student.course}</td>
                              <td className='py-2 px-4 uppercase'>{student.currentSemester}</td>
                              <td className='py-2 px-4 capitalize'>No</td>
                              <td className='py-2 px-4 capitalize'>
                                {
                                  student.semesterData.length <= 0 ? <span key={index} className='bg-[#ffc2c2] text-[#9b2f2f] dark:text-[#e69c9c] dark:bg-[#6d2f2f] px-4 py-2 rounded-2xl flex justify-center items-center cursor-not-allowed select-none'>Not Registered</span> :
                                    student.semesterData.map((sem, ind) => {
                                      if (sem.semesterStatus === "verifying") { // on-going || verifying || done || not-registered
                                        return (<Button key={ind} onClick={() => { handleVerification(student._id, sem) }} className="bg-[#d1d6ff] text-[#4950b3] dark:text-[#a2a7f3] dark:bg-[#2c3b7c]">Verify</Button>)
                                      }
                                      else if (sem.semesterStatus === "on-going") {
                                        return <span key={ind} className='bg-[#F5F2E2] text-[#CC9500] dark:text-[#CC930C] dark:bg-[#2D2819] px-4 py-2 rounded-2xl flex justify-center items-center'>On-going</span>
                                      }
                                      else if (sem.semesterStatus === "done") {
                                        return <span key={ind} className='bg-[#6ee488] text-[#15411c] dark:text-[#4aad73] dark:bg-[#19442b] px-4 py-2 rounded-2xl flex justify-center items-center'>done</span>
                                      }
                                      else if (sem.semesterStatus === "not-registered") {
                                        return <span key={ind} className='bg-[#F5F2E2] text-[#CC9500] dark:text-[#CC930C] dark:bg-[#2D2819] px-4 py-2 rounded-2xl flex justify-center items-center'>Not Registered</span>
                                      }
                                    })
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </> : <p>{msg}</p>
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminStudentCourseVerification