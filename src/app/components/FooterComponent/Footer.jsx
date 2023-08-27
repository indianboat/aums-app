import Link from 'next/link';
import React from 'react';
import {BsGithub} from "react-icons/bs";

const Footer = () => {
  return (
  <>
    <footer className='footer w-full bg-slate-300 dark:bg-neutral-950 2xl:container mx-auto py-4 relative'>
      <div className="flex justify-center items-center flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between gap-x-4">
        <p>&copy; copyright 2023</p>
        <Link href="https://github.com/indianboat/aums-app" className='flex flex-row gap-x-2 items-center justify-between' target="_blank"><BsGithub size={18}/> <span className='text-gray-600 text-sm dark:text-gray-300'>v0.1.0</span></Link>
        </div>
        <p>University Management System</p>
      </div>
    </footer>
  </>
  )
}

export default Footer