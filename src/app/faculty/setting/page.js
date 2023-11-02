import FacultyDrawer from '@/app/components/NavbarComponent/FacultyDrawer'
import React from 'react'

const FacultySettings = () => {
  return (
    <>
      <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <FacultyDrawer />
        </aside>
        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          <div className="border">
            <h1 className="text-md text-neutral-700 dark:text-neutral-300 font-bold">Settings</h1>
          </div>
        </section>
      </div>
    </>
  )
}

export default FacultySettings