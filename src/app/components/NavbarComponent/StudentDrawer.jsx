"use client";

import Link from "next/link";
import {RxDashboard} from "react-icons/rx";
import {BsFileEarmarkRuled, BsCreditCard2Front} from "react-icons/bs";
import {TbPlaylistAdd} from "react-icons/tb";
import {IoIosLogOut} from "react-icons/io";
import {PiUserList} from "react-icons/pi";
import {CiSettings} from "react-icons/ci";

import Collapse from "../CollapseComponent/Collapse";
import Button from "../ButtonComponent/Button";

const StudentDrawer = ({handleLinkClick, handleSignout}) => {

  const resultList = [
    {
      name:"Internal Result",
      link:"/student/internal-result"
    },
    {
      name:"External Result",
      link:"/student/external-result"
    },
    {
      name:"All Semester Result",
      link:"/student/all-semester-result"
    }
  ];

  const courseList = [
    {
      name:"Registration",
      link:"/student/course/registration"
    },
    {
      name:"Tracking",
      link:"/student/course/registration-tracking"
    },
  ]


  return (
    <>
      <div className="border h-auto border-red-400 p-3">
        <ul className="border flex flex-col gap-3 w-full">
          <li className="border flex"><Link onClick={handleLinkClick} href="/student" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><RxDashboard /> Home</Link></li>
          <li className="border flex">
            <Collapse list={resultList} onClick={handleLinkClick}>
              <BsFileEarmarkRuled /> Result
            </Collapse>
          </li>
          <li className="border flex">
            <Collapse list={courseList} onClick={handleLinkClick}>
              <TbPlaylistAdd /> Course
            </Collapse>
          </li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/student/fees-payment" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><BsCreditCard2Front /> Fees payment</Link></li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/student/profile" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><PiUserList/> Profile</Link></li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/student/setting" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><CiSettings/> Setting</Link></li>
          <li className="border flex"><Button onClick={handleSignout} className="border text-danger dark:text-danger hover:text-white dark:hover:text-white hover:bg-danger dark:hover:bg-rose-900 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><IoIosLogOut /> Logout</Button></li>
        </ul>
      </div>
    </>
  )
}

export default StudentDrawer