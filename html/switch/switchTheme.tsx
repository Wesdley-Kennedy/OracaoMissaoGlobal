'use client'

import { customizeSystem } from "../../store/customizeSystem";
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from "lucide-react";


export default function LoginSwitchTheme() {
  const { theme, setTheme } = customizeSystem();

  // Animação simples e elegante
  const iconVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.button
      onClick={() => setTheme(!theme)}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-10 h-10 flex items-center justify-center
        rounded-full transition-colors duration-300 cursor-pointer
        ${theme 
          ? "bg-gray-100 hover:bg-gray-200" 
          : "bg-slate-800  hover:bg-slate-700"}
        shadow-sm
      `}
      aria-label={theme ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme ? (
          <motion.div
            key="moon"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={iconVariants}
            transition={{ duration: 0.2 }}
            className="text-white dark:text-black"
          >
            <Moon size={18} strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={iconVariants}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} strokeWidth={2} className="text-white" />
          </motion.div>
        )}

    
      </AnimatePresence>
    </motion.button>
  );
}