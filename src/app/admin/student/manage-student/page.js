import Input from '@/app/components/InputComponent/Input';
// import getStudents from '@/app/utils/getStudents';
// import StudentDisplay from '@/app/components/AdminComponents/StudentDisplay';

const AdminManageStudent = () => {

  // const students = await getStudents();

  return (
    <>
      <div className="border">
        <h1 className='text-gray-700 dark:text-gray-300 uppercase font-semibold text-lg'>Manage Students</h1>
      </div>
      <div className="border mt-4 flex items-center">
        <Input type='text' className="lg:w-96 md:w-80 sm:w-full w-full" placeholder="search students..." label="Enter student name" />
      </div>

      {/* Student TABLE displaying */}
      <div className="mt-6">
        {/* <StudentDisplay students={students}/> */}
      </div>
    </>
  )
}

export default AdminManageStudent