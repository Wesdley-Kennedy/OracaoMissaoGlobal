import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PrayerHistoryItem = {
  id: string;
  hours: number;
  minutes: number;
  type: "adicionado" | "editado";
  timestamp: number;
};

type PrayerState = {
  totalMinutes: number;
  history: PrayerHistoryItem[];
  addTime: (hours: number, minutes: number, type?: "adicionado" | "editado") => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
};

export const usePrayer = create<PrayerState>()(
  persist(
    (set) => ({
      totalMinutes: 0,
      history: [],

      addTime: (hours, minutes, type = "adicionado") => {
        const addedMinutes = (hours * 60) + minutes;
        
        set((state) => {
          const newItem: PrayerHistoryItem = {
            id: Math.random().toString(36).substring(2, 9),
            hours,
            minutes,
            type,
            timestamp: Date.now(),
          };

          return {
            totalMinutes: state.totalMinutes + addedMinutes,
            history: [newItem, ...state.history].slice(0, 50),
          };
        });
      },

      removeHistoryItem: (id: string) => {
        set((state) => {
          const itemToRemove = state.history.find((item) => item.id === id);
          if (!itemToRemove) return state;

          const minutesToRemove = (itemToRemove.hours * 60) + itemToRemove.minutes;

          return {
            totalMinutes: state.totalMinutes - minutesToRemove,
            history: state.history.filter((item) => item.id !== id),
          };
        });
      },

      clearHistory: () => set({ totalMinutes: 0, history: [] }),
    }),
    {
      name: "prayer-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);