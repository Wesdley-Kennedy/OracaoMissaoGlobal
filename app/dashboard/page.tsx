"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/store/useLogin";
import toast from "react-hot-toast";
import DashboardActions from "@/components/DashboardActions";
import PrayerCounter from "@/components/PrayerCounter";

export default function Dashboard() {
  const { is_auth } = useLogin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !is_auth) {
      toast.error("Acesso negado. Por favor, faça login.");
      router.replace("/");
    }
  }, [is_auth, router, mounted]);

  if (!mounted || !is_auth) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <DashboardActions />
      
      <main className="w-full max-w-5xl">
        <PrayerCounter />
      </main>
    </div>
  );
}