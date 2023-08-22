"use client";

import Link from "next/link";
import {RxDashboard} from "react-icons/rx";
import {BsFileEarmarkRuled} from "react-icons/bs";
import {IoIosLogOut} from "react-icons/io";
import Collapse from "../CollapseComponent/Collapse";
import Button from "../ButtonComponent/Button";
import {PiUserList} from "react-icons/pi";
import {CiSettings} from "react-icons/ci";

const FacultyDrawer = ({handleLinkClick, handleSignout}) => {

  const resultUploadList = [
    {
      name:"Upload",
      link:"/faculty/result-upload"
    },
    {
      name:"Manage",
      link:"/faculty/result-manage"
    },
  ];

  return (
    <>
      <div className="border h-auto border-red-400 p-3">
        <ul className="border flex flex-col gap-3 w-full">
          <li className="border flex"><Link onClick={handleLinkClick} href="/faculty" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><RxDashboard /> Home</Link></li>
          <li className="border flex">
            <Collapse list={resultUploadList} onClick={handleLinkClick}>
              <BsFileEarmarkRuled /> Result
            </Collapse>
          </li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/student/fees" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><PiUserList/> Profile</Link></li>
          <li className="border flex"><Link onClick={handleLinkClick} href="/student/fees" className="border text-[#696E76] dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-neutral-950 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><CiSettings/> Setting</Link></li>
          <li className="border flex"><Button onClick={handleSignout} className="border text-danger dark:text-danger hover:text-white dark:hover:text-white hover:bg-danger dark:hover:bg-rose-900 flex items-center gap-x-4 w-full px-4 py-2 rounded-lg"><IoIosLogOut /> Logout</Button></li>
        </ul>
      </div>
    </>
  )
}

export default FacultyDrawer