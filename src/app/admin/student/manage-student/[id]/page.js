import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StudentUpdate from "@/app/components/AdminComponents/StudentUpdate";

import AdminDrawer from "@/app/components/NavbarComponent/AdminDrawer";
import getStudentById from "@/app/utils/getStudentById";
import { getServerSession } from "next-auth";

const AdminEditStudent = async ({ params }) => {


  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/admin");
  }

  const student = await getStudentById(params.id);

  return (
    <>
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <AdminDrawer />
        </aside>
        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <h1 className='text-gray-700 dark:text-gray-300 font-semibold text-lg mb-4'>Student DB Id: {params.id}</h1>
          <StudentUpdate student={student}/>
        </section>
      </div>
    </>
  )
}

export default AdminEditStudent

// verify semester registration