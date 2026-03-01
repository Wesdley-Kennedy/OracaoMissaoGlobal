"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// Store
import { useLogin } from "@/store/useLogin";
import { customizeSystem } from "@/store/customizeSystem";

// Hooks
import {
  backgroundShapes,
  containerVariants,
  itemVariants,
  shapeVariants,
} from "@/store/animations/variantes";

// Components
import LoginSwitchTheme from "@/html/switch/switchTheme";

// Icons
import { FaUser, FaLock } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { RiLoginCircleLine } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const { login: loginStore, is_auth } = useLogin();

  const theme = customizeSystem();

  const [form, setForm] = useState({ login: "", senha: "" });

  // Refs para navegação entre inputs
  const inputRef = {
    login: useRef<HTMLInputElement>(null),
    senha: useRef<HTMLInputElement>(null),
    submit: useRef<HTMLButtonElement>(null),
  };

  const formRef = useRef<HTMLFormElement>(null);

  // Função de login
  const handleLogin = async () => {
    if (form.login.length <= 3 || form.senha.length <= 3) return;

    await loginStore(form.login, form.senha);

    if (useLogin.getState().is_auth) {
      router.push("/dashboard");
    }
  };

  // Password visibility state
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Field focus states
  const [loginFocused, setLoginFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Progresso do form com Enter
  const formProgress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (form.login.length > 3 && form.senha.length > 3) {
      handleLogin();
      return;
    }

    if (form.login.length > 3) {
      inputRef.senha.current?.focus();
      return;
    }

    inputRef.login.current?.focus();
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundShapes.map((shape: any, i: any) => (
          <motion.div
            key={i}
            custom={i}
            initial="initial"
            animate="animate"
            variants={shapeVariants}
            className="absolute rounded-full bg-black dark:bg-white filter blur-3xl"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              opacity: shape.opacity,
            }}
          />
        ))}

        {/* Overlay pattern */}
        <div
          className="absolute inset-0 bg-repeat opacity-5 dark:opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="absolute top-4 right-4 z-50">
          <LoginSwitchTheme />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-95 dark:bg-opacity-90"
        >
          <div className="bg-black dark:bg-white h-2 w-full"></div>

          <form
            className="p-8"
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Title */}
              <motion.div
                variants={itemVariants}
                className="text-center select-none"
              >
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Bem-vindo
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Entre com suas credenciais para acessar
                </p>
              </motion.div>

              {/* Inputs */}
              <div className="space-y-6">
                {/* Login */}
                <motion.div variants={itemVariants}>
                  <div
                    ref={inputRef.login}
                    className={`relative border dark:border-gray-700 rounded-lg  duration-300 ${
                      loginFocused || form.login.length > 0
                        ? "border-[var(--secundaria)] dark:border-[var(--secundaria)] shadow-sm"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`absolute  duration-300 ${
                        loginFocused || form.login.length > 0
                          ? "text-xs text-[var(--secundaria)] dark:text-[var(--secundaria)] translate-y-[-0.6rem] translate-x-[0.5rem] bg-white dark:bg-gray-800 px-1"
                          : "text-gray-500 dark:text-white text-sm translate-y-[0.7rem] translate-x-[2.5rem]"
                      }`}
                    >
                      Login
                    </label>
                    <div className="flex items-center">
                      <div className="pl-4 py-3 text-gray-500 dark:text-white">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        ref={inputRef.login}
                        value={form.login}
                        onFocus={() => setLoginFocused(true)}
                        onBlur={() => setLoginFocused(false)}
                        onChange={(e) =>
                          setForm({ ...form, login: e.target.value })
                        }
                        onKeyDown={formProgress}
                        className="w-full p-3 outline-none bg-transparent text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Senha */}
                <motion.div variants={itemVariants}>
                  <div
                    ref={inputRef.senha}
                    className={`relative border dark:border-gray-700 rounded-lg  duration-300 ${
                      passwordFocused || form.senha.length > 0
                        ? "border-[var(--secundaria)] dark:border-[var(--secundaria)] shadow-sm"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`absolute  duration-300 ${
                        passwordFocused || form.senha.length > 0
                          ? "text-xs text-[var(--secundaria)] dark:text-[var(--secundaria)] translate-y-[-0.6rem] translate-x-[0.5rem] bg-white dark:bg-gray-800 px-1"
                          : "text-gray-500 dark:text-white text-sm translate-y-[0.7rem] translate-x-[2.5rem]"
                      }`}
                    >
                      Senha
                    </label>
                    <div className="flex items-center">
                      <div className="pl-4 py-3 text-gray-500 dark:text-white">
                        <FaLock />
                      </div>
                      <input
                        ref={inputRef.senha}
                        type={isPasswordVisible ? "text" : "password"}
                        value={form.senha}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) =>
                          setForm({ ...form, senha: e.target.value })
                        }
                        onKeyDown={formProgress}
                        className="w-full p-3 outline-none bg-transparent text-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="pr-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {isPasswordVisible ? (
                          <VscEyeClosed className="w-5 h-5" />
                        ) : (
                          <VscEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Botão de login */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="button"
                    ref={inputRef.submit}
                    onClick={handleLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full select-none cursor-pointer bg-linear-to-r from-[#000000] to-[#ffff] hover:opacity-90 text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Entrar</span>
                    <RiLoginCircleLine className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
