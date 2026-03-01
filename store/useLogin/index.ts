import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginRequest } from "./services"

export type User = {
  nome: string;
  senha: string;
};

type LoginState = {
  user: User | null;
  is_auth: boolean;
  is_loading: boolean;
  error: string | null;

  login: (nome: string, senha: string) => Promise<void>;
  logout: () => void;
};

export const useLogin = create<LoginState>()(
  persist(
    (set) => ({
      user: null,
      is_auth: false,
      is_loading: false,
      error: null,

      login: async (nome, senha) => {
        try {
          set({ is_loading: true, error: null });

          const data = await loginRequest(nome, senha);

          set({
            user: { nome: data.nome, senha },
            is_auth: true,
            is_loading: false,
          });
        } catch (err) {
          set({
            error: "Usuário ou senha inválidos",
            is_loading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          is_auth: false,
        });
      },
    }),
    {
      name: "useLoginStore",
    }
  )
);