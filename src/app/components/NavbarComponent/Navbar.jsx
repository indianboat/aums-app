"use client";

import Link from "next/link";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import ThemeSwitch from "../ThemeProvider/ThemeSwitch";
import { CgClose } from "react-icons/cg";
import { LuMenu } from "react-icons/lu";
import {RxDashboard} from "react-icons/rx";
import {PiStudent} from "react-icons/pi";
import {LiaChalkboardTeacherSolid} from "react-icons/lia";
import {TbPlaylistAdd} from "react-icons/tb";
import {IoIosLogOut} from "react-icons/io";
import Collapse from "../CollapseComponent/Collapse";
import Button from "../ButtonComponent/Button";
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const drawerHandler = () => {
    toggleOpen(!isOpen);
  };

  const drawerVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

  const studentList =[
    {
      name:"Add New",
      link:`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_URL}/admin/student/add-student`
    },
    {
      name:"Manage",
      link:`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_URL}/admin/student/manage-student`
    }
  ];

  const facultyList =[
    {
      name:"Add New",
      link:`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_URL}/admin/faculty/add-faculty`
    },
    {
      name:"Manage",
      link:`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PROD_URL}/admin/faculty/manage-faculty`
    }
  ];

  const courseList =[
    {
      name:"Add New",
      link:"add-course"
    },
    {
      name:"Manage",
      link:"manage-course"
    }
  ];


  const handleLinkClick = () => {
    if (isOpen) {
      drawerHandler();
    }
  };

  async function handleSignout() {
    signOut();
  }

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="sticky z-50 bg-white dark:bg-[#1E2023] top-0 border w-full py-4 shadow px-4"
      >
        <div className="2xl:container mx-auto">
          <div className="border flex items-center justify-between">
            <div className="flex items-center justify-between gap-6 border">
              <button
                className="p-[8px] rounded-xl bg-[#F2F2F2] dark:bg-[#16181A] shadow-lg duration-[0.3s] transition-all relative hover:shadow-none hover:translate-y-[1px]"
                onClick={drawerHandler}
              >
                <LuMenu size={20} className="text-[#2C3E50] dark:text-white" />
              </button>
              <Link href={"/"} className="text-2xl font-bold">UMS</Link>
            </div>
            <div className="flex items-center justify-between gap-6 border">
            <Link href={"/"} className="text-md font-medium">Home</Link>
            <Link href={"/admin"} className="text-md font-medium">Admin</Link>
            <Link href={"/faculty"} className="text-md font-medium">Faculty</Link>
            <Link href={"/student"} className="text-md font-medium">Student</Link>
            </div>

            <ThemeSwitch />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                className="fixed bg-white z-50 dark:bg-[#18191C] overflow-auto border border-red-700 shadow-red-200 h-screen lg:w-64 md:w-60 sm:w-52 w-48 inset-0"
              >
                <div className="border flex justify-between items-center p-3">
                <span className="text-lg font-medium">UMS Admin</span>
                  <button
                    onClick={() => toggleOpen()}
                    className="rounded-lg p-1 bg-[#EEF2F5] dark:bg-neutral-950 text-[#3F3D56] hover:text-black dark:text-[#EEF2F5]"
                  >
                    <CgClose size={16} />
                  </button>
                </div>
                <div className="border h-auto border-red-400 p-3">
                <ul className="border flex flex-col gap-3 w-full">
                  <li className="border flex"><Link onClick={handleLinkClick} href="/admin" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><RxDashboard/> Dashboard</Link></li>
                  <li className="border flex">
                    <Collapse list={studentList} onClick={handleLinkClick}>
                      <PiStudent/> Student
                    </Collapse>
                  </li>

                  <li className="border flex">
                    <Collapse list={facultyList} onClick={handleLinkClick}>
                      <LiaChalkboardTeacherSolid/> Faculty
                    </Collapse>
                  </li>
                  <li className="border flex">
                    <Collapse list={courseList} onClick={handleLinkClick}>
                      <TbPlaylistAdd/> Course
                    </Collapse>
                  </li>
                  <li className="border flex"><Button onClick={handleSignout} className="border text-[#696E76] dark:text-neutral-300 hover:text-white dark:hover:text-white hover:bg-danger dark:hover:bg-rose-900 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><IoIosLogOut /> Logout</Button></li>
                </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Drawer OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black backdrop-blur opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen()}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;