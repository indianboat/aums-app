"use client";

import Link from "next/link";
import ToggleButton from "./ToggleButton";
import { motion, useCycle } from "framer-motion";

const NavbarComponent = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="sticky z-50 bg-white top-0 border w-full py-4 shadow px-4"
      >
        <div className="border flex items-center justify-between">
          <Link href={"/"}>AUMS</Link>
          <button onClick={() => toggleOpen()} className="border m-0 p-0 flex items-center justify-center">
            <ToggleButton />
          </button>
        </div>
      </motion.nav>

      {/* OVERLAY */}
      {isOpen && <motion.div
        className="fixed inset-0 bg-black backdrop-blur opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        onClick={() => toggleOpen()}
      />}
    </>
  );
};

export default NavbarComponent;
