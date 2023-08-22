"use client";

import Link from "next/link";
import {RxDashboard} from "react-icons/rx";
import {PiStudent} from "react-icons/pi";
import {LiaChalkboardTeacherSolid} from "react-icons/lia";
import {BsFileEarmarkRuled, BsCreditCard2Front} from "react-icons/bs";
import {TbPlaylistAdd} from "react-icons/tb";
import {IoIosLogOut} from "react-icons/io";
import Collapse from "../CollapseComponent/Collapse";
import Button from "../ButtonComponent/Button";

const AdminDrawer = ({handleLinkClick, handleSignout}) => {

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



  return (
    <>
      <div className="border h-auto border-red-400 p-3">
        <ul className="border flex flex-col gap-3 w-full">
          <li className="border flex"><Link onClick={handleLinkClick} href="/admin" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><RxDashboard /> Dashboard</Link></li>
          <li className="border flex">
            <Collapse list={studentList} onClick={handleLinkClick}>
              <PiStudent /> Student
            </Collapse>
          </li>

          <li className="border flex">
            <Collapse list={facultyList} onClick={handleLinkClick}>
              <LiaChalkboardTeacherSolid /> Faculty
            </Collapse>
          </li>
          <li className="border flex">
            <Collapse list={courseList} onClick={handleLinkClick}>
              <TbPlaylistAdd /> Course
            </Collapse>
          </li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/admin/result" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><BsFileEarmarkRuled /> Result</Link></li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/admin/fees" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><BsCreditCard2Front /> Fees</Link></li>
          <li className="border flex"><Button onClick={handleSignout} className="border text-[#696E76] dark:text-neutral-300 hover:text-white dark:hover:text-white hover:bg-danger dark:hover:bg-rose-900 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><IoIosLogOut /> Logout</Button></li>
        </ul>
      </div>
    </>
  )
}

export default AdminDrawer;