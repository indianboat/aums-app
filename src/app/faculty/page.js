"use client";

import Button from "../components/ButtonComponent/Button";
import Input from "../components/InputComponent/Input";
import {HiOutlineMail} from "react-icons/hi";
import {CiLock} from "react-icons/ci";
import { useFormik } from "formik";
import toast, {Toaster} from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Loading from "../components/LoadingComponent/Loading";
import { signIn, useSession } from "next-auth/react";
import Spinner from "../components/SpinnerComponent/Spinner";

const FacultyLogin = () => {

  const {push} = useRouter();
  const [ loading, setLoading ] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      push('/faculty/dashboard'); // Redirect after rendering
    }
  }, [status, push]);

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      role:"faculty"
    },
    onSubmit
  });

  async function onSubmit(values){ // api not working ------->>
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      role:values.role,
      callbackUrl: "/faculty/dashboard"
    });

    if (res.error == null) {
      setLoading(false);
      toast.success("Login success, redirecting...");
      redirect("/faculty/dashboard");
    }

    else {
      toast.error(res.error, { duration: 2500 });
      setLoading(false);
    }
  }

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
    <Toaster toastOptions={{ duration : 2500}}/>
      <div className="container mx-auto my-8 flex flex-col items-center justify-center p-1">
        <form method="POST" onSubmit={formik.handleSubmit} className="shadow-xl lg:p-12 md:p-10 sm:p-8 p-4 rounded-3xl lg:w-3/6 md:w-4/6 sm:w-full w-full">
          <legend className="mt-2 mb-6 text-gray-800 dark:text-gray-200 text-center font-bold text-3xl">Sign in as Faculty</legend>

          <Input icon={<HiOutlineMail strokeWidth={1} size={20}/>} type="email" className="w-full mb-4" label="Faculty Email Id" id="email" name="email" placeholder="Faculty email Id" {...formik.getFieldProps("email")} required />

          <Input minLength={8} icon={<CiLock size={20}/>} type="password" className="w-full mb-4" label="Faculty Password" id="password" name="password" placeholder="Faculty Password" {...formik.getFieldProps("password")} required />

          <Button type="submit" disabled={loading ? true : false} className="bg-neutral-950 my-8 w-full disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-x-2 shadow-dark-btn">{loading ? <Spinner /> : "Login"}</Button>
          <p className="flex w-full text-gray-600 dark:text-gray-400 text-sm justify-center mt-8 gap-x-2">For student login <Link className="text-blue-500 underline" href="/student">Login</Link></p>
        </form>

      </div>
    </>
  )
}

export default FacultyLogin