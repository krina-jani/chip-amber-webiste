import { create } from "zustand";

interface UIStore {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isSearchModalOpen: boolean;
  isSizeGuideOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isSearchModalOpen: false,
  isSizeGuideOpen: false,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () =>
    set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () =>
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),

  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),
}));
