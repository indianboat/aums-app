"use client";

import Link from "next/link";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { LuMenu } from "react-icons/lu";
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import AdminDrawer from "./AdminDrawer";
import StudentDrawer from "./StudentDrawer";
import FacultyDrawer from "./FacultyDrawer";
import Drawer from "./Drawer";
import Dropdown from "../DropdownComponent/Dropdown";
import Loading from "../LoadingComponent/Loading";

const Navbar = () => {

  const { data: session, status } = useSession();
  const [isOpen, toggleOpen] = useCycle(false, true);

  const drawerHandler = () => {
    toggleOpen(!isOpen);
  };

  const drawerVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

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
                className="p-[8px] rounded-xl bg-[#F2F2F2] dark:bg-[#16181A] shadow-lg duration-[0.3s] transition-all relative hover:shadow-none hover:translate-y-[1px] lg:hidden md:flex sm:flex flex"
                onClick={drawerHandler}
              >
                <LuMenu size={20} className="text-[#2C3E50] dark:text-white" />
              </button>
              <Link href={"/"} className="text-2xl font-bold">UMS</Link>
            </div>

            {status === 'loading' ? <Loading /> : session ? null : <div className="lg:flex md:flex sm:hidden hidden items-center justify-between gap-6 border">
              <Link href={"/"} className="text-md font-medium">Home</Link>
              <Link href={"/admin"} className="text-md font-medium">Admin</Link>
              <Link href={"/faculty"} className="text-md font-medium">Faculty</Link>
              <Link href={"/student"} className="text-md font-medium">Student</Link>
            </div>}

            <div className="">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
                  fill="#000"
                />
              </svg>
            </div>

            <div className="flex items-center h-full gap-x-2">
              {session && <Dropdown handleSignout={handleSignout} profileLink={!session ? null : session?.user?.role === "admin" ? "/admin/profile" : session?.user?.role === "student" ? "/student/profile" : "/faculty/profile"} userName={!session ? "user_name" : session?.user?.name} />}
            </div>
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
                  <span className="text-lg font-semibold border">UMS</span>
                  <button
                    onClick={() => toggleOpen()}
                    className="rounded-lg p-1 bg-[#EEF2F5] dark:bg-neutral-950 text-[#3F3D56] hover:text-black dark:text-[#EEF2F5]"
                  >
                    <CgClose size={16} />
                  </button>
                </div>
                {/* Checking Session */}
                {
                  session?.user?.role === "admin" ? <AdminDrawer handleLinkClick={handleLinkClick} handleSignout={handleSignout} /> : session?.user?.role === "student" ? <StudentDrawer handleLinkClick={handleLinkClick} handleSignout={handleSignout} /> : session?.user?.role === "faculty" ? <FacultyDrawer handleLinkClick={handleLinkClick} handleSignout={handleSignout} /> : <Drawer handleLinkClick={handleLinkClick} />
                }
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