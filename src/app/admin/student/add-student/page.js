"use client";

import Button from '@/app/components/ButtonComponent/Button';
import Input from '@/app/components/InputComponent/Input'
import Loading from '@/app/components/LoadingComponent/Loading';
import AdminDrawer from '@/app/components/NavbarComponent/AdminDrawer'
import Spinner from '@/app/components/SpinnerComponent/Spinner';
import Select from '@/app/components/selectComponent/Select';
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const AdminAddStudent = () => {

  const router = useRouter();

  const { data: session } = useSession();

  if(session == undefined){
    redirect("/admin", "replace");
  }

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      enrol_num: "",
      mobile: "",
      course: "",
      password: "",
      role: "student"
    },
    onSubmit
  })

  const handleSelect = (selectedOption) => {
    formik.values.course = selectedOption;
  };

  async function onSubmit(values) {
    formik.values.password = `${formik.values.fname}@123`;

    setLoading(true);
    const res = await fetch("/api/students/addstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (res.status === 201 && res.ok) {
      setLoading(false);
      toast.success("Student Added !");
      formik.resetForm();
    }
    else if (!res.ok && res.status === 422) {
      setLoading(false);
      toast.error("Student Already Added !");
    }

    else {
      toast.error(res.error, { duration: 2500 });
      setLoading(false);
    }
  }

  if (status === "loading") {
    <Loading />
  }

  return (
    <>
      <Toaster/>
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <AdminDrawer />
        </aside>

        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className='text-gray-700 dark:text-gray-300 uppercase font-semibold text-lg'>Add Student</h1>
          </div>

          {/* Student TABLE displaying */}
          <form method="post" className="border mt-4 flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
            <div className="grid gap-x-10 gap-y-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
              <div className="">
                <Input type='text' className="capitalize min-w-full" minLength={3} label="First Name" required={true} id="fname" name="fname" {...formik.getFieldProps("fname")} placeholder="First name..." />
              </div>
              <div className="">
                <Input type='text' label="Last Name" className="capitalize min-w-full" id="lname" name="lname" {...formik.getFieldProps("lname")} placeholder="Last name..." />
              </div>
              <div className="">
                <Input type='email' label="Email Id" required={true} className="lowercase min-w-full" id="email" name="email" {...formik.getFieldProps("email")} placeholder="Email address..." />
              </div>
              <div className="">
                <Input type='tel' maxLength={10} label="Mobile Number" required={true} className="min-w-full" id="mobile" name="mobile" {...formik.getFieldProps("mobile")} placeholder="mobile..." />
              </div>
              <div className="">
                <Input type='text' label="Enrolment Number" className="min-w-full" id="enrol_num" name="enrol_num" {...formik.getFieldProps("enrol_num")} placeholder="enrol number..." />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="course">Course</label>
                <Select className="min-w-full" id="course" options={["MCA", "BCA", "BBA", "MBA", "BCOM", "1MCA", "2BCA", "3BBA", "4MBA", "5BCOM"]} onSelect={handleSelect} placeholder="Select your course" />
              </div>
            </div>
            <div className="">
              <Button type="submit" disabled={loading ? true : false} className="bg-primary">{loading ? <Spinner /> : "Submit"}</Button>
            </div>
          </form>
        </section>
      </div>

    </>
  )
}

export default AdminAddStudent