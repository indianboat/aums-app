"use client";

import React from 'react'
import AdminDrawer from '../components/NavbarComponent/AdminDrawer'
import { signOut } from 'next-auth/react';
import AdminLogin from './page';
import { useSession } from 'next-auth/react';

const AdminLayout = ({ children }) => {

  const { data : session } = useSession();
  async function handleSignout() { signOut() }

  return (
    <>
      {
        session ? <div className="2xl:container mx-auto flex flex-row w-full h-auto border">
        <aside className="lg:w-64 md:w-60 sm:w-52 w-48 z-40 lg:flex md:hidden sm:hidden hidden">
          <AdminDrawer handleSignout={handleSignout} />
        </aside>
        <section className="2xl:container mx-auto border border-rose-800 w-full p-6 rounded-2xl shadow-lg">
          {children}
        </section>
      </div> : <AdminLogin/>
      }
    </>
  )
}

export default AdminLayout