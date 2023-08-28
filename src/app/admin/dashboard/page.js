"use client";

import { useSession } from "next-auth/react";
import Loading from "../../components/LoadingComponent/Loading";
import { redirect } from "next/navigation";

const AdminDashboard = () => {

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin")
    }
  });

  if (status === "loading") {
    return <Loading />
  }

  return (
    <>
      <div className="border">
        <h1 className="text-md mb-4 text-neutral-700 dark:text-neutral-300 font-bold">Overview</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="border p-4 rounded-xl shadow-md">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm uppercase text-gray-700  dark:text-gray-300 font-medium">Students registered</h1>
              <span className="w-fit border-orange-500 text-2xl border-b-4 text-gray-800 dark:text-gray-300  font-extrabold">2569</span>
            </div>
          </div>
          <div className="border p-4 rounded-xl shadow-md">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm uppercase text-gray-700 dark:text-gray-300  font-medium">Courses registered</h1>
              <span className="w-fit border-green-500 text-2xl border-b-4 text-gray-800 dark:text-gray-300  font-extrabold">12</span>
            </div>
          </div>
          <div className="border p-4 rounded-xl shadow-md">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm uppercase text-gray-700 dark:text-gray-300  font-medium">faculty registered</h1>
              <span className="w-fit border-blue-500 text-2xl border-b-4 text-gray-800 dark:text-gray-300  font-extrabold">102</span>
            </div>
          </div>
          <div className="border p-4 rounded-xl shadow-md">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm uppercase text-gray-700 dark:text-gray-300  font-medium">student placed</h1>
              <span className="w-fit border-yellow-500 text-2xl border-b-4 text-gray-800 dark:text-gray-300  font-extrabold">2451</span>
            </div>
          </div>
        </div>
        <h1 className="text-md mt-8 text-neutral-700 dark:text-neutral-300 font-bold">Tickets</h1>
        <div className="border p-4">
          No ticket here !
        </div>
      </div>
    </>
  )
}

export default AdminDashboard