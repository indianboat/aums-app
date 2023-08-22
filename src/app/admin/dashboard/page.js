"use client";

import Loading from "../../components/LoadingComponent/Loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminDashboard = () => {

  const { data: session, status } = useSession({
    required:true,
    onUnauthenticated(){
      redirect("/admin")
    }
  });

  if (status === "loading") {
    return <Loading/>
  }

  return (
    <>
      <div className="border">
        Admin Dashboard
      </div>
    </>
  )
}

export default AdminDashboard