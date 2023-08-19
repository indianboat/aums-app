"use client";

import Link from "next/link";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import ThemeSwitch from "../ThemeProvider/ThemeSwitch";
import { CgClose } from "react-icons/cg";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const drawerVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="sticky z-50 bg-white dark:bg-[#1E2023] top-0 border w-full py-4 shadow px-4"
      >
        <div className="2xl:container mx-auto">
          <div className="border flex items-center justify-between">
            <button
              className="border p-[8px] rounded-xl bg-[#F2F2F2] dark:bg-[#16181A] shadow-lg duration-[0.3s] transition-all relative hover:shadow-none hover:translate-y-[1px]"
              onClick={() => toggleOpen()}
            >
              <LuMenu size={20} className="text-[#2C3E50] dark:text-white" />
            </button>
            <Link href={"/"} className="text-2xl font-bold">AUMS</Link>

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
                className="fixed bg-white z-50 dark:bg-[#18191C] border border-red-700 shadow-red-200 h-screen lg:w-64 md:w-60 sm:w-52 w-48 inset-0"
              >
                <div className="border flex justify-end p-3">
                  <button
                    onClick={() => toggleOpen()}
                    className="border rounded-lg p-1 bg-[#EEF2F5] dark:bg-[#1E1E1E] text-[#3F3D56] hover:text-black dark:text-[#EEF2F5]"
                  >
                    <CgClose size={16} />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {/* OVERLAY */}
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
