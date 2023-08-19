"use client";

import Button from "../components/ButtonComponent/Button";
import Input from "../components/InputComponent/Input";
import {HiOutlineMail} from "react-icons/hi";
import {CiLock} from "react-icons/ci";
import { useFormik } from "formik";
import toast, {Toaster} from "react-hot-toast";
import Link from "next/link";

const FacultyLogin = () => {


  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit
  });

  async function onSubmit(values){
    // api calling here for login
  }



  return (
    <>
    <Toaster toastOptions={{ duration : 2500}}/>
      <div className="container mx-auto my-8 flex flex-col items-center justify-center p-1">
        <form method="POST" onSubmit={formik.handleSubmit} className="shadow-xl lg:p-12 md:p-10 sm:p-8 p-4 rounded-3xl lg:w-3/6 md:w-4/6 sm:w-full w-full">
          <legend className="mt-2 mb-6 text-gray-800 dark:text-gray-200 text-center font-bold text-3xl">Sign in as Faculty</legend>

          <Input icon={<HiOutlineMail strokeWidth={1} size={20}/>} type="email" className="w-full" label="Faculty Email Id" id="email" name="email" placeholder="Faculty email Id" {...formik.getFieldProps("email")} required />

          <Input minLength={8} icon={<CiLock size={20}/>} type="password" className="w-full" label="Faculty Password" id="password" name="password" placeholder="Faculty Password" {...formik.getFieldProps("password")} required />

          <Button type="submit" className="bg-neutral-950 my-4 w-full shadow-dark-btn">Login</Button>
          <p className="flex w-full text-gray-600 dark:text-gray-400 text-sm justify-center mt-8 gap-x-2">For student login <Link className="text-blue-500 underline" href="/student">Login</Link></p>
        </form>

      </div>
    </>
  )
}

export default FacultyLogin