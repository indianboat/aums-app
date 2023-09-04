import Input from '@/app/components/InputComponent/Input';
import getStudents from '@/app/utils/getStudents';
import StudentDisplay from '@/app/components/AdminComponents/StudentDisplay';
import AdminDrawer from '@/app/components/NavbarComponent/AdminDrawer';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const AdminManageStudent = async () => {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/admin");
  }

  const students = await getStudents();

  return (
    <>
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <AdminDrawer />
        </aside>

        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className='text-gray-700 dark:text-gray-300 uppercase font-semibold text-lg'>Manage Students</h1>
          </div>
          <div className="border mt-4 flex items-center">
            <Input type='text' className="lg:w-96 md:w-80 sm:w-full w-full" placeholder="search student..." label="Enter student name or id" />
          </div>

          {/* Student TABLE displaying */}
          <div className="mt-6">
            <StudentDisplay students={students} />
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminManageStudent