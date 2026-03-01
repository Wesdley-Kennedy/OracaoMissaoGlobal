import { create } from "zustand";
import { api } from "@/lib/api";

export type PrayerHistoryItem = {
  id: string;
  hours: number;
  minutes: number;
  type: "adicionado" | "editado";
  timestamp: number;
};

type PrayerState = {
  history: PrayerHistoryItem[];
  totalMinutes: () => number;
  loadFromDatabase: () => Promise<void>;
  addTime: (hours: number, minutes: number, type?: "adicionado" | "editado") => Promise<void>;
  removeHistoryItem: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
};

export const usePrayer = create<PrayerState>((set, get) => ({
  history: [],

  totalMinutes: () =>
    get().history.reduce(
      (acc, item) => acc + item.hours * 60 + item.minutes,
      0
    ),

  loadFromDatabase: async () => {
    try {
      const response = await api.get("/prayer-logs");
      set({ history: response.data });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  },

  addTime: async (hours, minutes, type = "adicionado") => {
    try {
      const response = await api.post("/prayer-logs", {
        hours,
        minutes,
        type,
      });
      set((state) => ({
        history: [response.data, ...state.history],
      }));
    } catch (error) {
      console.error("Erro ao adicionar tempo:", error);
      throw error;
    }
  },

  removeHistoryItem: async (id) => {
    try {
      await api.delete(`/prayer-logs/${id}`);
      set((state) => ({
        history: state.history.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  },

  clearHistory: async () => {
    try {
      await api.delete("/prayer-logs");
      set({ history: [] });
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  },
}));