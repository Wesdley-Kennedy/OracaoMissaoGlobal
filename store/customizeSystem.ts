import { create } from "zustand";
import { persist } from "zustand/middleware";

type CustomizeSystemType = {
  theme: boolean;
  setTheme: (theme: boolean) => void;
};

export const customizeSystem = create<CustomizeSystemType>()(
  persist(
    (set) => ({
      theme: false,
      setTheme: (theme: boolean) => set({ theme }),
    }),
    {
      name: "customize-system", // chave do localStorage
    }
  )
);