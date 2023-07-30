"use client";

import Link from "next/link";
import ToggleButton from "./ToggleButton";
import { motion, useCycle, AnimatePresence } from "framer-motion";

const NavbarComponent = () => {
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
        className="sticky z-50 bg-white top-0 border w-full py-4 shadow px-4"
      >
        <div className="2xl:container mx-auto">
          <div className="border flex items-center justify-between">
            <ToggleButton toggle={() => toggleOpen()} />
            <Link href={"/"}>AUMS</Link>
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
                className="fixed bg-white border border-red-700 shadow-red-200 h-screen lg:w-64 md:w-60 sm:w-52 w-48 inset-0"
              >
                {/* <div className="">
            <ul>
              <li><Link href={"/"}>Home</Link></li>
              <li><Link href={"/"}>Home</Link></li>
              <li><Link href={"/"}>Home</Link></li>
              <li><Link href={"/"}>Home</Link></li>
              <li><Link href={"/"}>Home</Link></li>
            </ul>
          </div> */}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {/* OVERLAY */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen()}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarComponent;
