import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  coupon: string | null;
  discountPercentage: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getFreeShippingThreshold: () => number;
  getFreeShippingProgress: () => number;
  getRemainingForFreeShipping: () => number;
}

const FREE_SHIPPING_THRESHOLD = 75;
const FLAT_SHIPPING_RATE = 8.0;

// Initial items to match the reference badge of "2" items
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "prod-1-Charcoal-M",
    productId: "prod-1",
    slug: "shadow-oversized-hoodie",
    name: "SHADOW OVERSIZED HOODIE",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    color: { name: "Charcoal", hex: "#2B2D2F" },
    size: "M",
    quantity: 1,
  },
  {
    id: "prod-2-Chalk White-M",
    productId: "prod-2",
    slug: "essential-vintage-tee",
    name: "ESSENTIAL VINTAGE TEE",
    price: 34.99,
    originalPrice: 42.0,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    color: { name: "Chalk White", hex: "#F3F3F1" },
    size: "M",
    quantity: 1,
  },
];

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: INITIAL_CART_ITEMS,
      coupon: null,
      discountPercentage: 0,

      addItem: (newItem, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { ...newItem, quantity }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], coupon: null, discountPercentage: 0 });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "SAVE10" || cleanCode === "CHIP10") {
          set({ coupon: cleanCode, discountPercentage: 10 });
          return { success: true, message: "10% discount applied!" };
        } else if (cleanCode === "BUNDLE15") {
          set({ coupon: cleanCode, discountPercentage: 15 });
          return { success: true, message: "15% bundle discount applied!" };
        }
        return { success: false, message: "Invalid coupon code" };
      },

      removeCoupon: () => {
        set({ coupon: null, discountPercentage: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return parseFloat(
          get()
            .items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)
        );
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const discountRate = get().discountPercentage / 100;
        return parseFloat((subtotal * discountRate).toFixed(2));
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return FLAT_SHIPPING_RATE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        return parseFloat((subtotal - discount + shipping).toFixed(2));
      },

      getFreeShippingThreshold: () => FREE_SHIPPING_THRESHOLD,

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        const progress = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
        return Math.min(100, Math.round(progress));
      },

      getRemainingForFreeShipping: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, parseFloat((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)));
      },
    }),
    {
      name: "chip-ember-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
