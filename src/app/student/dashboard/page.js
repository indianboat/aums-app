"use client";

import Loading from "@/app/components/LoadingComponent/Loading";
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
      <div className="border container my-8 p-4 flex justify-center mx-auto">
        student dashboard
      </div>
    </>
  )
}

export default StudentDashboard