import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  username: string;
  name: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (username: string, password: string) => {
        const cleanUser = username.trim().toLowerCase();
        const cleanPass = password.trim();

        if (cleanUser === "chipember" && cleanPass === "chipember") {
          const userData: User = {
            username: "chipember",
            name: "Chipember",
            email: "chipember@example.com",
          };
          set({ isAuthenticated: true, user: userData });
          return { success: true };
        }

        return {
          success: false,
          message: "Invalid username or password.",
        };
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "chip-ember-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
