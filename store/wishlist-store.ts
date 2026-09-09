import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product: Product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);

        if (exists) {
          set({
            items: currentItems.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            items: [...currentItems, product],
          });
        }
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "chip-ember-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
