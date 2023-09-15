"use client";

import Loading from "@/app/components/LoadingComponent/Loading";
import StudentDrawer from "@/app/components/NavbarComponent/StudentDrawer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const StudentDashboard = () => {

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/student");
    }
  });


  if (status === "loading") {
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
            <h1 className="text-md text-neutral-700 dark:text-neutral-300 font-bold">Welcome student</h1>
          </div>
        </section>
      </div>
    </>
  )
}

export default StudentDashboard