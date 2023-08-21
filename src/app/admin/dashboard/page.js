"use client";

import Loading from "../../components/LoadingComponent/Loading";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

  // const {push} = useRouter();
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